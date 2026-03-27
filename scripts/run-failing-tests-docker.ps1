Write-Host "🔍 Running isolated Playwright tests in Docker..." -ForegroundColor Cyan

function Get-FailedTestFilesFromSuite {
    param(
        [Parameter(Mandatory = $true)] $Suite,
        [Parameter(Mandatory = $true)] [System.Collections.Generic.HashSet[string]] $Accumulator
    )

    if (-not $Suite) {
        return
    }

    if ($Suite.tests) {
        foreach ($test in $Suite.tests) {
            if ($test.status -eq "failed" -and $test.location -and $test.location.file) {
                [void]$Accumulator.Add($test.location.file)
            }
        }
    }

    if ($Suite.suites) {
        foreach ($childSuite in $Suite.suites) {
            Get-FailedTestFilesFromSuite -Suite $childSuite -Accumulator $Accumulator
        }
    }
}

$reportPath = "playwright-report/data/test-results.json"
$failingTests = @()

if (Test-Path $reportPath) {
    try {
        Write-Host "📄 Using failed tests from $reportPath" -ForegroundColor Yellow
        $reportJson = Get-Content -Path $reportPath -Raw
        $report = $reportJson | ConvertFrom-Json
        $failedFilesSet = New-Object 'System.Collections.Generic.HashSet[string]'

        if ($report.suites) {
            foreach ($rootSuite in $report.suites) {
                Get-FailedTestFilesFromSuite -Suite $rootSuite -Accumulator $failedFilesSet
            }
        }

        $failingTests = @($failedFilesSet.ToArray() | Sort-Object -Unique)
    }
    catch {
        Write-Host "⚠️  Unable to parse report. Falling back to default suite list." -ForegroundColor Yellow
    }
}

if ($failingTests.Count -eq 0) {
    Write-Host "ℹ️  No failed test report found. Falling back to current key suites." -ForegroundColor Yellow
    $failingTests = @(
        "tests/smoke.spec.ts",
        "tests/accessibility/critical.spec.ts",
        "tests/e2e/labs/navigation.spec.ts",
        "tests/e2e/labs/wallet-connection.spec.ts"
    )
}

Write-Host "`n📋 Failing Tests Summary:" -ForegroundColor Yellow
Write-Host "  Total failing tests: $($failingTests.Count)" -ForegroundColor White
$failingTests | ForEach-Object { Write-Host "    - $_" -ForegroundColor Gray }

# Build Docker image
Write-Host "`n🐳 Building Docker test environment..." -ForegroundColor Cyan
docker-compose -f docker-compose.test.yml build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker build failed!" -ForegroundColor Red
    exit 1
}

# Run each test file separately to isolate failures
Write-Host "`n🧪 Running isolated test suites..." -ForegroundColor Cyan

$results = @()

foreach ($testFile in $failingTests) {
    Write-Host "`n  Testing: $testFile" -ForegroundColor Yellow
    
    $startTime = Get-Date
    docker-compose -f docker-compose.test.yml run --rm playwright npx playwright test $testFile
    $exitCode = $LASTEXITCODE
    $duration = (Get-Date) - $startTime
    
    $results += [PSCustomObject]@{
        TestFile = $testFile
        ExitCode = $exitCode
        Duration = $duration.TotalSeconds
        Status = if ($exitCode -eq 0) { "✅ PASSED" } else { "❌ FAILED" }
    }
}

# Summary report
Write-Host "`n" + ("="*80) -ForegroundColor Cyan
Write-Host "📊 Test Results Summary" -ForegroundColor Cyan
Write-Host ("="*80) -ForegroundColor Cyan

$results | Format-Table -AutoSize

$passed = ($results | Where-Object { $_.ExitCode -eq 0 }).Count
$failed = ($results | Where-Object { $_.ExitCode -ne 0 }).Count

Write-Host "`n📈 Final Stats:" -ForegroundColor Cyan
Write-Host "  ✅ Passed: $passed" -ForegroundColor Green
Write-Host "  ❌ Failed: $failed" -ForegroundColor Red
Write-Host "  📁 Total: $($results.Count)" -ForegroundColor White

if ($failed -gt 0) {
    Write-Host "`n⚠️  Some tests still failing. Check test-results/ and playwright-report/ for details." -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "`n🎉 All tests passed!" -ForegroundColor Green
    exit 0
}
