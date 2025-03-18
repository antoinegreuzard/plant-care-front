# Utiliser l'image officielle de Node.js
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json package-lock.json ./

# Nettoyer le cache npm pour éviter les erreurs Rollup
RUN npm cache clean --force

# Installer proprement les dépendances avec `npm ci`
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copier le reste du projet
COPY . .

# Exposer le port de Vite
EXPOSE 5173

# Démarrer le serveur de développement Vite en mode accessible
CMD ["npm", "run", "dev", "--", "--host"]
