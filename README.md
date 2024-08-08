<div align="center">
  <h1>Cash Eyes (user-service api documentation)</h1>
  <h6>Ce repository contien toutes les routes (et routines) du micro service utilisation de Cash Eyes.</h6>
</div>

### Table des matières.
- [Packages](#packages)
  - [Dev-packages](#dev-packages)
  - [Packages](#packages-1)
- [Backend installation](#backend-installation)
- [Démarer le backend de l'application](#démarer-le-backend-de-lapplication)
- [API](#api)
  - [Créer son profil](#créer-son-profil)
    - [URL](#url)
    - [Request Parameters :](#request-parameters-)
    - [*Exemple de requête*](#exemple-de-requête)
    - [Response Parameters :](#response-parameters-)
    - [*Exemple de réponse*](#exemple-de-réponse)
  - [Connexion à son profil](#connexion-à-son-profil)
    - [URL](#url-1)
    - [Request Parameters :](#request-parameters--1)
    - [*Exemple de requête*](#exemple-de-requête-1)
    - [Response Parameters :](#response-parameters--1)
    - [*Exemple de réponse*](#exemple-de-réponse-1)
  - [Mise à jour de son mdp](#mise-à-jour-de-son-mdp)
    - [URL](#url-2)
    - [Request Parameters :](#request-parameters--2)
    - [*Exemple de requête*](#exemple-de-requête-2)
    - [Response Parameters :](#response-parameters--2)
    - [*Exemple de réponse*](#exemple-de-réponse-2)
  - [Mdp oublié](#mdp-oublié)
    - [URL](#url-3)
    - [Request Parameters :](#request-parameters--3)
    - [*Exemple de requête*](#exemple-de-requête-3)
    - [Response Parameters :](#response-parameters--3)
    - [*Exemple de réponse*](#exemple-de-réponse-3)
  - [Mdp réinitialisé](#mdp-réinitialisé)
    - [URL](#url-4)
    - [Request Parameters :](#request-parameters--4)
    - [*Exemple de requête*](#exemple-de-requête-4)
    - [Response Parameters :](#response-parameters--4)
    - [*Exemple de réponse*](#exemple-de-réponse-4)
  - [Get account details](#get-account-details)
    - [URL](#url-5)
    - [Request Parameters :](#request-parameters--5)
    - [*Exemple de requête*](#exemple-de-requête-5)
    - [Response Parameters :](#response-parameters--5)
    - [*Exemple de réponse*](#exemple-de-réponse-5)
  - [Update account](#update-account)
    - [URL](#url-6)
    - [Request Parameters :](#request-parameters--6)
    - [*Exemple de requête*](#exemple-de-requête-6)
    - [Response Parameters :](#response-parameters--6)
    - [*Exemple de réponse*](#exemple-de-réponse-6)
  - [Delete account](#delete-account)
    - [URL](#url-7)
    - [Request Parameters :](#request-parameters--7)
    - [*Exemple de requête*](#exemple-de-requête-7)
    - [Response Parameters :](#response-parameters--7)
    - [*Exemple de réponse*](#exemple-de-réponse-7)
  - [Update profil picture](#update-profil-picture)
    - [URL](#url-8)
    - [Request Parameters :](#request-parameters--8)
    - [*Exemple de requête*](#exemple-de-requête-8)
    - [Response Parameters :](#response-parameters--8)
    - [*Exemple de réponse*](#exemple-de-réponse-8)
  - [Follow Unfollow](#follow-unfollow)
    - [URL](#url-9)
    - [Request Parameters :](#request-parameters--9)
    - [*Exemple de requête*](#exemple-de-requête-9)
    - [Response Parameters :](#response-parameters--9)
    - [*Exemple de réponse*](#exemple-de-réponse-9)
  - [Search user by name](#search-user-by-name)
    - [URL](#url-10)
    - [Request Parameters :](#request-parameters--10)
    - [*Exemple de requête*](#exemple-de-requête-10)
    - [Response Parameters :](#response-parameters--10)
    - [*Exemple de réponse*](#exemple-de-réponse-10)
  - [Search user by id](#search-user-by-id)
    - [URL](#url-11)
    - [Request Parameters :](#request-parameters--11)
    - [*Exemple de requête*](#exemple-de-requête-11)
    - [Response Parameters :](#response-parameters--11)
    - [*Exemple de réponse*](#exemple-de-réponse-11)
  - [Search user by keyword](#search-user-by-keyword)
    - [URL](#url-12)
    - [Request Parameters :](#request-parameters--12)
    - [*Exemple de requête*](#exemple-de-requête-12)
    - [Response Parameters :](#response-parameters--12)
    - [*Exemple de réponse*](#exemple-de-réponse-12)
  - [Suggered user](#suggered-user)
    - [URL](#url-13)
    - [Request Parameters :](#request-parameters--13)
    - [*Exemple de requête*](#exemple-de-requête-13)
    - [Response Parameters :](#response-parameters--13)
    - [*Exemple de réponse*](#exemple-de-réponse-13)
- [About :](#about-)

## Packages
### Dev-packages
- `@commitlint/cli` - Un module très utile pour la normalisation des noms de commit git [^1].
- `@commitlint/config-conventional`  - configuration conventionnel de commitlint [^2]. 
- `@types/bcryptjs` - Définitions des types du module bcryptjs [^3].
- `@types/cookie-parser` - Définitions des types du module cookie-parser [^4].
- `@types/express` - Définitions des types du module express [^5].
- `@types/express-fileupload` - Définitions des types du module express-fileupload [^6].
- `@types/jest` - Définitions des types du module jest [^7].
- `@types/node` - Définitions des types du module nodejs [^8].
- `@types/nodemailer` - Définitions des types du module nodemailer [^9].
- `@types/supertest` - Définitions des types du module supertest [^10].
- `@types/uuid` - Définitions des types du module uuid [^11].
- `@typescript-eslint/eslint-plugin` - Un plugin ESLint qui fournit des règles de contrôle pour les bases de code TypeScript [^12].
- `@typescript-eslint/parser` - Un analyseur ESLint qui exploite TypeScript ESTree pour permettre à ESLint d'analyser le code source TypeScript [^13].
- `concurrently` - Exécuter plusieurs commandes simultanément. Comme npm run watch-js & npm run watch-less mais en mieux [^14]
- `eslint` - ESLint est un outil permettant d'identifier et de signaler les schémas trouvés dans le code ECMAScript/JavaScript [^15].
- `eslint-plugin-jest` - ESLint plugin for Jest [^16].
- `husky` - Husky améliore vos commits et plus encore [^17].
- `jest` - Des tests JavaScript délicieux [^18].
- `nodemon` - nodemon est un outil qui redémarre automatiquement l'application node lorsque des changements sont détectés [^19].
- `supertest` - Module pour teste HTTP [^20].
- `ts-jest` - Un transformateur Jest avec le support de la carte source qui vous permet d'utiliser Jest pour tester des projets écrits en TypeScri [^21].
- `ts-node` - Exécution TypeScript et REPL pour node.js, avec support source map et ESM natif [^22].
- `typescript` - Javascript avec typage fort [^23].

### Packages
- `bcryptjs` - Optimisation de bcrypt en JavaScript avec zéro dépendance [^24].
- `checks` - fonctions pour vérifier le typage [^25].
- `constraint` - fonction de contrainte (surtout texte) [^26].
- `cookie-parser` - Analyse l'en-tête Cookie et remplit req.cookies avec un objet dont la clé est le nom du cookie [^27].
- `dateformat` - fonction de modifications sur la date [^28].
- `dotenv` - Dotenv est un module à dépendance zéro qui charge les variables d'environnement d'un fichier .env dans process.env [^29].
- `express` - Framework web minimaliste, rapide et sans opinion pour Node.js [^30].
- `express-fileupload` - middleware express simple pour le téléchargement de fichiers [^31].
- `mailgen` - Un paquet Node.js qui génère des e-mails HTML propres et réactifs pour l'envoi de courriers transactionnels [^32].
- `mongoose` - Mongoose est un outil de modélisation d'objets MongoDB conçu pour fonctionner dans un environnement asynchrone [^33].
- `nodemailer` - Envoyer des courriels à partir de Node.js - c'est simple comme bonjour [^34].
- `uuid` - Pour la création des UUID RFC9562 (anciennement RFC4122) [^35].


## Backend installation

**1. Packages**

```shell
npm install
```

**2. Créer les fichiers de configuration**

```shell
cd ./config
nano .env
```

```env
# Dans le fichier `.env`
SECRETCOOKIES=String # Un mdp pour gérer les cookies secrets
PORTAPP=Int # Port d'écoute de la machine
TOKENEXPIRATION=Int # Temps avant expiration du token (en ms)
TOKENSIGNATURE=String # un mdp pour signer les token
URLAPP=String # L'url de l'application (mettre localhost si vous n'en avez pas)

URLDB=String # l'uri de mongodb (avec une db en fin de uri)
DBNAME=String # document de mongodb

EMAILPUBLICADRESS=String # L'email manager
EMAILAPIPRIVATEKEY=String # Le mdp pour accéder à cet email manager
```

> [!CAUTION]
> Veuillez à ne pas mettre un mdp suppérieur à 10 caractère pour le paramètre -> TOKENSIGNATURE

## Démarer le backend de l'application
Pour démarer le backend vous avez besoin de faire les étapes précédemment expliquées puis les commandes suivantes.
```shell
npm run build
npm run prod
# OR
npm start
```

## API
### Créer son profil
#### URL
```http
POST /sign/up
```

#### Request Parameters : 
| Parameter  | Type     |   Min   |   Max   |
| :--------- | :------: | :-----: | :-----: |
| `password` | `String` |   `4`   | &#9744; |
| `username` | `String` |   `2`   |   `20`  |
| `email`    | `String` | &#9744; | &#9744; | 

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/sign/up',
        method: 'POST',
        body: {
            password : input.password, 
            username : input.username,
            email : input.email
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

> [!TIP]
> A token cookie will be delivered.

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[],"__v":12}]'
}
```

### Connexion à son profil
#### URL
```http
POST /sign/in
```

#### Request Parameters : 
| Parameter  |   Type   |            Description            |
| :--------- | :------: | :-------------------------------- |
| `password` | `String` | Le mot de passe pour s'identifier |
|  `userId`  | `String` | Votre email ou votre nom          |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/sign/in',
        method: 'POST',
        body: {
            password : input.password, 
            userId : input.username,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

> [!TIP]
> A token cookie will be delivered.

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[],"__v":12}]'
}
```


### Mise à jour de son mdp
#### URL
```http
POST /password
```

#### Request Parameters : 
| Parameter     |   Type   |            Description            |
| :------------ | :------: | :-------------------------------- |
| `oldPassword` | `String` | Le mot de passe pour s'identifier |
| `newPassword` | `String` | Le nouveau mdp pour s'identifier  |
| `token`       | `String` | Votre identifiant                 |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/password',
        method: 'POST',
        body: {
            oldPassword : input.confirmPassword,
            newPassword : input.Newpassword,
            token : sessionStorage.token,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

> [!TIP]
> A token cookie will be delivered.

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[],"__v":12}]'
}
```


### Mdp oublié
#### URL
```http
POST /password/forgot
```

#### Request Parameters : 
| Parameter |   Type   |               Description                |
| :-------- | :------: | :--------------------------------------- |
| `email`   | `String` | L'email à contacter pour envoyer le lien |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/password/forgot',
        method: 'POST',
        body: {
            email : input.email,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : 'Email sent to admin@example.org'
}
```


### Mdp réinitialisé
#### URL
```http
POST /password/reset/:token
```

> [!TIP]
> \[Token\] a été envoyé dans le liens à cliquer.

#### Request Parameters : 
| Parameter  |   Type   | Min | Description |
| :--------- | :------: | :-: | :---------- |
| `password` | `String` | `4` | Nouveau mdp |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: `/password/reset/${input.tokenReset}`,
        method: 'POST',
        body: {
            password : input.password,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

> [!TIP]
> A token cookie will be delivered.

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[],"__v":12}]'
}
```


### Get account details
#### URL
```http
GET /@me
```

> [!NOTE]
> \[Token\]  Required.

#### Request Parameters : 
| Parameter  |   Type   | Description       |
| :--------- | :------: | :---------------- |
| `token`    | `String` | Votre identifiant |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: `/@me`,
        method: 'GET',
        body: {
            token : SessionStorage.token,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[],"__v":12}]'
}
```


### Update account
#### URL
```http
PUT /@me
```

> [!NOTE]
> \[Token\]  Required.

#### Request Parameters : 
| Parameter  | Type     |   Min   |   Max   |
| :--------- | :------: | :-----: | :-----: |
| `bio`      | `String` |   `1`   |   `250` |
| `username` | `String` |   `2`   |   `20`  |
| `email`    | `String` | &#9744; | &#9744; | 
| `token`    | `String` | &#9744; | &#9744; | 

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: `/@me`,
        method: 'PUT',
        body: {
            token : SessionStorage.token,
            username : input.username,
            email : input.email,
            bio : input.bio,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[],"__v":12}]'
}
```


### Delete account
#### URL
```http
DELETE /@me
```

> [!NOTE]
> \[Token\]  Required.

#### Request Parameters : 
| Parameter  | Type     |
| :--------- | :------: | 
| `token`    | `String` |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: `/@me`,
        method: 'DELETE',
        body: {
            token : SessionStorage.token,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : 'Utilisateur supprimé'
}
```


### Update profil picture
#### URL
```http
POST /@me/avatar
```

> [!NOTE]
> \[Token\]  Required.

#### Request Parameters : 
| Parameter | Type     | Max     | Description |
| :-------- | :------: | :-----: | :---------- |
| `token`   | `String` | &#9744; | Identifiant |
| `avatar`  | `File`   | `9Mb`   | Fichier img |

#### *Exemple de requête*
```js
    let axios = require('axios')
    let formData = new FormData();
    let imagefile = document.querySelector('#file');
    formData.append("image", imagefile.files[0]);
    // ...Code existant...//
    axios.request({
        url: `/@me/avatar`,
        method: 'POST',
        body: {
            token : SessionStorage.token,
        },
        formData
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data :  "Photo de profil bien mis à jour."
}
```


### Follow Unfollow
#### URL
```http
POST /@me/follow
```

> [!NOTE]
> \[Token\]  Required.

#### Request Parameters : 
| Parameter  |   Type   |               Description               |
| :--------- | :------: | :-------------------------------------- |
| `id`       | `String` | l'id du compte que vous souhaitz suivre |
| `token`    | `String` | Votre identifiant donnée lors de la co  |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/@me/follow',
        method: 'POST',
        body: {
            token : sessionStorage.token, 
            id : input.userId,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : "Utilisateur abonné"|"Utilisateur désabonné"
}
```


### Search user by name
#### URL
```http
GET /search/user/name
```

> [!NOTE]
> \[Token\]  Required.

#### Request Parameters : 
| Parameter |   Type   | 
| :-------- | :------: | 
| `username`| `String` | 
| `token`   | `String` | 

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/search/user/name',
        method: 'GET',
        body: {
            token : sessionStorage.token, 
            username : input.username,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[],"__v":12}]'
}
```


### Search user by id
#### URL
```http
GET /search/user/id
```

> [!NOTE]
> \[Token\]  Required.

#### Request Parameters : 
| Parameter |   Type   | 
| :-------- | :------: | 
| `id`      | `String` | 
| `token`   | `String` | 

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/search/user/name',
        method: 'GET',
        body: {
            token : sessionStorage.token, 
            id : input.userId,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[],"__v":12}]'
}
```


### Search user by keyword
#### URL
```http
GET /search/users
```

> [!NOTE]
> \[Token\]  Required.

#### Request Parameters : 
| Parameter |   Type   |   Min   |
| :-------- | :------: | :-----: |
| `keyword` | `String` |   `4`   |
| `token`   | `String` | &#9744; |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/search/users',
        method: 'GET',
        body: {
            token : sessionStorage.token, 
            keyword : input.search,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[],"__v":12}]'
}
```

### Suggered user
#### URL
```http
GET /suggested/users
```

> [!NOTE]
> \[Token\]  Required.

#### Request Parameters : 
| Parameter |   Type   |   Min   |
| :-------- | :------: | :-----: |
| `token`   | `String` | &#9744; |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/suggested/users',
        method: 'GET',
        body: {
            token : sessionStorage.token, 
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

#### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `title` | `String` | Nom de l'erreur |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[],"__v":12}]'
}
```


------------
## About :
- `CHANGELOG` [source](./CHANGELOG.md)

Ref :
[^1]: [Url du dépot `@commitlint/cli`](https://www.npmjs.com/package/@commitlint/cli)
[^2]: [Url du dépot `@commitlint/config-conventional`](https://www.npmjs.com/package/@commitlint/config-conventional)
[^3]: [Url du dépot `@types/bcryptjs`](https://www.npmjs.com/package/@types/bcryptjs)
[^4]: [Url du dépot `@types/cookie-parser`](https://www.npmjs.com/package/@types/cookie-parser)
[^5]: [Url du dépot `@types/express`](https://www.npmjs.com/package/@types/express)
[^6]: [Url du dépot `@types/express-fileupload`](https://www.npmjs.com/package/@types/express-fileupload)
[^7]: [Url du dépot `@types/jest`](https://www.npmjs.com/package/@types/jest)
[^8]: [Url du dépot `@types/node`](https://www.npmjs.com/package/@types/node)
[^9]: [Url du dépot `@types/nodemailer`](https://www.npmjs.com/package/@types/nodemailer)
[^10]: [Url du dépot `@types/supertest`](https://www.npmjs.com/package/@types/supertest)
[^11]: [Url du dépot `@types/uuid`](https://www.npmjs.com/package/@types/uuid)
[^12]: [Url du dépot `@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
[^13]: [Url du dépot `@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser)
[^14]: [Url du dépot `concurrently`](https://www.npmjs.com/package/concurrently)
[^15]: [Url du dépot `eslint`](https://www.npmjs.com/package/eslint)
[^16]: [Url du dépot `eslint-plugin-jest`](https://www.npmjs.com/package/eslint-plugin-jest)
[^17]: [Url du dépot `husky`](https://www.npmjs.com/package/husky)
[^18]: [Url du dépot `jest`](https://www.npmjs.com/package/jest)
[^19]: [Url du dépot `nodemon`](https://www.npmjs.com/package/nodemon)
[^20]: [Url du dépot `supertest`](https://www.npmjs.com/package/supertest)
[^21]: [Url du dépot `ts-jest`](https://www.npmjs.com/package/ts-jest)
[^22]: [Url du dépot `ts-node`](https://www.npmjs.com/package/ts-node)
[^23]: [Url du dépot `typescript`](https://www.npmjs.com/package/typescript)
[^24]: [Url du dépot `bcryptjs`](https://www.npmjs.com/package/bcryptjs)
[^25]: [Url du dépot `checks`](https://github.com/Horus-Turboss-Finance/Packages/tree/main/checks)
[^26]: [Url du dépot `constraint`](https://github.com/Horus-Turboss-Finance/Packages/tree/main/constraint)
[^27]: [Url du dépot `cookie-parser`](https://www.npmjs.com/package/cookie-parser)
[^28]: [Url du dépot `dateformat`](https://github.com/Horus-Turboss-Finance/Packages/tree/main/dateformat)
[^29]: [Url du dépot `dotenv`](https://www.npmjs.com/package/dotenv)
[^30]: [Url du dépot `express`](https://www.npmjs.com/package/express)
[^31]: [Url du dépot `express-fileupload`](https://www.npmjs.com/package/express-fileupload)
[^32]: [Url du dépot `mailgen`](https://www.npmjs.com/package/mailgen)
[^33]: [Url du dépot `mongoose`](https://www.npmjs.com/package/mongoose)
[^34]: [Url du dépot `nodemailer`](https://www.npmjs.com/package/nodemailer)
[^35]: [Url du dépot `uuid`](https://www.npmjs.com/package/uuid)