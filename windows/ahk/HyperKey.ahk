; Hyper Key
+CapsLock::CapsLock

*CapsLock::
{
    Send "{Blind}{LControl Down}"
    Send "{Blind}{LShift Down}"
    Send "{Blind}{LAlt Down}"
    Send "{Blind}{LWin Down}"
    return
}

*CapsLock up::
{
    Send "{Blind}{LControl Up}"
    Send "{Blind}{LShift Up}"
    Send "{Blind}{LAlt Up}"
    Send "{Blind}{LWin Up}"
    return
}
