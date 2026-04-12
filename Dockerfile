# Estágio de build
FROM node:20-alpine AS build

# Instalar pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copiar arquivos de dependência
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar o restante dos arquivos
COPY . .

# Build da aplicação
RUN pnpm build

# Estágio de produção
FROM nginx:alpine

# Copiar arquivo de configuração do nginx para suportar roteamento SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar os arquivos buildados para o diretório de arquivos estáticos do nginx
# O caminho dist/sakai-ng/browser é o padrão para o builder 'application' do Angular
COPY --from=build /app/dist/sakai-ng/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
