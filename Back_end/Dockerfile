# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código da aplicação
COPY . .

# Expõe a porta que a aplicação vai usar
EXPOSE 3000

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Comando para iniciar a aplicação
CMD ["npm", "start"]