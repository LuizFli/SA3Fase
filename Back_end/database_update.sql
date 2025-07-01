-- Script para adicionar colunas email e avatar na tabela users
-- Execute este script no seu banco de dados PostgreSQL

-- Adicionar coluna email se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='users' AND column_name='email') THEN
        ALTER TABLE users ADD COLUMN email VARCHAR(255);
    END IF;
END $$;

-- Adicionar coluna avatar se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='users' AND column_name='avatar') THEN
        ALTER TABLE users ADD COLUMN avatar TEXT;
    END IF;
END $$;

-- Adicionar coluna updated_at se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='users' AND column_name='updated_at') THEN
        ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    END IF;
END $$;

-- Atualizar dados existentes com valores padrão
UPDATE users 
SET email = COALESCE(email, username || '@empresa.com'),
    avatar = COALESCE(avatar, '/Imagens/Adm.png'),
    updated_at = COALESCE(updated_at, CURRENT_TIMESTAMP)
WHERE email IS NULL OR avatar IS NULL OR updated_at IS NULL;
