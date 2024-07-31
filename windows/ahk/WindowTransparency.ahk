SetTimer WatchForMenu, 5

WatchForMenu()
{
    DetectHiddenWindows True  ; Might allow detection of menu sooner.
    if WinExist("ahk_class #32768")
        WinSetTransparent "off"  ; Uses the window found by the above line.
}
