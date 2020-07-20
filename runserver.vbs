Set WshShell = CreateObject("WScript.Shell") 
WshShell.Run chr(34) & "C:\Program Files\Ampps\www\apiserver\runserver.bat" & Chr(34), 0
Set WshShell = Nothing