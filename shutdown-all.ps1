

Write-Host "🛑 Shutting down CloudOps environment..." -ForegroundColor Red

Write-Host "⛔ Stopping all running containers..." -ForegroundColor Yellow
docker stop $(docker ps -q) 2>$null | Out-Null

Write-Host "🗑 Removing ALL containers..." -ForegroundColor Yellow
docker rm $(docker ps -aq) 2>$null | Out-Null

Write-Host "✓ All Docker containers stopped & removed." -ForegroundColor Green

Write-Host "⛔ Stopping backend (uvicorn)..." -ForegroundColor Yellow
Get-Process uvicorn -ErrorAction SilentlyContinue | Stop-Process -Force


Write-Host "⛔ Stopping frontend (npm / node)..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process npm -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "✓ Backend & Frontend fully stopped." -ForegroundColor Green
Write-Host ""
Write-Host "🧹 Full environment cleanup complete!" -ForegroundColor Cyan
Write-Host "Your system is now clean and ready for next launch 🚀" -ForegroundColor Magenta
