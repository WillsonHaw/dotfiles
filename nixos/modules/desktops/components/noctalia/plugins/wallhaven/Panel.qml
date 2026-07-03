import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import qs.Commons
import qs.Services.UI
import qs.Widgets

Item {
    id: root

    property var pluginApi  // injected by PluginPanelSlot

    // Runtime state from background service
    readonly property var svc: pluginApi?.mainInstance

    // Reactive config — updates whenever pluginApi.saveSettings() replaces the object
    readonly property var settings: pluginApi?.pluginSettings ?? {}

    property real contentPreferredWidth: 420
    property real contentPreferredHeight: 600

    // Update a setting and notify the service to reset pagination
    function updateSetting(key, value) {
        if (!pluginApi) return
        var s = Object.assign({}, pluginApi.pluginSettings)
        s[key] = value
        pluginApi.pluginSettings = s
        pluginApi.saveSettings()
        if (svc) svc.onSettingsChange()
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

            // ── Purity ─────────────────────────────────────
            ColumnLayout {
                Layout.fillWidth: true
                Layout.margins: Style.marginL
                spacing: Style.marginS

                Text {
                    text: "Purity"
                    font.pixelSize: Style.fontSizeL
                    font.weight: Style.fontWeightSemiBold
                    color: Color.mOnSurfaceVariant
                }

                RowLayout {
                    Layout.fillWidth: true
                    spacing: Style.marginM
                    RowLayout {
                        Layout.fillWidth: true
                        Text {
                            Layout.fillWidth: true
                            text: "SFW"
                            font.pixelSize: Style.fontSizeS
                            color: Color.mOnSurface
                        }
                        NToggle {
                            Layout.fillWidth: false
                            label: ""
                            checked: settings.sfw ?? true
                            onToggled: function(c) { updateSetting("sfw", c) }
                        }
                    }
                    RowLayout {
                        Layout.fillWidth: true
                        Text {
                            Layout.fillWidth: true
                            text: "Sketchy"
                            font.pixelSize: Style.fontSizeS
                            color: Color.mOnSurface
                        }
                        NToggle {
                            Layout.fillWidth: false
                            label: ""
                            checked: settings.sketchy ?? false
                            onToggled: function(c) { updateSetting("sketchy", c) }
                        }
                    }
                    RowLayout {
                        Layout.fillWidth: true
                        Text {
                            Layout.fillWidth: true
                            text: "NSFW"
                            font.pixelSize: Style.fontSizeS
                            color: Color.mOnSurface
                        }
                        NToggle {
                            Layout.fillWidth: false
                            label: ""
                            checked: settings.nsfw ?? false
                            onToggled: function(c) { updateSetting("nsfw", c) }
                        }
                    }
                }

                Text {
                    text: "Categories"
                    font.pixelSize: Style.fontSizeL
                    font.weight: Style.fontWeightSemiBold
                    color: Color.mOnSurfaceVariant
                }

                RowLayout {
                    Layout.fillWidth: true
                    spacing: Style.marginM
                    RowLayout {
                        Layout.fillWidth: true
                        Text {
                            Layout.fillWidth: true
                            text: "General"
                            font.pixelSize: Style.fontSizeS
                            color: Color.mOnSurface
                        }
                        NToggle {
                            Layout.fillWidth: false
                            label: ""
                            checked: settings.general ?? true
                            onToggled: function(c) { updateSetting("general", c) }
                        }
                    }
                    RowLayout {
                        Layout.fillWidth: true
                        Text {
                            Layout.fillWidth: true
                            text: "Anime"
                            font.pixelSize: Style.fontSizeS
                            color: Color.mOnSurface
                        }
                        NToggle {
                            Layout.fillWidth: false
                            label: ""
                            checked: settings.anime ?? true
                            onToggled: function(c) { updateSetting("anime", c) }
                        }
                    }
                    RowLayout {
                        Layout.fillWidth: true
                        Text {
                            Layout.fillWidth: true
                            text: "People"
                            font.pixelSize: Style.fontSizeS
                            color: Color.mOnSurface
                        }
                        NToggle {
                            Layout.fillWidth: false
                            label: ""
                            checked: settings.people ?? true
                            onToggled: function(c) { updateSetting("people", c) }
                        }
                    }
                }

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
                    placeholderText: "e.g. nature landscape"
                    text: settings.tags ?? ""
                    onTextChanged: {
                        tagsDebounce.pending = text
                        tagsDebounce.restart()
                    }
                    onAccepted: {
                        tagsDebounce.stop()
                        updateSetting("tags", text)
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
            }

            NDivider { Layout.fillWidth: true }

            // ── Options ────────────────────────────────────
            ColumnLayout {
                Layout.fillWidth: true
                Layout.margins: Style.marginL
                spacing: Style.marginS

                RowLayout {
                    Layout.fillWidth: true
                    Text {
                        Layout.fillWidth: true
                        text: "Saved wallpapers only (no downloads)"
                        font.pixelSize: Style.fontSizeS
                        color: Color.mOnSurface
                        wrapMode: Text.WrapAtWordBoundaryOrAnywhere
                    }
                    NToggle {
                        Layout.fillWidth: false
                        label: ""
                        checked: settings.localOnly ?? false
                        onToggled: function(c) { updateSetting("localOnly", c) }
                    }
                }

                RowLayout {
                    Layout.fillWidth: true
                    Text {
                        Layout.fillWidth: true
                        text: "Fill screen (crop)"
                        font.pixelSize: Style.fontSizeS
                        color: Color.mOnSurface
                    }
                    NToggle {
                        Layout.fillWidth: false
                        label: ""
                        checked: settings.coverMode ?? false
                        onToggled: function(c) {
                            updateSetting("coverMode", c)
                            if (!svc) return
                            Settings.data.wallpaper.fillMode = c ? "crop" : "fit"
                        }
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
                    Layout.topMargin: 4
                    Layout.bottomMargin: 4
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
                        enabled: !(svc?.isDownloading ?? false)
                        backgroundColor: Color.mSurfaceVariant
                        textColor: Color.mOnSurface
                        onClicked: if (svc) svc.random()
                    }

                    NButton {
                        text: "Block"
                        enabled: (svc?.currentWallpaper ?? null) !== null
                        backgroundColor: Color.mSurfaceVariant
                        textColor: Color.mError
                        onClicked: if (svc) svc.blacklistCurrent()
                    }
                }
            }

            NDivider { Layout.fillWidth: true }

            // ── API Key ────────────────────────────────────
            ColumnLayout {
                Layout.fillWidth: true
                Layout.margins: Style.marginL
                Layout.bottomMargin: Style.marginL
                spacing: Style.marginS

                Text {
                    text: "API Key (required for NSFW)"
                    font.pixelSize: Style.fontSizeL
                    font.weight: Style.fontWeightSemiBold
                    color: Color.mOnSurfaceVariant
                }

                NTextInput {
                    Layout.fillWidth: true
                    label: ""
                    placeholderText: "your-api-key"
                    text: settings.apikey ?? ""
                    onEditingFinished: updateSetting("apikey", text)
                    onAccepted: updateSetting("apikey", text)
                }
            }
        }
    }
}
