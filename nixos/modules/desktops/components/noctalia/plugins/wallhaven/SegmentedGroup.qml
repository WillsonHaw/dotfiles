import QtQuick
import QtQuick.Layouts
import qs.Commons

// Material-style connected button group: fixed horizontal row of equal-width
// segments, only the outer edges rounded, sharing a border between segments.
Item {
    id: root

    property var model: []  // [{ key, label, checked }]
    property real segmentHeight: 24

    signal toggled(string key, bool checked)

    implicitHeight: segmentHeight

    Row {
        anchors.fill: parent

        Repeater {
            model: root.model

            delegate: Rectangle {
                id: segment
                required property var modelData
                required property int index

                readonly property bool isFirst: index === 0
                readonly property bool isLast: index === root.model.length - 1

                width: root.width / root.model.length
                height: root.height

                topLeftRadius: isFirst ? Style.iRadiusS : 0
                bottomLeftRadius: isFirst ? Style.iRadiusS : 0
                topRightRadius: isLast ? Style.iRadiusS : 0
                bottomRightRadius: isLast ? Style.iRadiusS : 0

                color: modelData.checked ? Color.mPrimary : "transparent"
                border.width: Style.borderS
                border.color: modelData.checked ? Color.mPrimary : Color.mOutline

                Behavior on color {
                    ColorAnimation { duration: Style.animationFast }
                }

                Text {
                    anchors.centerIn: parent
                    width: parent.width - Style.margin2S
                    text: segment.modelData.label
                    font.pixelSize: Style.fontSizeXXS
                    font.weight: Style.fontWeightMedium
                    color: segment.modelData.checked ? Color.mOnPrimary : Color.mOnSurface
                    horizontalAlignment: Text.AlignHCenter
                    elide: Text.ElideRight
                }

                MouseArea {
                    id: segmentArea
                    anchors.fill: parent
                    hoverEnabled: true
                    cursorShape: Qt.PointingHandCursor
                    onClicked: root.toggled(segment.modelData.key, !segment.modelData.checked)

                    Rectangle {
                        anchors.fill: parent
                        topLeftRadius: segment.topLeftRadius
                        bottomLeftRadius: segment.bottomLeftRadius
                        topRightRadius: segment.topRightRadius
                        bottomRightRadius: segment.bottomRightRadius
                        color: Color.mOnSurface
                        opacity: segmentArea.containsMouse && !segment.modelData.checked ? 0.08 : 0
                        Behavior on opacity { NumberAnimation { duration: Style.animationFast } }
                    }
                }
            }
        }
    }
}
