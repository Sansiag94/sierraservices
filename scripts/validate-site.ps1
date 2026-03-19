$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$phpCandidates = @(
    "C:\\xampp\\php\\php.exe",
    (Get-Command php -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source -ErrorAction SilentlyContinue)
) | Where-Object { $_ -and (Test-Path $_) }

$phpExe = $phpCandidates | Select-Object -First 1
if (-not $phpExe) {
    throw "php.exe was not found. Install PHP or update the script with the correct path."
}

$filesToLint = @(
    Get-ChildItem -Path $repoRoot -Filter *.html -File
    Get-ChildItem -Path (Join-Path $repoRoot "includes") -Filter *.php -File
)

$lintFailed = $false
foreach ($file in $filesToLint) {
    & $phpExe -l $file.FullName
    if ($LASTEXITCODE -ne 0) {
        $lintFailed = $true
    }
}

$knownRoutes = @(
    "",
    "./",
    "about",
    "contact",
    "insights",
    "privacy",
    "services",
    "thank-you"
)

$knownAssets = @(
    "logo black.jpg",
    "portrait-about.jpg",
    "portrait-home.jpg",
    "script.js",
    "social-cover.jpg",
    "styles.css"
)

$allowedPrefixes = @("http://", "https://", "mailto:", "tel:")
$invalidLinks = @()
$linkPattern = 'href\s*=\s*"([^"]+)"'

foreach ($file in Get-ChildItem -Path $repoRoot -Filter *.html -File) {
    $content = Get-Content -Path $file.FullName -Raw
    foreach ($match in [regex]::Matches($content, $linkPattern)) {
        $href = $match.Groups[1].Value
        if ([string]::IsNullOrWhiteSpace($href) -or $href.StartsWith("#")) {
            continue
        }

        $isExternal = @($allowedPrefixes | Where-Object { $href.StartsWith($_) }).Count -gt 0
        if ($href.Contains("<?") -or $href -match '[<>$]' -or $isExternal) {
            continue
        }

        $normalizedHref = $href.Split("?")[0].Split("#")[0]
        if ($knownRoutes -contains $normalizedHref -or $knownAssets -contains $normalizedHref) {
            continue
        }

        if (Test-Path (Join-Path $repoRoot $normalizedHref)) {
            continue
        }

        if (Test-Path (Join-Path $repoRoot ($normalizedHref + ".html"))) {
            continue
        }

        $invalidLinks += "$($file.Name): $href"
    }
}

if ($invalidLinks.Count -gt 0) {
    Write-Host "Invalid relative links detected:" -ForegroundColor Red
    $invalidLinks | Sort-Object -Unique | ForEach-Object { Write-Host " - $_" -ForegroundColor Red }
    $lintFailed = $true
}

if ($lintFailed) {
    throw "Site validation failed."
}

Write-Host "Site validation passed." -ForegroundColor Green
