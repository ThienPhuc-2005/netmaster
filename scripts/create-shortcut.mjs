// Tạo shortcut "NetMaster" ngoài Desktop và trong Start Menu.
// Chạy lại mỗi khi thư mục dự án bị di chuyển hoặc đổi tên:
//   node scripts/create-shortcut.mjs
//
// Vì sao phải qua đường dẫn 8.3: file .lnk lưu đường dẫn theo bảng mã
// ANSI của máy, mà CP1258/1252 không có "ự ọ ạ" — Windows sẽ ghi thành
// dấu "?" và shortcut chết ngay khi bấm. Tên 8.3 (MNG1~1) thuần ASCII
// nên đi qua được. Bản thân file .vbs tự suy đường dẫn từ vị trí của
// chính nó, nên chạy bằng tên ngắn vẫn ra đúng thư mục dự án.

import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const projectDir = dirname(scriptDir)

// Đoạn PowerShell dưới đây cố tình chỉ dùng ký tự ASCII: nó được truyền
// qua dòng lệnh, còn đường dẫn có dấu thì đi bằng biến môi trường.
const ps = `
$ErrorActionPreference = 'Stop'
$fso = New-Object -ComObject Scripting.FileSystemObject
$proj = $fso.GetFolder($env:NM_PROJECT).ShortPath
$vbs  = $fso.GetFile((Join-Path $env:NM_PROJECT 'scripts\\netmaster.vbs')).ShortPath
$ico  = $fso.GetFile((Join-Path $env:NM_PROJECT 'scripts\\netmaster.ico')).ShortPath
if ($vbs -match '[^\\x00-\\x7F]') { throw 'Short path still has non-ASCII characters' }
$shell = New-Object -ComObject WScript.Shell
$places = @(
  (Join-Path ([Environment]::GetFolderPath('Desktop')) 'NetMaster.lnk'),
  (Join-Path ([Environment]::GetFolderPath('Programs')) 'NetMaster.lnk')
)
foreach ($p in $places) {
  $sc = $shell.CreateShortcut($p)
  $sc.TargetPath = Join-Path $env:SystemRoot 'System32\\wscript.exe'
  $sc.Arguments = '"' + $vbs + '"'
  $sc.WorkingDirectory = $proj
  $sc.IconLocation = $ico + ',0'
  $sc.Description = 'NetMaster - hoc mang may tinh tu so 0'
  $sc.Save()
  Write-Output $p
}
`

const run = spawnSync(
  'powershell.exe',
  ['-NoProfile', '-NonInteractive', '-Command', ps],
  { env: { ...process.env, NM_PROJECT: projectDir }, encoding: 'utf8' },
)

if (run.status !== 0) {
  console.error('Tạo shortcut thất bại:', run.stderr || run.error?.message)
  process.exit(1)
}
for (const line of run.stdout.split(/\r?\n/).filter(Boolean)) {
  console.log(`Đã tạo: ${line}`)
}
