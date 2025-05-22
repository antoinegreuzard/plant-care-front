# Utiliser une image officielle de Node.js
FROM node:20.19.2

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json package-lock.json ./

# Supprimer les modules et nettoyer le cache NPM pour éviter les erreurs Rollup
RUN rm -rf node_modules package-lock.json && \
    npm cache clean --force

# Réinstaller proprement les dépendances avec une installation propre
RUN npm install --force --legacy-peer-deps

# Copier le reste du projet
COPY . .

# Exposer le port de Vite
EXPOSE 5173

# Démarrer le serveur de développement Vite en mode accessible
CMD ["npm", "run", "dev", "--", "--host"]
