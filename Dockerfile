# Utiliser l'image NGINX officielle
FROM nginx:latest
# Installation d'OpenSSL
RUN apt-get update && apt-get install -y openssl
# Copie du fichier de configuration NGINX
COPY nginx.conf /etc/nginx/nginx.conf
# Création du répertoire pour les certificats SSL
RUN mkdir -p /etc/nginx/ssl
# Copie des certificats SSL
COPY certs/local.projetangular.com.crt /etc/nginx/ssl/
COPY certs/local.projetangular.com.key /etc/nginx/ssl/
# Copie des fichiers de l'application Angular
COPY dist/projettest_angular/ /usr/share/nginx/html
# Exposer les ports
EXPOSE 80
EXPOSE 443
# Installation de Node.js et npm pour exécuter JSON Server
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs npm
# Création du répertoire de l'application
RUN mkdir -p /app
WORKDIR /app
# Copie des fichiers package.json et db.json
COPY package.json /app
COPY data/db.json /app/data/

# Installation de json-server
RUN npm install -g json-server

# Commande pour exécuter NGINX et JSON Server avec SSL
CMD ["bash", "-c", "nginx -g 'daemon off;' & json-server --watch data/db.json --port 8089 --host 0.0.0.0"]
