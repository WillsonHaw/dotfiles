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
CapsLock & F12::ToggleOpacityGroup()

; Utility
CapsLock & R::Reload

; Forwarded shortcuts, for applications that don't accept F20 as a modifier key
~F20 & Space::Send "{Blind}!{Space}"
