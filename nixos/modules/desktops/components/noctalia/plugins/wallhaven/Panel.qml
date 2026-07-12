import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import Quickshell
import qs.Commons
import qs.Services.UI
import qs.Widgets

Item {
    id: root

    property var pluginApi  // injected by PluginPanelSlot

    // Runtime state from background service
    readonly property var svc: pluginApi?.mainInstance

    // Settings shared across all profiles — must match Main.qml's sharedKeys.
    readonly property var sharedKeys: ["apiKeyFile", "blacklist"]

    readonly property var rawSettings: pluginApi?.pluginSettings ?? {}
    readonly property var profiles: rawSettings.profiles ?? []
    readonly property int activeProfileIndex: rawSettings.activeProfile ?? 0

    // Reactive config — active profile's settings merged with the shared keys.
    // Updates whenever pluginApi.saveSettings() replaces the object.
    readonly property var settings: Object.assign({}, profiles[activeProfileIndex] ?? {}, {
        blacklist: rawSettings.blacklist
    })

    property real contentPreferredWidth: 420
    property real contentPreferredHeight: 600

    // Update a setting (in the active profile, unless it's a shared key) and notify
    // the service to reset pagination. Pass triggerSearch=true to immediately fetch
    // a new wallpaper with the updated settings.
    function updateSetting(key, value, triggerSearch) {
        if (!pluginApi) return
        var s = Object.assign({}, pluginApi.pluginSettings)
        if (sharedKeys.indexOf(key) >= 0) {
            s[key] = value
        } else {
            var profs = (s.profiles || []).slice()
            var idx = s.activeProfile ?? 0
            profs[idx] = Object.assign({}, profs[idx])
            profs[idx][key] = value
            s.profiles = profs
        }
        pluginApi.pluginSettings = s
        pluginApi.saveSettings()
        if (svc) {
            svc.onSettingsChange()
            if (triggerSearch) svc.random()
        }
    }

    // Switch the active profile via the service (keeps the switch logic in one place).
    function switchProfile(index) {
        if (svc) { svc.switchProfile(index); return }
        // Service not ready yet — fall back to a direct settings write.
        if (!pluginApi) return
        var s = Object.assign({}, pluginApi.pluginSettings)
        if ((s.activeProfile ?? 0) === index) return
        s.activeProfile = index
        pluginApi.pluginSettings = s
        pluginApi.saveSettings()
    }

    // Tags debounce timer
    Timer {
        id: tagsDebounce
        interval: 2000
        repeat: false
        property string pending: ""
        onTriggered: {
            if (pending !== (settings.tags ?? "")) updateSetting("tags", pending)
        }
    }

    // Copy menu for the Debug section
    NContextMenu {
        id: copyDebugMenu
        parent: root
        width: 200
        model: [
            { "label": "Copy Query URL", "action": "url" },
            { "label": "Copy API Response", "action": "response" }
        ]
        onTriggered: function(action) {
            var text = action === "url" ? (svc?.lastDebugUrl ?? "") : (svc?.lastDebugResponse ?? "")
            if (text) Quickshell.execDetached(["wl-copy", text])
        }
    }

    ScrollView {
        anchors.fill: parent
        contentWidth: availableWidth
        clip: true

        ColumnLayout {
            width: parent.width
            spacing: 8

            // ── Title ──────────────────────────────────────
            Rectangle {
                Layout.fillWidth: true
                height: 52
                color: "transparent"

                Text {
                    anchors { left: parent.left; leftMargin: Style.marginL; verticalCenter: parent.verticalCenter }
                    text: "Wallpapers"
                    font.pixelSize: Style.fontSizeL
                    font.weight: Style.fontWeightSemiBold
                    color: Color.mOnSurface
                }
            }

            NDivider { Layout.fillWidth: true }

            // ── Profile ────────────────────────────────────
            ColumnLayout {
                Layout.fillWidth: true
                Layout.margins: Style.marginL
                spacing: Style.marginS

                Text {
                    text: "Profile"
                    font.pixelSize: Style.fontSizeL
                    font.weight: Style.fontWeightSemiBold
                    color: Color.mOnSurfaceVariant
                }

                SegmentedGroup {
                    Layout.fillWidth: true
                    model: root.profiles.map(function(p, i) {
                        return { key: i, label: p.name ?? ("Profile " + (i + 1)), checked: i === root.activeProfileIndex }
                    })
                    onToggled: function(key) { root.switchProfile(parseInt(key, 10)) }
                }
            }

            NDivider { Layout.fillWidth: true }

            // ── Purity / Categories ──────────────────────────
            ColumnLayout {
                Layout.fillWidth: true
                Layout.margins: Style.marginL
                spacing: Style.marginS

                // Tags input
                Text {
                    text: "Tags / Keywords"
                    font.pixelSize: Style.fontSizeL
                    font.weight: Style.fontWeightSemiBold
                    color: Color.mOnSurfaceVariant
                }

                NTextInput {
                    Layout.fillWidth: true
                    label: ""
                    fontSize: Style.fontSizeXXS
                    placeholderText: "e.g. nature landscape"
                    text: settings.tags ?? ""
                    onTextChanged: {
                        tagsDebounce.pending = text
                        tagsDebounce.restart()
                    }
                    onAccepted: {
                        tagsDebounce.stop()
                        updateSetting("tags", text, true)
                    }
                    onEditingFinished: {
                        tagsDebounce.stop()
                        updateSetting("tags", text)
                    }
                }

                // Search status
                Text {
                    visible: (svc?.fetchStatus ?? "idle") !== "idle"
                    text: {
                        var s = svc?.fetchStatus ?? "idle"
                        if (s === "ok") return (svc?.currentTotal ?? 0).toLocaleString() + " wallpapers found"
                        if (s === "no-results") return "No results for this search"
                        if (s === "offline") return "Offline — using local wallpapers"
                        if (s === "api-error") return "API error"
                        return ""
                    }
                    font.pixelSize: Style.fontSizeS
                    color: {
                        var s = svc?.fetchStatus ?? "idle"
                        if (s === "ok") return Color.mPrimary
                        if (s === "offline" || s === "api-error") return Color.mError
                        if (s === "no-results") return Color.mSecondary
                        return Color.mOnSurfaceVariant
                    }
                }

                // Purity / Category groups
                RowLayout {
                    Layout.fillWidth: true
                    Layout.topMargin: Style.marginS * 3
                    spacing: Style.marginL

                    SegmentedGroup {
                        Layout.fillWidth: true
                        model: [
                            { key: "sfw",     label: "SFW",     checked: settings.sfw ?? true },
                            { key: "sketchy", label: "Sketchy", checked: settings.sketchy ?? false },
                            { key: "nsfw",    label: "NSFW",    checked: settings.nsfw ?? false }
                        ]
                        onToggled: function(key, checked) { updateSetting(key, checked, true) }
                    }

                    SegmentedGroup {
                        Layout.fillWidth: true
                        model: [
                            { key: "general", label: "General", checked: settings.general ?? true },
                            { key: "anime",   label: "Anime",   checked: settings.anime ?? true },
                            { key: "people",  label: "People",  checked: settings.people ?? true }
                        ]
                        onToggled: function(key, checked) { updateSetting(key, checked, true) }
                    }
                }
            }

            NDivider { Layout.fillWidth: true }

            // ── Options ────────────────────────────────────
            ColumnLayout {
                Layout.fillWidth: true
                Layout.margins: Style.marginL
                spacing: Style.marginS

                RowLayout {
                    Layout.fillWidth: true
                    NToggle {
                        Layout.fillWidth: false
                        label: ""
                        baseSize: Math.round(Style.baseWidgetSize * 0.6 * Style.uiScaleRatio)
                        checked: settings.localOnly ?? false
                        onToggled: function(c) { updateSetting("localOnly", c) }
                    }
                    Text {
                        Layout.fillWidth: true
                        text: "Saved wallpapers only (no downloads)"
                        font.pixelSize: Style.fontSizeS
                        color: Color.mOnSurface
                        wrapMode: Text.WrapAtWordBoundaryOrAnywhere
                    }
                }

                RowLayout {
                    Layout.fillWidth: true
                    NToggle {
                        Layout.fillWidth: false
                        label: ""
                        baseSize: Math.round(Style.baseWidgetSize * 0.6 * Style.uiScaleRatio)
                        checked: settings.coverMode ?? false
                        onToggled: function(c) {
                            updateSetting("coverMode", c)
                            if (!svc) return
                            Settings.data.wallpaper.fillMode = c ? "crop" : "fit"
                        }
                    }
                    Text {
                        Layout.fillWidth: true
                        text: "Fill screen (crop)"
                        font.pixelSize: Style.fontSizeS
                        color: Color.mOnSurface
                    }
                }

                // Timer interval
                RowLayout {
                    Layout.fillWidth: true
                    spacing: Style.marginM

                    Text {
                        text: "Rotate every"
                        font.pixelSize: Style.fontSizeM
                        color: Color.mOnSurface
                    }

                    NButton {
                        text: "−"
                        fontSize: Style.fontSizeXXS
                        backgroundColor: Color.mSurfaceVariant
                        textColor: Color.mOnSurface
                        onClicked: {
                            if (svc) svc.setDisplayTimeMinutes(svc.getDisplayTimeMinutes() - 1)
                        }
                    }

                    Text {
                        text: svc ? svc.getDisplayTimeMinutes() + " min" : "5 min"
                        font.pixelSize: Style.fontSizeM
                        color: Color.mPrimary
                    }

                    NButton {
                        text: "+"
                        fontSize: Style.fontSizeXXS
                        backgroundColor: Color.mSurfaceVariant
                        textColor: Color.mOnSurface
                        onClicked: {
                            if (svc) svc.setDisplayTimeMinutes(svc.getDisplayTimeMinutes() + 1)
                        }
                    }
                }
            }

            NDivider { Layout.fillWidth: true }

            // ── Current Wallpaper ──────────────────────────
            ColumnLayout {
                Layout.fillWidth: true
                Layout.margins: Style.marginL
                spacing: Style.marginS

                Text {
                    text: "Current"
                    font.pixelSize: Style.fontSizeL
                    font.weight: Style.fontWeightSemiBold
                    color: Color.mOnSurfaceVariant
                }

                Text {
                    Layout.fillWidth: true
                    text: {
                        var cur = svc?.currentWallpaper
                        if (!cur) return "—"
                        var name = cur.path.split("/").pop()
                        var idx = svc?.currentIndex ?? null
                        var tot = svc?.currentTotal ?? null
                        var counter = (idx && tot) ? "(" + idx + "/" + tot + ") " : ""
                        return counter + "[" + cur.purity + "] " + name
                    }
                    font.pixelSize: Style.fontSizeS
                    color: Color.mOnSurface
                    wrapMode: Text.WrapAtWordBoundaryOrAnywhere
                }

                // Timer progress bar + pause button
                RowLayout {
                    Layout.fillWidth: true
                    spacing: Style.marginS

                    Rectangle {
                        Layout.fillWidth: true
                        height: 6
                        radius: 3
                        color: Color.mSurfaceVariant

                        Rectangle {
                            width: parent.width * (svc?.timerProgress ?? 0)
                            height: parent.height
                            radius: parent.radius
                            color: Color.mPrimary
                            Behavior on width { NumberAnimation { duration: 800; easing.type: Easing.OutSine } }
                        }
                    }

                    Text {
                        text: (svc?.timerPaused ?? false) ? "▶" : "⏸"
                        font.pixelSize: Style.fontSizeM
                        color: Color.mOnSurfaceVariant

                        MouseArea {
                            anchors.fill: parent
                            cursorShape: Qt.PointingHandCursor
                            onClicked: if (svc) svc.toggleTimer()
                        }
                    }
                }

                // Image tags
                Flow {
                    Layout.fillWidth: true
                    Layout.topMargin: Style.marginM
                    Layout.bottomMargin: Style.marginM
                    spacing: 4
                    visible: (svc?.currentImageTags?.length ?? 0) > 0

                    Repeater {
                        model: svc?.currentImageTags ?? []
                        delegate: Rectangle {
                            radius: Style.iRadiusS
                            color: Color.mSurfaceVariant
                            border.width: Style.borderS
                            border.color: modelData.purity === "nsfw"    ? Color.mError
                                        : modelData.purity === "sketchy" ? Color.mTertiary
                                        : Color.mOutline
                            width: tagText.width + 12
                            height: tagText.height + 8

                            Text {
                                id: tagText
                                anchors.centerIn: parent
                                text: modelData.name
                                font.pixelSize: Style.fontSizeXS
                                color: modelData.purity === "nsfw"    ? Color.mError
                                     : modelData.purity === "sketchy" ? Color.mTertiary
                                     : Color.mOnSurfaceVariant
                            }

                            MouseArea {
                                anchors.fill: parent
                                cursorShape: Qt.PointingHandCursor
                                onClicked: {
                                    tagsDebounce.stop()
                                    updateSetting("tags", "id:" + modelData.id)
                                    if (svc) svc.random()
                                }
                            }
                        }
                    }
                }

                // Action buttons
                RowLayout {
                    Layout.fillWidth: true
                    spacing: Style.marginS

                    NButton {
                        text: (svc?.isSaved ?? false) ? "✓ Saved" : "Save"
                        fontSize: Style.fontSizeXXS
                        backgroundColor: (svc?.isSaved ?? false) ? Color.mSurfaceVariant : Color.mPrimary
                        textColor: (svc?.isSaved ?? false) ? Color.mSecondary : Color.mOnPrimary
                        onClicked: {
                            if (!svc) return
                            if (svc.isSaved) svc.deleteCurrentWallpaper()
                            else svc.saveCurrentWallpaper()
                        }
                    }

                    NButton {
                        text: (svc?.isDownloading ?? false) ? "Downloading…" : "Next"
                        fontSize: Style.fontSizeXXS
                        enabled: !(svc?.isDownloading ?? false)
                        backgroundColor: Color.mSurfaceVariant
                        textColor: Color.mOnSurface
                        onClicked: if (svc) svc.random()
                    }

                    NButton {
                        text: "Block"
                        fontSize: Style.fontSizeXXS
                        enabled: (svc?.currentWallpaper ?? null) !== null
                        backgroundColor: Color.mSurfaceVariant
                        textColor: Color.mError
                        onClicked: if (svc) svc.blacklistCurrent()
                    }
                }
            }

            NDivider { Layout.fillWidth: true }

            // ── Debug ──────────────────────────────────────
            ColumnLayout {
                id: debugSection
                Layout.fillWidth: true
                Layout.margins: Style.marginL
                Layout.bottomMargin: Style.marginL
                spacing: Style.marginS

                property bool expanded: false

                Item {
                    Layout.fillWidth: true
                    implicitHeight: debugHeaderRow.implicitHeight

                    RowLayout {
                        id: debugHeaderRow
                        anchors.left: parent.left
                        anchors.right: parent.right
                        spacing: Style.marginXS

                        NIcon {
                            icon: "chevron-right"
                            pointSize: Style.fontSizeS
                            color: Color.mOnSurfaceVariant
                            rotation: debugSection.expanded ? 90 : 0
                            Behavior on rotation { NumberAnimation { duration: Style.animationFast } }
                        }

                        Text {
                            text: "Debug"
                            font.pixelSize: Style.fontSizeS
                            font.weight: Style.fontWeightSemiBold
                            color: Color.mOnSurfaceVariant
                        }

                        Item { Layout.fillWidth: true }
                    }

                    MouseArea {
                        anchors.fill: parent
                        cursorShape: Qt.PointingHandCursor
                        onClicked: debugSection.expanded = !debugSection.expanded
                    }
                }

                ColumnLayout {
                    Layout.fillWidth: true
                    visible: debugSection.expanded
                    spacing: Style.marginS

                    Item {
                        Layout.fillWidth: true
                        implicitHeight: copyDebugButton.implicitHeight

                        NIcon {
                            id: copyDebugButton
                            anchors.right: parent.right
                            icon: "copy"
                            pointSize: Style.fontSizeS
                            color: copyDebugArea.containsMouse ? Color.mPrimary : Color.mOnSurfaceVariant

                            MouseArea {
                                id: copyDebugArea
                                anchors.fill: parent
                                hoverEnabled: true
                                cursorShape: Qt.PointingHandCursor
                                onClicked: copyDebugMenu.openAtItem(copyDebugButton, copyDebugButton.width - copyDebugMenu.width, copyDebugButton.height)
                            }
                        }
                    }

                    Text {
                        Layout.fillWidth: true
                        text: "Last query"
                        font.pixelSize: Style.fontSizeS
                        font.weight: Style.fontWeightSemiBold
                        color: Color.mOnSurfaceVariant
                    }

                    Text {
                        Layout.fillWidth: true
                        text: svc?.lastDebugUrl || "—"
                        font.pixelSize: Style.fontSizeXS
                        color: Color.mOnSurface
                        wrapMode: Text.WrapAnywhere
                        textFormat: Text.PlainText
                    }

                    Text {
                        Layout.fillWidth: true
                        Layout.topMargin: Style.marginS
                        text: "Last response"
                        font.pixelSize: Style.fontSizeS
                        font.weight: Style.fontWeightSemiBold
                        color: Color.mOnSurfaceVariant
                    }

                    Rectangle {
                        Layout.fillWidth: true
                        Layout.preferredHeight: 180
                        color: Color.mSurfaceVariant
                        radius: Style.iRadiusS

                        ScrollView {
                            anchors.fill: parent
                            anchors.margins: Style.marginS
                            clip: true

                            Text {
                                width: parent.width
                                text: svc?.lastDebugResponse || "—"
                                font.pixelSize: Style.fontSizeXS
                                color: Color.mOnSurface
                                wrapMode: Text.WrapAnywhere
                                textFormat: Text.PlainText
                            }
                        }
                    }
                }
            }
        }
    }
}
