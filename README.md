
# Inscription et validation sur Cypress.io : test

Ce projet utilise Cypress pour réaliser des tests end-to-end et MailSlurp pour la gestion d'adresses email temporaires.

## Prérequis

- Node.js installé
- Une clé API MailSlurp

## Installation 

Ajouter a votre package.json:
"scripts": {
    "test": "npx cypress open",
    "test:headless": "npx cypress run"
  },

  Ajouter a votre cypress.config.js:
   env: {
      API_KEY: "your-mailslurp-api-key"
    }

Créer un fichier `.env` à la racine du projet :

```
API_KEY=your-mailslurp-api-key
```

## Lancer les tests

Sur Navigateur :

```bash
npm run test
```

En mode headless :

```bash
npm run test:headless
```
## Accès à la date de fin d'essai

La date de fin d'essai demandé est enregistrée dans :..\fixtures\dayleft.json

## Dépendances principales

- `cypress`
- `cypress-mailslurp`

## Documentation

- Cypress : https://docs.cypress.io/app/get-started/why-cypress
- Mailslurp : https://docs.mailslurp.com/cypress-mailslurp/