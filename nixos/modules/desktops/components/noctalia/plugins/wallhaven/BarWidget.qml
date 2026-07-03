import QtQuick
import Quickshell
import Quickshell.Io
import qs.Commons
import qs.Modules.Bar.Extras
import qs.Services.Noctalia
import qs.Services.UI
import qs.Widgets

Item {
    id: root

    property ShellScreen screen
    property string widgetId: ""
    property string section: ""
    property int sectionWidgetIndex: -1
    property int sectionWidgetsCount: 0

    property var widgetMetadata: BarWidgetRegistry.widgetMetadata[widgetId] ?? {}
    readonly property string screenName: screen ? screen.name : ""
    property var widgetSettings: {
        if (section && sectionWidgetIndex >= 0 && screenName) {
            const widgets = Settings.getBarWidgetsForScreen(screenName)[section]
            if (widgets && sectionWidgetIndex < widgets.length)
                return widgets[sectionWidgetIndex]
        }
        return {}
    }
    readonly property string barPosition: Settings.getBarPositionForScreen(screenName)
    readonly property bool isBarVertical: barPosition === "left" || barPosition === "right"
    readonly property string iconColorKey: widgetSettings.iconColor !== undefined
        ? widgetSettings.iconColor
        : (widgetMetadata.iconColor ?? "none")

    // Derive plugin ID from widgetId: "plugin:wallhaven" -> "wallhaven"
    readonly property string pluginId: widgetId.startsWith("plugin:") ? widgetId.substring(7) : ""
    readonly property var svc: PluginService.getPluginAPI(root.pluginId)?.mainInstance

    implicitWidth: pill.width
    implicitHeight: pill.height

    NPopupContextMenu {
        id: contextMenu
        model: [
            { "label": "Next Wallpaper", "action": "next", "icon": "refresh" },
            { "label": "Widget Settings", "action": "widget-settings", "icon": "settings" }
        ]
        onTriggered: action => {
            contextMenu.close()
            PanelService.closeContextMenu(screen)
            if (action === "next") {
                var api = PluginService.getPluginAPI(root.pluginId)
                if (api?.mainInstance) api.mainInstance.random()
            } else if (action === "widget-settings") {
                BarService.openWidgetSettings(screen, section, sectionWidgetIndex, widgetId, widgetSettings)
            }
        }
    }

    BarPill {
        id: pill
        screen: root.screen
        oppositeDirection: BarService.getPillDirection(root)
        customIconColor: Color.resolveColorKeyOptional(root.iconColorKey)
        icon: (root.svc?.isDownloading ?? false) ? "cloud-download" : "image"
        tooltipText: {
            var cur = root.svc?.currentWallpaper
            if (cur) return cur.path.split("/").pop() + " [" + cur.purity + "]"
            return "Wallhaven"
        }
        forceOpen: false
        forceClose: false
        onClicked: {
            var api = PluginService.getPluginAPI(root.pluginId)
            if (api) api.togglePanel(root.screen, pill)
        }
        onRightClicked: PanelService.showContextMenu(contextMenu, pill, screen)
    }

    Canvas {
        id: progressArc
        // Match the visual capsule exactly: pill.implicitHeight is the capsule height,
        // pill.height is the full bar section height. Center over the visible pill.
        anchors.centerIn: pill
        width: pill.width
        height: pill.implicitHeight
        renderStrategy: Canvas.Cooperative
        renderTarget: Canvas.FramebufferObject
        layer.enabled: true
        layer.smooth: true

        property real rawProgress: root.svc?.timerProgress ?? 0
        property bool paused: root.svc?.timerPaused ?? false
        property real displayProgress: 0
        property bool _skipAnim: false

        Behavior on displayProgress {
            enabled: !progressArc._skipAnim
            NumberAnimation { duration: 900; easing.type: Easing.OutSine }
        }

        onRawProgressChanged: {
            if (rawProgress < displayProgress - 0.05) {
                // Wallpaper changed — snap to new value without animating
                _skipAnim = true
                displayProgress = rawProgress
                _skipAnim = false
            } else {
                displayProgress = rawProgress
            }
            if (!repaintTimer.running) repaintTimer.start()
        }
        onPausedChanged: requestPaint()
        onWidthChanged: requestPaint()
        onHeightChanged: requestPaint()

        Timer {
            id: repaintTimer
            interval: 33
            repeat: true
            onTriggered: {
                progressArc.requestPaint()
                if (Math.abs(progressArc.displayProgress - progressArc.rawProgress) < 0.001) stop()
            }
        }

        Component.onCompleted: requestPaint()

        onPaint: {
            var ctx = getContext("2d")
            ctx.reset()

            var progress = displayProgress
            if (progress <= 0) return

            var w = width, h = height
            var lw = 2.0
            // Circle inscribed just inside the capsule edge
            var r = Math.min(w, h) / 2 - lw
            if (r <= 0) return

            ctx.strokeStyle = Color.mPrimary
            ctx.globalAlpha = paused ? 0.4 : 0.85
            ctx.lineWidth = lw
            ctx.lineCap = "round"

            ctx.beginPath()
            // Start at 6 o'clock (bottom), sweep clockwise by progress fraction
            ctx.arc(w / 2, h / 2, r, Math.PI / 2, Math.PI / 2 + 2 * Math.PI * progress, false)
            ctx.stroke()
        }
    }
}
