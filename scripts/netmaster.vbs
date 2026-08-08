' Vo boc cho shortcut: chay launch-app.mjs o che do an, khong nhay cua so
' dong lenh. Duong dan tu suy ra tu vi tri file nay nen khong phu thuoc
' vao noi dat thu muc du an.
Option Explicit
Dim fso, shell, scriptDir, projectDir
Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)
projectDir = fso.GetParentFolderName(scriptDir)
shell.CurrentDirectory = projectDir
shell.Run "node """ & scriptDir & "\launch-app.mjs""", 0, False
