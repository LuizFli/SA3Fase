# Use a imagem oficial do Node.js como base para o build
FROM node:18-alpine as build

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código da aplicação
COPY . .

# Faz o build da aplicação para produção
RUN npm run build

# Segunda etapa: usar nginx para servir os arquivos estáticos
FROM nginx:alpine

# Remove a configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Cria uma configuração customizada do nginx
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Configuração para APIs (proxying para o backend se necessário)
    location /api/ {
        proxy_pass http://backend:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Copia os arquivos buildados do estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o nginx
CMD ["nginx", "-g", "daemon off;"]