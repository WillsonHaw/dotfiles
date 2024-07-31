CapsLock::<#Tab

; Window Transparency
CapsLock & F1::WinSetTransparent 20, "A"
CapsLock & F2::WinSetTransparent 40, "A"
CapsLock & F3::WinSetTransparent 60, "A"
CapsLock & F4::WinSetTransparent 80, "A"
CapsLock & F5::WinSetTransparent 100, "A"
CapsLock & F6::WinSetTransparent 120, "A"
CapsLock & F7::WinSetTransparent 140, "A"
CapsLock & F8::WinSetTransparent 160, "A"
CapsLock & F9::WinSetTransparent 180, "A"
CapsLock & F10::WinSetTransparent 200, "A"
CapsLock & F11::WinSetTransparent 220, "A"
CapsLock & F12::WinSetTransparent "off", "A"

; Utility
CapsLock & R::Reload

; Apps
CapsLock & `::Run '*RunAs "alacritty.exe"'
CapsLock & E::Run '"Files.exe"'

; Virtual Desktop switching
CapsLock & Right::GoToNextDesktop()
CapsLock & Left::GoToPrevDesktop()

CapsLock & 1::MoveOrGotoDesktopNumber(0)
CapsLock & 2::MoveOrGotoDesktopNumber(1)
CapsLock & 3::MoveOrGotoDesktopNumber(2)
CapsLock & 4::MoveOrGotoDesktopNumber(3)
CapsLock & 5::MoveOrGotoDesktopNumber(4)
CapsLock & 6::MoveOrGotoDesktopNumber(5)
CapsLock & 7::MoveOrGotoDesktopNumber(6)
CapsLock & 8::MoveOrGotoDesktopNumber(7)
CapsLock & 9::MoveOrGotoDesktopNumber(8)
