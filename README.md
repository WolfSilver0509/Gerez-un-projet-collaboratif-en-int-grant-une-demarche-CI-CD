# 🅿️🔟 Gérez un projet collaboratif en intégrant une démarche CI/CD

## 💁🏻‍♀️ Résumé du projet BobApp ! 

### 👉🏻 Contexte:

Ça fait 3 ans que Bob a lancé son application ! Chaque jour le nombre de visiteurs augmente, mais cela devient compliqué pour Bob de gérer cela tout seul. Il a passé le projet sous licence open source, mais peu de personnes se sont investies pour l’instant.

## 🎢 Mise en place d'une pipeline CI/CD avec GitHub Actions, Docker et SonarCloud

Le présent document a pour objectif de décrire la configuration d'une pipeline d'intégration et de déploiement continus (CI/CD) reposant sur GitHub Actions, Docker et SonarCloud. Cette pipeline automatisera les tâches de build, de test et de déploiement de l'application, tout en garantissant un haut niveau de qualité du code.

## 🛠️ Outils utilisés

* GitHub Actions: Plateforme d'automatisation CI/CD native à GitHub, permettant de définir des workflows personnalisés pour chaque projet.
* Docker: Outil de conteneurisation permettant de créer des environnements d'exécution isolés et reproductibles pour les applications.
* SonarCloud: Plateforme d'analyse de code statique offrant une vue détaillée de la qualité du code et permettant d'identifier les potentielles vulnérabilités, les bugs et les améliorations possibles.

## 🏗️ Architecture

### 🚧 L'architecture de la pipeline CI/CD est la suivante :

* GitHub: Le dépôt source de l'application, déclencheur des workflows GitHub Actions.
* Registre Docker (Docker Hub): Stockage des images Docker générées par la pipeline.
* SonarCloud: Plateforme d'analyse de code, intégrée à la pipeline pour fournir des métriques de qualité en continu.


## ⚠️ Avant de se lancer :

### 📃 Suivez les étapes suivantes pour crée vos comptes sur les outils nécéssaires  :

* Créer un compte Docker Hub: 
Pour créer un compte Docker Hub, rendez-vous sur le site [Docker Hub](https://hub.docker.com/) et cliquez sur le bouton "Sign Up" pour créer un compte.
* Créer un compte SonarCloud : 
Pour créer un compte SonarCloud, rendez-vous sur le site [SonarCloud](https://sonarcloud.io/) et cliquez sur le bouton "Log In" pour créer un compte.
* Créer un dossier contenant les github actions
Créez un dossier `.github/workflows` à la racine de votre projet et ajoutez y les fichiers `****.yml` contenant les actions à exécuter lors des événements spécifiques sur votre dépôt GitHub.


## ↘️ Configuration de la pipeline 🚀

#### 📡 Creation de 2 fichiers github actions

Dans le dossier `.github/workflows`,création d'un fichier "FrontEnd.yml" pour le frontend et un fichier " Backend.yml " pour le backend:


*Voir les commentaires dans les fichiers respectifs pour plus de detail*


Ces 2 fichiers contiennent les actions à exécuter lors des événements spécifiques sur le dépôt GitHub.


#### 🔐 Ajout des secrets dans GitHub

Pour que les actions puissent accéder à SonarCloud et DockerHub on doit ajouter les secrets:

* Accéder aux paramètres de votre repository GitHub :  

Dans le menu de gauche, cliquez sur "Secrets and variables" puis sur "Actions".  
Cliquez sur "New repository secret" (Nouveau secret de repository).  
Ajoutez les secrets suivants :  

* **DOCKER_USERNAME** : Votre nom d'utilisateur Docker Hub.  
* **DOCKER_PASSWORD** : Votre mot de passe Docker Hub.  
* **SONAR_TOKEN_FRONT** : Votre jeton d'accès SonarCloud pour le frontend (généré dans SonarCloud sous "My Account" > "Security").  
* **SONAR_TOKEN_BACK** : Votre jeton d'accès SonarCloud pour le backend (généré dans SonarCloud sous "My Account" > "Security").  


## 📔 Configuration de Karma et JaCoCo pour les tests & couverture de code: 
Pour le frontend, on utilise Karma pour les tests et JaCoCo pour la couverture de code.  

#### ➡️ Configuration de Karma

Le fichier `karma.conf.js` fourni dans le projet, contient la configuration de Karma. Modification pour les tests en mode headless et la génération des rapports de couverture de code (voir les commentaires dans le fichier pour plus de détails).  
Notament, la configuration de `browsers` à `ChromeHeadless` pour les tests en mode headless et `lcov` pour la génération des rapports de couverture de code pour SonarCloud.  
Modification de `package.json` pour ajouter les scripts de test en mode ChromeHeadLess.
#### ➡️ Configuration de JaCoCo

Le fichier `pom.xml` fourni dans le projet, contient la configuration de JaCoCo. Modification pour la génération des rapports de couverture de code (voir les commentaires dans le fichier pour plus de détails).

## 🌐 Workflow pour le FrontEnd

Ce workflow GitHub Actions est conçu pour automatiser les tâches liées au développement frontend d'une application nommée "Bobapp". Il couvre les étapes allant de la construction et des tests à la création et au déploiement d'une image Docker.

#### Déclencheurs du workflow:

* Push sur la branche CI-CD-P10: Le workflow entier est déclenché lorsqu'un nouveau commit est poussé sur cette branche.
* Pull request : ouvert, synchronisé, réouvert: Le job Frontend est déclenché lors de ces événements sur une pull request.
Jobs du workflow

#### Frontend
* Configuration de Node.js: Utilise la version 14.x de Node.js pour un environnement de build cohérent.
* Installation des dépendances: Exécute npm ci pour installer les dépendances du projet.
* Build: Exécute npm build pour compiler l'application frontend.
* Tests: Exécute npm test pour lancer les tests unitaires.
* Couverture de code: Collecte les résultats de la couverture de code pour évaluer la qualité du code.
* Analyse SonarCloud: Envoie le code à SonarCloud pour une analyse approfondie de la qualité et de la sécurité.

#### DockerLogAndBuild

* Connexion à Docker Hub: Se connecte au registre Docker Hub à l'aide des informations d'identification fournies.
* Build et push de l'image: Construit une image Docker de l'application frontend, la tague avec un nom spécifique et la pousse vers Docker Hub.
* Étapes clés et explications
* Matrix: Permet de tester le workflow avec différentes versions de Node.js (bien que seule la version 14.x soit définie dans cet exemple).
* Caching: Cache les dépendances npm pour accélérer les builds ultérieurs.
* Artifacts: Archive les résultats de la couverture de code pour une inspection ultérieure.
* SonarCloud: Intègre SonarCloud pour analyser la qualité du code et identifier les potentiels problèmes.
* Docker: Crée une image Docker pour faciliter le déploiement de l'application dans un environnement de conteneur.

## 🧭 Workflow pour le BackEnd



## 📍 Ajout des KPIs (via SonarCloud et des Quality Gates)
Ajout de KPIs (Key Performance Indicators) au projet via des Quality Gates.

### KPI num 1: Coverage 📌
Le KPI num 1 est la couverture de code. Il est mesuré par JaCoCo et affiché dans SonarCloud. Le Quality Gate pour ce KPI est de 80%. Ca signifie que le code doit avoir une couverture de code de 80% ou plus pour passer le Quality Gate.

### KPI num 2: Security hotspots Reviewed 📌
Le KPI num 3 est le nombre de Security Hotspots Reviewed. Un Security Hotspot est un indicateur de risque potentiel dans le code qui nécessite une attention particulière pour garantir qu'il ne devienne pas une vulnérabilité de sécurité.


## 📊 Analyse des metriques et retours utilisateurs


#### 🙋‍♂️ Retours utilisateurs 👥

* 1. "Je mets une étoile car je ne peux pas en mettre zéro ! Impossible de poster une suggestion de blague, le bouton tourne et fait planter mon navigateur"
* 2. "#BobApp j'ai remonté un bug sur le post de vidéo il y a deux semaines et il est encore présent ! Les devs vous faites quoi????"

Ces 2 retours sont symptomatiques d'un probleme de performance et de stabilité de l'application. La mise en place d'un pipeline CI/CD avec des tests et des analyses de code permet de détecter et de corriger ces problèmes avant que le code ne soit mis en production.

* 3. "Ca fait une semaine que je ne reçois plus rien, j'ai envoyé un email il y a 5 jours mais toujours pas de nouvelles..."

* 4. "J'ai supprimé ce site de mes favoris ce matin, dommage, vraiment dommage."

Ces 2 retours utilisateur sont symptomatiques d'un probleme de communication entre les équipes de développement et les utilisateurs. La mise en place d'un pipeline CI/CD avec des KPIs permet de suivre la qualité du code et de communiquer efficacement avec les utilisateurs.

### Pour mettre en place une strategie CI/CD efficace, il est important de suivre les KPIs, d'analyser les retours utilisateurs et de corriger les problemes rapidement. Il serait judicieux de modifier les gitHub actions de CD pour que le deploiement ne se fasse que si les Quality Gates sont passés.

