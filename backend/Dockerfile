# Imagem base leve com Node LTS
FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas manifestos para aproveitar cache de camadas
COPY package*.json ./

# Instala as dependências de produção e desenvolvimento
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta padrão da API
EXPOSE 4000

# Comando padrão: modo desenvolvimento com recarregamento via nodemon
CMD ["npm", "run", "dev"]
