param(
    [ValidateSet('dev', 'build', 'preview', 'typecheck', 'test', 'install')]
    [string]$Task = 'dev'
)

$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

$npmCommand = Get-Command npm.cmd -ErrorAction SilentlyContinue
if ($null -eq $npmCommand) {
    $portableNodeDirectory = Join-Path $PSScriptRoot 'tmp\tools\node-v22.23.4-win-x64'
    $portableNode = Join-Path $portableNodeDirectory 'node.exe'
    $portableNpm = Join-Path $portableNodeDirectory 'npm.cmd'
    if (!(Test-Path -LiteralPath $portableNode) -or !(Test-Path -LiteralPath $portableNpm)) {
        throw 'Install Node.js 22.12 or newer, then run this command again.'
    }
    $env:Path = $portableNodeDirectory + [IO.Path]::PathSeparator + $env:Path
    $env:npm_config_cache = Join-Path $PSScriptRoot 'tmp\npm-cache'
    $npmExecutable = $portableNpm
} else {
    $npmExecutable = $npmCommand.Source
}

if ($Task -eq 'install') {
    & $npmExecutable ci
} else {
    if (!(Test-Path -LiteralPath (Join-Path $PSScriptRoot 'node_modules'))) {
        & $npmExecutable ci
        if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    }
    & $npmExecutable run $Task
}
exit $LASTEXITCODE
