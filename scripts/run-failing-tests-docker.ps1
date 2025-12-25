# Script to run only the failing Playwright tests in Docker
# Based on analysis of CI run #20292773787

Write-Host "🔍 Running isolated failing Playwright tests in Docker..." -ForegroundColor Cyan

# List of failing tests identified from CI logs (48 failures)
$failingTests = @(
    # Accessibility tests (16 failures)
    "tests/accessibility/all-pages.spec.ts",
    "tests/accessibility/resume.spec.ts",
    
    # Visual tests (11 failures)
    "tests/visual/homepage.spec.ts",
    "tests/visual/projects.spec.ts",
    "tests/visual/resume.spec.ts",
    
    # E2E tests (10 failures)
    "tests/e2e/labs/wallet-connection.spec.ts",
    
    # Diagnostics (1 failure)
    "tests/diagnostics/page-rendering.spec.ts"
)

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
