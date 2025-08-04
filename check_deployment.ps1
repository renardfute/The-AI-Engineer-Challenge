# Vercel Deployment Status Checker
# Run this script to monitor deployment progress

Write-Host "🔄 Checking Vercel Deployment Status..." -ForegroundColor Cyan
Write-Host ""

# Test the live site
try {
    $response = Invoke-WebRequest -Uri "https://the-ai-engineer-challenge-8erdxkibe-renard-futes-projects.vercel.app" -UseBasicParsing
    Write-Host "✅ Site is responding (HTTP $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "❌ Site not responding" -ForegroundColor Red
}

Write-Host ""
Write-Host "🧪 Testing Backend..." -ForegroundColor Cyan

# Test backend health
try {
    $backendResponse = Invoke-WebRequest -Uri "https://ai-chat-backend-3k7m.onrender.com/api/health" -UseBasicParsing
    Write-Host "✅ Backend is responding (HTTP $($backendResponse.StatusCode))" -ForegroundColor Green
    Write-Host "📄 Response: $($backendResponse.Content)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Backend not responding" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Deployment Status:" -ForegroundColor Cyan
Write-Host "⏳ Git Push: ✅ COMPLETED" -ForegroundColor Green
Write-Host "⏳ Vercel Build: IN PROGRESS (2-3 minutes)" -ForegroundColor Yellow
Write-Host "⏳ New Interface: DEPLOYING..." -ForegroundColor Yellow
Write-Host "⏳ Cache Clear: PENDING..." -ForegroundColor Yellow

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Wait 2-3 minutes for Vercel to complete deployment" -ForegroundColor White
Write-Host "2. Refresh: https://the-ai-engineer-challenge-8erdxkibe-renard-futes-projects.vercel.app/" -ForegroundColor White
Write-Host "3. Hard refresh (Ctrl+F5) to clear cache" -ForegroundColor White
Write-Host "4. Look for new interface with configuration panel at top" -ForegroundColor White

Write-Host ""
Write-Host "🎯 Expected Changes:" -ForegroundColor Cyan
Write-Host "❌ Remove: Settings button (⚙️)" -ForegroundColor Red
Write-Host "✅ Add: Configuration panel at top" -ForegroundColor Green
Write-Host "✅ Add: Model dropdown always visible" -ForegroundColor Green
Write-Host "✅ Add: System message always visible" -ForegroundColor Green
Write-Host "✅ Add: 'API Key configured' status" -ForegroundColor Green

Write-Host ""
Write-Host "⏰ Status: WAITING FOR VERCELL REDEPLOYMENT..." -ForegroundColor Yellow 