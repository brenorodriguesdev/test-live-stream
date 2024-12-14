# Usar a imagem base do NGINX com suporte a RTMP
FROM tiangolo/nginx-rtmp:latest

# Instalar pacotes adicionais necessários para Certbot
RUN apt-get update && apt-get install -y \
    certbot \
    python3-certbot-nginx \
    && rm -rf /var/lib/apt/lists/*

# Copiar o arquivo de configuração do NGINX personalizado
COPY nginx.conf /etc/nginx/nginx.conf

# Criar o diretório onde os arquivos HLS serão armazenados
RUN mkdir -p /var/www/html/hls

# Criar o diretório para o Certbot
RUN mkdir -p /var/www/certbot

# Expor as portas
EXPOSE 80 443 1935

# Comando padrão para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]