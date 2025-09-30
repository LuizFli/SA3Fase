# Script PowerShell para testar backend e banco de dados

Write-Host "TESTANDO BACKEND E BANCO DE DADOS SA3FASE" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "1. Testando conexao com containers..." -ForegroundColor Yellow
docker ps --format "table {{.Names}}`t{{.Status}}`t{{.Ports}}"

Write-Host ""
Write-Host "2. Testando banco PostgreSQL..." -ForegroundColor Yellow

Write-Host "   Produtos no banco:" -ForegroundColor White
docker exec sa3fase-postgres psql -U abilio -d sales_sight -c "SELECT COUNT(*) as total_produtos FROM produtos;" 2>$null

Write-Host "   Funcionarios no banco:" -ForegroundColor White  
docker exec sa3fase-postgres psql -U abilio -d sales_sight -c "SELECT COUNT(*) as total_funcionarios FROM funcionarios;" 2>$null

Write-Host ""
Write-Host "3. Testando APIs do Backend..." -ForegroundColor Yellow

Write-Host "   API Produtos:" -ForegroundColor White
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/produtos" -UseBasicParsing
    Write-Host "   OK - API Produtos respondeu" -ForegroundColor Green
} catch {
    Write-Host "   ERRO ao acessar API Produtos" -ForegroundColor Red
}

Write-Host "   API Funcionarios:" -ForegroundColor White
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/funcionarios" -UseBasicParsing
    Write-Host "   OK - API Funcionarios respondeu" -ForegroundColor Green
} catch {
    Write-Host "   ERRO ao acessar API Funcionarios" -ForegroundColor Red
}

Write-Host "   API Notificacoes:" -ForegroundColor White
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/notificacoes" -UseBasicParsing
    Write-Host "   OK - API Notificacoes respondeu" -ForegroundColor Green
} catch {
    Write-Host "   ERRO ao acessar API Notificacoes" -ForegroundColor Red
}

Write-Host ""
Write-Host "4. Acessos:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:8080" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "   Database: localhost:5432" -ForegroundColor Cyan

Write-Host ""
Write-Host "TESTE COMPLETO!" -ForegroundColor Green