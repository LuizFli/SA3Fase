-- Inicialização do banco de dados sales_sight
-- Este arquivo é executado automaticamente quando o container PostgreSQL é iniciado pela primeira vez

-- Criar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários/funcionários
CREATE TABLE IF NOT EXISTS funcionarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(100),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de produtos (carros)
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(20) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    km INTEGER DEFAULT 0,
    cor VARCHAR(50),
    valor DECIMAL(15,2) NOT NULL,
    ano INTEGER,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de vendas
CREATE TABLE IF NOT EXISTS vendas (
    id SERIAL PRIMARY KEY,
    funcionario_id INTEGER REFERENCES funcionarios(id),
    produto_id INTEGER REFERENCES produtos(id),
    quantidade INTEGER NOT NULL,
    valor_unitario DECIMAL(10,2) NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'concluida'
);

-- Tabela de notificações
CREATE TABLE IF NOT EXISTS notificacoes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL,
    tipo VARCHAR(50) DEFAULT 'info',
    lida BOOLEAN DEFAULT false,
    funcionario_id INTEGER REFERENCES funcionarios(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados de exemplo
INSERT INTO funcionarios (nome, email, senha, cargo) VALUES 
('Administrador', 'admin@salesight.com', '$2b$10$hashed_password', 'Administrador'),
('João Silva', 'joao@salesight.com', '$2b$10$hashed_password', 'Vendedor'),
('Maria Santos', 'maria@salesight.com', '$2b$10$hashed_password', 'Gerente')
ON CONFLICT (email) DO NOTHING;

INSERT INTO produtos (placa, marca, modelo, km, cor, valor, ano) VALUES 
('ABC-1234', 'Toyota', 'Corolla', 50000, 'Prata', 45000.00, 2020),
('DEF-5678', 'Honda', 'Civic', 30000, 'Branco', 55000.00, 2021),
('GHI-9012', 'Volkswagen', 'Golf', 20000, 'Preto', 60000.00, 2022)
ON CONFLICT DO NOTHING;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_funcionarios_email ON funcionarios(email);
CREATE INDEX IF NOT EXISTS idx_vendas_funcionario ON vendas(funcionario_id);
CREATE INDEX IF NOT EXISTS idx_vendas_produto ON vendas(produto_id);
CREATE INDEX IF NOT EXISTS idx_vendas_data ON vendas(data_venda);
CREATE INDEX IF NOT EXISTS idx_notificacoes_funcionario ON notificacoes(funcionario_id);

-- Atualizar timestamps automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_funcionarios_updated_at BEFORE UPDATE ON funcionarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_produtos_updated_at BEFORE UPDATE ON produtos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO abilio;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO abilio;