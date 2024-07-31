; Hyper Key
+CapsLock::CapsLock

*CapsLock::
{
    Send "{Blind}{LControl Down}"
    Send "{Blind}{LShift Down}"
    Send "{Blind}{LWin Down}"
    Send "{Blind}{LAlt Down}"
    return
}

*CapsLock up::
{
    Send "{Blind}{LControl Up}"
    Send "{Blind}{LShift Up}"
    Send "{Blind}{LWin Up}"
    Send "{Blind}{LAlt Up}"
    return
}
