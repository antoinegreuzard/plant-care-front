# Utiliser l'image officielle Node.js
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json en premier (optimisation du cache Docker)
COPY package.json package-lock.json ./

# Nettoyer le cache npm pour éviter les erreurs Rollup
RUN npm cache clean --force

# Installer les dépendances proprement avec `npm ci`
RUN npm install

# Copier le reste du projet après l'installation des dépendances
COPY . .

# Exposer le port de Vite
EXPOSE 5173

# Lancer le serveur de développement en mode accessible
CMD ["npm", "run", "dev", "--", "--host"]
