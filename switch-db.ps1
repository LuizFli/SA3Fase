# Script PowerShell para alternar configuração de banco de dados
# Uso: .\switch-db.ps1 [local|external]

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("local", "external")]
    [string]$BankType
)

if ($BankType -eq "local") {
    Write-Host "🔄 Configurando para usar banco LOCAL (Docker PostgreSQL)" -ForegroundColor Yellow
    
    # Atualizar docker-compose.yml
    $dockerCompose = Get-Content "docker-compose.yml" -Raw
    $dockerCompose = $dockerCompose -replace "USE_EXTERNAL_DB=true", "USE_EXTERNAL_DB=false"
    Set-Content "docker-compose.yml" $dockerCompose
    
    Write-Host "✅ Configuração alterada para banco LOCAL" -ForegroundColor Green
    Write-Host "🐳 Execute: docker-compose up -d --build" -ForegroundColor Cyan
    
} elseif ($BankType -eq "external") {
    Write-Host "🔄 Configurando para usar banco EXTERNO (Render)" -ForegroundColor Yellow
    
    # Atualizar docker-compose.yml  
    $dockerCompose = Get-Content "docker-compose.yml" -Raw
    $dockerCompose = $dockerCompose -replace "USE_EXTERNAL_DB=false", "USE_EXTERNAL_DB=true"
    Set-Content "docker-compose.yml" $dockerCompose
    
    Write-Host "✅ Configuração alterada para banco EXTERNO" -ForegroundColor Green
    Write-Host "🐳 Execute: docker-compose up -d --build" -ForegroundColor Cyan
}