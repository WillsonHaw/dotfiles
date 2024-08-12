SetConstants() {
    global
    defaultInactiveOpacity := 128
    defaultActiveOpacity := 200
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

SetTimer FocusMouse, 5
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

; Sets window under mouse active
FocusMouse()
{
    global activeWin
    local focusedWin

    ; Keep track of previous position and check if it's changed before
    ; activating the next window. Without this, things like alt+tab would
    ; be prevented from working
    static lastX := 0
    static lastY := 0
    local x := 0
    local y := 0

    MouseGetPos &x, &y, &focusedWin

    if (focusedWin != activeWin && x != lastX && y != lastY) {
        focusClass := WinGetClass("ahk_id " focusedWin)
        focusTitle := WinGetTitle("ahk_id " focusedWin)
        isFocusable := ArrayIncludes(focusIncludes, focusClass)

        ; Kinda hacky... check to make sure there's a title. If there isn't,
        ; it's possible it's a menu or something, which we don't want to lose
        ; focus on
        if (isFocusable && focusTitle != "" && WinExist("ahk_id " focusedWin)) {
            WinActivate
        }
   }
    
    lastX := x
    lastY := y
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
