SetConstants() {
    global
    defaultInactiveOpacity := 140
    defaultActiveOpacity := 210
    fullOpacityGroupName := "AlwaysFullOpacity"
    transparentEXEs := [
        "Code.exe", ; VS Code
        "Arc.exe", ; Arc Browser
        "ui32.exe" ; Wallpaper Engine
    ]
    focusIncludes := [
        "ApplicationFrameWindow",
        "WinUIDesktopWin32WindowClass",
        "Chrome_WidgetWin_1",
        "Window Class",
        "WPEUI"
    ]
    overrideWindows := []
}

SetDefaults() {
    global activeWin := 0
    global activeEXE := 0
}

SetConstants()
SetDefaults()

SetTimer WatchForMenu, 10
SetTimer WatchForActivity, 10

; Detects menus and turns off transparency
WatchForMenu()
{
    DetectHiddenWindows True  ; Might allow detection of menu sooner.

    if WinExist("ahk_class #32768")
    {
        title := WinGetTitle()

        if (title != "" && title != "NotificationIconWindow")
        {
            WinSetTransparent "off"
        }
    }
}

; Sets transparency for inactive and active windows
WatchForActivity()
{
    global activeWin
    global activeEXE
    global defaultInactiveOpacity
    global defaultActiveOpacity
    global transparentEXEs

    newWin := WinActive("A")

    if (activeWin == newWin || newWin == 0) {
        return
    }

    newEXE := WinGetProcessName()

    ; Set previous window inactive
    local isOldTransparent := ArrayIncludes(transparentEXEs, activeEXE)
    local isNewTransparent := ArrayIncludes(transparentEXEs, newEXE)
    local isOldGroupOverride := ArrayIncludes(overrideWindows, activeWin)
    local isNewGroupOverride := ArrayIncludes(overrideWindows, newWin)

    try {
        if WinExist("ahk_id " activeWin) {
            if (isOldTransparent && !isOldGroupOverride) {
                WinSetTransparent defaultInactiveOpacity
            } else {
                WinSetTransparent "off"
            }
        }

        if WinExist("ahk_id " newWin) {
            if (isNewTransparent && !isNewGroupOverride) {
                WinSetTransparent defaultActiveOpacity
            } else {
                WinSetTransparent "off"
            }
        }
    } catch {
        ; It's fine, continue
    }

    activeEXE := newEXE
    activeWin := newWin
}

ToggleOpacityGroup() {
    newWin := WinActive("A")
    isInGroup := ArrayIncludes(overrideWindows, newWin)

    if (isInGroup) {
        ArrayRemove(overrideWindows, newWin)
    } else {
        overrideWindows.Push(newWin)
        WinSetTransparent "off"
    }
}

ArrayIncludes(array, value) {
    for item in array
    {
        if (item == value) {
            return true
        }
    }

    return false
}

ArrayRemove(array, value) {
    for index, item in array
    {
        if (item == value) {
            array.RemoveAt(index)
            return
        }
    }
}
