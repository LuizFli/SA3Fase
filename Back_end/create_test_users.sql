-- Script para criar um usuário de teste
-- Execute este script no seu banco de dados PostgreSQL após executar o database_update.sql

-- Inserir um usuário de teste se não existir
INSERT INTO users (name, username, password, role, email, avatar) 
SELECT 
    'Administrador Sistema',
    'admin',
    'admin123',
    'admin',
    'admin@empresa.com',
    '/Imagens/Adm.png'
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE username = 'admin'
);

-- Inserir outro usuário de teste
INSERT INTO users (name, username, password, role, email, avatar) 
SELECT 
    'João Silva',
    'joao',
    'joao123',
    'user',
    'joao@empresa.com',
    '/Imagens/user.png'
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE username = 'joao'
);

-- Verificar os usuários criados
SELECT id, name, username, role, email, avatar FROM users;
