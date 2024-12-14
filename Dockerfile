FROM tiangolo/nginx-rtmp:latest

# Copiar o arquivo de configuração
COPY nginx.conf /etc/nginx/nginx.conf

# Criar o diretório onde os HLS chunks serão armazenados
RUN mkdir -p /var/www/html/hls && chmod -R 777 /var/www/html/hls
