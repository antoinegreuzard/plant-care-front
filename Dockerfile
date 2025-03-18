# Utiliser une image officielle de Node.js
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier le package.json et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste du projet
COPY . .

# Exposer le port de Vite
EXPOSE 5173

# Lancer le serveur de développement
CMD ["npm", "run", "dev"]
