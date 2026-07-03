import QtQuick
import Quickshell
import Quickshell.Io
import qs.Commons
import qs.Modules.Bar.Extras
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

    property bool running: false

    implicitWidth: pill.width
    implicitHeight: pill.height

    Process {
        id: statusProc
        command: ["sh", "-c", "pgrep -x waynergy >/dev/null 2>&1 && echo 1 || echo 0"]
        stdout: StdioCollector {
            onStreamFinished: root.running = text.trim() === "1"
        }
        stderr: StdioCollector {}
        running: false
    }

    Timer {
        interval: 3000
        repeat: true
        running: true
        triggeredOnStart: true
        onTriggered: { if (!statusProc.running) statusProc.running = true }
    }

    Process {
        id: toggleProc
        stdout: StdioCollector {}
        stderr: StdioCollector {}
        running: false
        onExited: { if (!statusProc.running) statusProc.running = true }
    }

    function toggle() {
        if (toggleProc.running) return
        toggleProc.command = root.running
            ? ["systemctl", "--user", "stop", "waynergy.service"]
            : ["systemctl", "--user", "start", "waynergy.service"]
        toggleProc.running = true
    }

    NPopupContextMenu {
        id: contextMenu
        model: [{ "label": "Widget Settings", "action": "widget-settings", "icon": "settings" }]
        onTriggered: action => {
            contextMenu.close()
            PanelService.closeContextMenu(screen)
            if (action === "widget-settings")
                BarService.openWidgetSettings(screen, section, sectionWidgetIndex, widgetId, widgetSettings)
        }
    }

    BarPill {
        id: pill
        screen: root.screen
        oppositeDirection: BarService.getPillDirection(root)
        customIconColor: root.running
            ? Color.resolveColorKey("primary")
            : Color.resolveColorKeyOptional(root.iconColorKey)
        icon: root.running ? "cast" : "cast-off"
        tooltipText: root.running ? "Waynergy: Running" : "Waynergy: Stopped"
        forceOpen: false
        forceClose: false
        onClicked: root.toggle()
        onRightClicked: PanelService.showContextMenu(contextMenu, pill, screen)
    }
}
