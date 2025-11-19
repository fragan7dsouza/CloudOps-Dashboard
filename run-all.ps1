Write-Host "=== Starting CloudOps Dashboard Project ===`n"

# ---------- 1) Start Backend ----------
Write-Host "[1/4] Starting backend..."
Start-Process powershell -ArgumentList "cd './backend'; uvicorn app.main:app --reload" 
Start-Sleep -Seconds 2

# ---------- 2) Start Frontend ----------
Write-Host "[2/4] Starting frontend..."
Start-Process powershell -ArgumentList "cd './frontend'; npm run dev"
Start-Sleep -Seconds 2

# ---------- 3) Start Test Containers ----------
Write-Host "[3/4] Starting stress containers..."

$containers = @(
    @{ name="stress1"; cpu=1; mem="128M" },
    @{ name="stress2"; cpu=2; mem="128M" },
    @{ name="stress3"; cpu=1; mem="256M" }
)

foreach ($c in $containers) {
    Write-Host "   Starting container $($c.name)..."
    docker rm -f $($c.name) 2>$null | Out-Null

    docker run -d `
        --name $($c.name) `
        polinux/stress `
        --cpu $($c.cpu) `
        --vm 1 `
        --vm-bytes $($c.mem) `
        --timeout 60s
}

Write-Host "`nAll components launched successfully!"
Write-Host "Backend on: http://localhost:8000"
Write-Host "Frontend on: http://localhost:5173"
Write-Host "========================================"
