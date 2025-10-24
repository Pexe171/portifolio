# Imagem base com Node LTS para o frontend Vite
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia apenas os manifestos para cache eficiente
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Exposição da porta do Vite
EXPOSE 5173

# Executa o servidor de desenvolvimento acessível externamente
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
