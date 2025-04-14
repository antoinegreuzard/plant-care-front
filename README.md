# 🌿 Plant Care Front

## 📌 Description
Plant Care Front est une application web développée avec **Vue 3** et **TypeScript**. Elle permet de gérer un jardin virtuel, d'ajouter et consulter des plantes, et d'interagir avec un backend.

## 🚀 Fonctionnalités
- 📜 Liste des plantes disponibles
- ➕ Ajout de nouvelles plantes
- 🔍 Détails des plantes
- 🔐 Authentification des utilisateurs
- 📊 Intégration avec un backend Django
- 📊 Intégration avec un backend Laravel
- 📊 Intégration avec un backend Symfony

---

## ⚙️ Installation et Exécution Locale

### 📦 Prérequis
- **Node.js** v20+
- **npm** (fourni avec Node.js)
- **Docker** et **Docker Compose** (pour l'environnement Dockerisé)

### 💻 Installation
```sh
# Cloner le projet
git clone https://github.com/antoinegreuzard/plant-care-front.git
cd plant-care-front

# Installer les dépendances
npm install
```

### ▶️ Démarrage du projet
```sh
npm run dev
```
L'application est maintenant accessible sur **http://localhost:5173/**.

---

## 🐳 Exécution avec Docker

### 🚀 Démarrer avec Docker Compose
Si tu veux exécuter l'application avec Docker et son backend :

```sh
# Lancer les services (backend et frontend)
docker-compose up --build
```
L'application sera accessible sur **http://localhost:5173/**.

### 🛑 Arrêter les services
```sh
docker-compose down
```

---

## 🛠️ Développement

### 🔎 Vérification du code
```sh
# Vérifier le code avec ESLint
npm run lint

# Vérifier le formatage avec Prettier
npm run format
```

### 🚀 Build pour production
```sh
npm run build
```

### ✅ Tests
#### Tests unitaires avec Vitest
```sh
npm run test:unit
```
#### Tests End-to-End avec Cypress
1. Démarrer l’application en mode **preview** :
   ```sh
   npm run preview &
   ```
2. Exécuter les tests Cypress :
   ```sh
   npm run test:e2e
   ```

---

## 🔥 CI/CD avec GitHub Actions
Le projet est équipé d’un workflow **GitHub Actions** qui :
1. Vérifie et formate le code
2. Exécute les tests unitaires
3. Construit l’image Docker
4. Lance les tests E2E après avoir démarré le backend

---

## 🤝 Contribution
Les contributions sont les bienvenues !
1. **Fork** le projet
2. **Crée une branche** (`feature/nouvelle-fonctionnalité`)
3. **Commit** tes modifications (`git commit -m "Ajout de ..."`)
4. **Push** la branche (`git push origin feature/nouvelle-fonctionnalité`)
5. **Ouvre une Pull Request** 🚀

---

## 📄 Licence
Ce projet est sous licence **MIT**. Tu es libre de l’utiliser et de le modifier !

---

### 💡 Auteur
Développé avec ❤️ par **Antoine Greuzard**. 🚀

Si tu as des questions, n'hésite pas à me contacter ! 😃
