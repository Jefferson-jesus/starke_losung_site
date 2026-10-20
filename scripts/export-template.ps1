$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$destination = Join-Path $projectRoot 'dist'
New-Item -ItemType Directory -Path $destination -Force | Out-Null

# Explicit allowlist: never copy .env.local, credentials, dependencies or Git history.
$entries = @(
  'app', 'components', 'i18n', 'lib', 'messages', 'public', 'scripts', 'tests', 'docs',
  '.env.example', '.gitignore', 'README.md', 'package.json', 'package-lock.json',
  'next.config.ts', 'next-env.d.ts', 'middleware.ts', 'site.config.ts',
  'tsconfig.json', 'tailwind.config.ts', 'postcss.config.js', 'eslint.config.mjs'
)
$sources = $entries | ForEach-Object { Join-Path $projectRoot $_ } | Where-Object { Test-Path -LiteralPath $_ }
$archive = Join-Path $destination 'starke-losung-template.zip'
Compress-Archive -LiteralPath $sources -DestinationPath $archive -Force
Write-Output "Template saved: $archive"
