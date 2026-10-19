# Exports every photo from the current petaliefiori.it site into
# client/public/images/<category>/ and generates db/seed_gallery.sql.
#
# What it does:
#   1. Reads the pages of the old site and collects every photo path together
#      with the title or alt text found next to it.
#   2. Downloads the photos to a staging folder, keeping the biggest version
#      when the same photo exists as thumbnail and as "Big" file.
#   3. Removes duplicates by content hash across pages and categories.
#   4. Writes the unique photos to client/public/images with slug file names.
#   5. Writes db/seed_gallery.sql with the category, file, alt and caption.
#
# Re run it any time to refresh the photos and the gallery seed.

param(
  [string]$SiteRoot = "https://www.petaliefiori.it",
  [string]$OutRoot = (Join-Path $PSScriptRoot "..\client\public\images"),
  [string]$Staging = (Join-Path $env:LOCALAPPDATA "Temp\petali-images-staging"),
  [string]$SeedFile = (Join-Path $PSScriptRoot "..\db\seed_gallery.sql"),
  [string]$DbName = "petali_e_fiori"
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$pages = @(
  @{ file = "index.html"; category = "home" },
  @{ file = "chiesa.html"; category = "chiesa" },
  @{ file = "comune.html"; category = "comune" },
  @{ file = "bouquet.html"; category = "bouquet" },
  @{ file = "decorazionivarie.html"; category = "decorazioni" },
  @{ file = "retromacchina.html"; category = "retromacchina" },
  @{ file = "centrotavola.html"; category = "centrotavola" },
  @{ file = "preventivi.html"; category = "preventivi" },
  @{ file = "allestimentimeeting.html"; category = "meeting" },
  @{ file = "chisiamo.html"; category = "chi-siamo" },
  @{ file = "contatti.html"; category = "contatti" },
  @{ file = "dovesiamo.html"; category = "dove-siamo" },
  @{ file = "gallery.html"; category = "gallery" }
)

# Category order used when the same photo appears in several sections
$categoryPriority = @(
  "chiesa", "comune", "bouquet", "decorazioni", "centrotavola", "meeting",
  "retromacchina", "preventivi", "home", "chi-siamo", "contatti", "dove-siamo", "gallery"
)

$skipParts = @(
  "/buttons/", "/pagetitle/", "mm_spacer", "placeholder", "captcha", "/logo.gif", "titolo.gif"
)

$usefulText = @("", " ", "open image", "-", "image")

function Get-Attribute {
  param([string]$tag, [string]$name)
  $pattern = '(?is)\b' + $name + '\s*=\s*"([^"]*)"'
  $match = [regex]::Match($tag, $pattern)
  if (-not $match.Success) {
    $pattern = "(?is)\b$name\s*=\s*'([^']*)'"
    $match = [regex]::Match($tag, $pattern)
  }
  if ($match.Success) { return $match.Groups[1].Value.Trim() }
  return $null
}

function Get-CleanText {
  param([string]$value)
  if ($null -eq $value) { return $null }
  $text = ($value -replace '\s+', ' ').Trim()
  if ($usefulText -contains $text) { return $null }
  return $text
}

function Get-BestText {
  param([string]$first, [string]$second)
  if ($null -eq $first) { return $second }
  if ($null -eq $second) { return $first }
  if ($second.Length -gt $first.Length) { return $second }
  return $first
}

function Test-KeepPath {
  param([string]$path)
  $lower = $path.ToLowerInvariant()
  if ($lower -notmatch '\.(jpg|jpeg|png|gif)$') { return $false }
  foreach ($part in $skipParts) {
    if ($lower.Contains($part.ToLowerInvariant())) { return $false }
  }
  if ($lower.EndsWith(".gif") -and -not $lower.Contains("/dovesiamo/")) { return $false }
  return $true
}

function Convert-ToSlug {
  param([string]$value)
  $decomposed = $value.Normalize([Text.NormalizationForm]::FormD)
  $builder = New-Object System.Text.StringBuilder
  foreach ($character in $decomposed.ToCharArray()) {
    $category = [Globalization.CharUnicodeInfo]::GetUnicodeCategory($character)
    if ($category -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
      [void]$builder.Append($character)
    }
  }
  $ascii = $builder.ToString().Normalize([Text.NormalizationForm]::FormC)
  $slug = $ascii.ToLowerInvariant() -replace '[^a-z0-9]+', '-'
  $slug = $slug -replace '^-+', '' -replace '-+$', ''
  return $slug
}

function Get-AltFromFileName {
  param([string]$fileName)
  $base = [IO.Path]::GetFileNameWithoutExtension($fileName)
  $base = $base -replace '(?i)big$', ''
  $words = $base -split '[^A-Za-z0-9]+' | Where-Object { $_ -ne '' }
  $text = ($words | ForEach-Object { $_.Substring(0, 1).ToUpper() + $_.Substring(1) }) -join ' '
  return $text
}

Add-Type -AssemblyName System.Drawing

function Get-ImageArea {
  param([string]$path)
  try {
    $image = [System.Drawing.Image]::FromFile($path)
    try {
      return [int]$image.Width * [int]$image.Height
    } finally {
      $image.Dispose()
    }
  } catch {
    return 0
  }
}

function Get-FileSha256 {
  param([string]$path)
  $algorithm = [System.Security.Cryptography.SHA256]::Create()
  $stream = [IO.File]::OpenRead($path)
  try {
    $bytes = $algorithm.ComputeHash($stream)
  } finally {
    $stream.Close()
    $algorithm.Dispose()
  }
  return ([BitConverter]::ToString($bytes)) -replace '-', ''
}

function Save-SqlFile {
  param([string]$path, [string]$content)
  $noBom = New-Object System.Text.UTF8Encoding($false)
  [IO.File]::WriteAllText($path, $content, $noBom)
}

function Convert-SqlValue {
  param([string]$value)
  if ($null -eq $value) { return "NULL" }
  if ($value -eq "") { return "NULL" }
  $clean = $value -replace '[\r\n]+', ' '
  $clean = $clean.Replace("'", "''")
  return "'" + $clean + "'"
}

# Human wording for photos whose alt text on the old site is missing, too short
# or simply wrong. Key is "category/filename".
$altOverrides = @{
  "chi-siamo/bouquet-raffaello-1.jpg" = "Bouquet Raffaello"
  "chi-siamo/candela-rotonda-2.jpg" = "Candela rotonda decorata con fiori e verdi"
  "comune/sposi-con-bouquet-formale.jpg" = "Sposi con bouquet formale"
  "contatti/contatti.jpg" = "Info contatti: info@petaliefiori.it, 02 23167849, 331 8603337"
  "dove-siamo/dovesiamoimg.jpg" = "Il nostro punto vendita è in Via Arzaga 24 a Milano, MM1 Primaticcio"
  "dove-siamo/piantina.gif" = "Mappa di Via Arzaga 24 a Milano, zona Primaticcio"
  "centrotavola/composizionefoto.jpg" = "Centrotavola e candele su un tavolo da ristorante"
  "preventivi/bouquet.jpg" = "Bouquet della sposa"
  "retromacchina/retromacchina.jpg" = "Retromacchina con fiori gialli e arancioni"
  "bouquet/bouquetdecorativo.jpg" = "Bouquet decorativo"
  "bouquet/bouquet-caravaggio-vendela-1.jpg" = "Bouquet Caravaggio"
  "bouquet/bouquet-degas.jpg" = "Bouquet Degas"
  "bouquet/bouquet-klee.jpg" = "Bouquet Klee"
  "bouquet/bouquet-magritte-rose.jpg" = "Bouquet Magritte"
  "bouquet/bouquet-manet.jpg" = "Bouquet Manet"
  "bouquet/bouquet-renoir.jpg" = "Bouquet Renoir"
  "bouquet/bouquet-tiziano-akito.jpg" = "Bouquet Tiziano"
  "bouquet/raffaello-1-dettaglio.jpg" = "Bouquet Raffaello"
  "bouquet/raffaello-2.jpg" = "Bouquet Raffaello"
  "meeting/cestino-bambu-candelabro-4.jpg" = "Cestino in bambù e candelabro"
  "meeting/vaso-bambu.jpg" = "Vaso di bambù con rami di nocciolo ricurvo"
}

$altPrefixOverrides = @{
  "meeting/sala-" = "Sala allestita con decorazioni floreali"
  "meeting/tavola-" = "Tavolo con centrotavola e candele"
}

# ---------------------------------------------------------------- collection
Write-Output "Reading pages from $SiteRoot"
$textByPath = @{}
$pathsByCategory = @{}

foreach ($page in $pages) {
  $url = $SiteRoot + "/" + $page.file
  try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
  } catch {
    Write-Output ("  skipped " + $page.file + " (" + $_.Exception.Message + ")")
    continue
  }
  $html = [Text.Encoding]::UTF8.GetString($response.RawContentStream.ToArray())
  $found = 0

  foreach ($match in [regex]::Matches($html, '(?is)<img\b[^>]*>')) {
    $tag = $match.Value
    $src = Get-Attribute $tag "src"
    if (-not $src) { continue }
    $src = $src.TrimStart(".", "/")
    if ($src.StartsWith("images/") -eq $false) { continue }
    if (-not (Test-KeepPath $src)) { continue }
    $title = Get-CleanText (Get-Attribute $tag "title")
    $alt = Get-CleanText (Get-Attribute $tag "alt")
    $text = Get-BestText $title $alt
    if ($text -and ((-not $textByPath[$src]) -or $text.Length -gt $textByPath[$src].Length)) {
      $textByPath[$src] = $text
    }
    $category = $page.category
    if (-not $pathsByCategory.ContainsKey($category)) { $pathsByCategory[$category] = @() }
    $pathsByCategory[$category] += $src
    $found++
  }

  foreach ($match in [regex]::Matches($html, '(?is)<a\b[^>]*?href\s*=\s*"(images/[^"]+?)"[^>]*>')) {
    $href = $match.Groups[1].Value
    if (-not (Test-KeepPath $href)) { continue }
    $category = $page.category
    if (-not $pathsByCategory.ContainsKey($category)) { $pathsByCategory[$category] = @() }
    $pathsByCategory[$category] += $href
    $found++
  }

  Write-Output ("  " + $page.file + ": " + $found + " references")
}

# ---------------------------------------------------------------- download
if (-not (Test-Path $Staging)) { New-Item -ItemType Directory -Path $Staging | Out-Null }
$records = @()

foreach ($category in $pathsByCategory.Keys) {
  $stagingDir = Join-Path $Staging $category
  if (-not (Test-Path $stagingDir)) { New-Item -ItemType Directory -Path $stagingDir | Out-Null }

  # Prefer the "Big" version of a photo over its thumbnail
  $preferred = @{}
  foreach ($path in $pathsByCategory[$category]) {
    $name = [IO.Path]::GetFileName($path)
    $base = [IO.Path]::GetFileNameWithoutExtension($name)
    $key = $base -replace '(?i)big$', ''
    if (-not $preferred.ContainsKey($key) -or $name -match '(?i)big$') {
      $preferred[$key] = $path
    }
  }

  foreach ($key in $preferred.Keys) {
    $remotePath = $preferred[$key]
    $localPath = Join-Path $stagingDir ([IO.Path]::GetFileName($remotePath))
    if (-not (Test-Path $localPath)) {
      try {
        Invoke-WebRequest -Uri ($SiteRoot + "/" + $remotePath) -OutFile $localPath -UseBasicParsing -TimeoutSec 60
      } catch {
        Write-Output ("  FAILED " + $remotePath)
        continue
      }
    }
    $item = Get-Item $localPath
    $hash = Get-FileSha256 -path $localPath
    $records += [PSCustomObject]@{
      Category = $category
      Source   = $remotePath
      Local    = $localPath
      Size     = $item.Length
      Hash     = $hash
    }
  }
}

Write-Output ("Downloaded " + $records.Count + " files to staging")

# ---------------------------------------------------------------- deduplicate
$groups = $records | Group-Object -Property Hash
$unique = @()
foreach ($group in $groups) {
  $members = @($group.Group)
  $chosen = $members | Sort-Object -Property @{Expression = { $categoryPriority.IndexOf($_.Category) }}, @{Expression = { $_.Size }; Descending = $true} | Select-Object -First 1
  $text = $null
  foreach ($member in $members) {
    if ($textByPath[$member.Source]) {
      $text = Get-BestText $text $textByPath[$member.Source]
    }
  }
  $unique += [PSCustomObject]@{
    Category = $chosen.Category
    Source   = $chosen.Source
    Local    = $chosen.Local
    Text     = $text
  }
}

Write-Output ("Unique photos: " + $unique.Count)

# Second pass: the old site stores the same photo in several folders at
# different sizes. Keep the biggest copy of each photo name.
$enriched = @()
foreach ($record in $unique) {
  $enriched += [PSCustomObject]@{
    Category = $record.Category
    Source   = $record.Source
    Local    = $record.Local
    Text     = $record.Text
    Area     = Get-ImageArea -path $record.Local
  }
}

$byKey = @{}
foreach ($record in $enriched) {
  $base = [IO.Path]::GetFileNameWithoutExtension($record.Local)
  $key = Convert-ToSlug (($base -replace '(?i)big$', '').TrimEnd('-'))
  if (-not $byKey.ContainsKey($key)) { $byKey[$key] = @() }
  $byKey[$key] += $record
}

$unique = @()
$dropped = 0
foreach ($key in $byKey.Keys) {
  $members = @($byKey[$key])
  $winner = $members | Sort-Object -Property @{Expression = { $_.Area }; Descending = $true}, @{Expression = { $categoryPriority.IndexOf($_.Category) }} | Select-Object -First 1
  $unique += $winner
  $dropped += ($members.Count - 1)
}
Write-Output ("Duplicate photo names removed: " + $dropped)
Write-Output ("Photos to write: " + $unique.Count)

# ---------------------------------------------------------------- write files
$OutRoot = [IO.Path]::GetFullPath($OutRoot)
# Start from an empty folder so renamed or removed photos do not stay behind
if (Test-Path $OutRoot) { Remove-Item -Path $OutRoot -Recurse -Force }

# Photos that start with a number (project steps) stay in numerical order,
# photos that start with a letter come after them.
function Get-PhotoSortKey {
  param([string]$path)
  $match = [regex]::Match([IO.Path]::GetFileName($path), '^\d+')
  if ($match.Success) { return [int]$match.Value }
  return 9999
}

$sortProperties = @(
  @{Expression = { $categoryPriority.IndexOf($_.Category) }},
  @{Expression = { Get-PhotoSortKey -path $_.Local }},
  @{Expression = { $_.Source }}
)
$sorted = $unique | Sort-Object -Property $sortProperties

$rows = @()
$sortOrder = 0
$usedNames = @{}

foreach ($record in $sorted) {
  $extension = [IO.Path]::GetExtension($record.Local).ToLowerInvariant()
  $base = ([IO.Path]::GetFileNameWithoutExtension($record.Local) -replace '(?i)big$', '').TrimEnd('-')
  $slug = Convert-ToSlug $base
  if (-not $slug) { $slug = "foto" }
  $name = $slug + $extension
  $suffix = 2
  while ($usedNames.ContainsKey($record.Category + "/" + $name)) {
    $name = $slug + "-" + $suffix + $extension
    $suffix++
  }
  $usedNames[$record.Category + "/" + $name] = $true

  $targetDir = Join-Path $OutRoot $record.Category
  if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir | Out-Null }
  Copy-Item -Path $record.Local -Destination (Join-Path $targetDir $name) -Force

  $relative = $record.Category + "/" + $name
  $override = $altOverrides[$relative]
  if (-not $override) {
    foreach ($prefix in $altPrefixOverrides.Keys) {
      if ($relative.StartsWith($prefix)) {
        $override = $altPrefixOverrides[$prefix]
        break
      }
    }
  }

  $caption = $record.Text
  $alt = $caption
  if (-not $alt) { $alt = Get-AltFromFileName $record.Local }
  if ($override) {
    $alt = $override
    $caption = $override
  }
  $sortOrder++

  $rows += [PSCustomObject]@{
    Category  = $record.Category
    File      = $relative
    Alt       = $alt
    Caption   = $caption
    SortOrder = $sortOrder
  }
}

# ---------------------------------------------------------------- seed file
$builder = New-Object System.Text.StringBuilder
[void]$builder.AppendLine("-- Generated by scripts/export-images.ps1. Do not edit by hand.")
[void]$builder.AppendLine("-- Photos exported from the current petaliefiori.it site.")
[void]$builder.AppendLine("")
[void]$builder.AppendLine("USE ``" + $DbName + "``;")
[void]$builder.AppendLine("")
[void]$builder.AppendLine("DELETE FROM ``gallery_images``;")
[void]$builder.AppendLine("")
[void]$builder.AppendLine("INSERT INTO ``gallery_images`` (``category``, ``file``, ``alt``, ``caption``, ``sort_order``, ``published``) VALUES")

$values = @()
foreach ($row in $rows) {
  $line = "  (" +
    (Convert-SqlValue $row.Category) + ", " +
    (Convert-SqlValue $row.File) + ", " +
    (Convert-SqlValue $row.Alt) + ", " +
    (Convert-SqlValue $row.Caption) + ", " +
    $row.SortOrder + ", 1)"
  $values += $line
}
[void]$builder.AppendLine(($values -join ",`n") + ";")
[void]$builder.AppendLine("")

$SeedFile = [IO.Path]::GetFullPath($SeedFile)
Save-SqlFile -path $SeedFile -content $builder.ToString()

$byCategory = $rows | Group-Object -Property Category | Sort-Object Name
foreach ($bucket in $byCategory) {
  Write-Output ("  " + $bucket.Name + ": " + $bucket.Count)
}
Write-Output ("Wrote " + $SeedFile)
Write-Output ("Wrote photos to " + $OutRoot)
