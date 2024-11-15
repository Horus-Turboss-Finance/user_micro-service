TODO
<div align="center">
  <h1>Cash Eyes (user-service api documentation)</h1>
  <h6>Ce repository contien toutes les routes (et routines) du micro service utilisateur de Cash Eyes.</h6>
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
  - [Get account details](#get-account-details)
    - [URL](#url-3)
    - [Request Parameters :](#request-parameters--3)
    - [*Exemple de requête*](#exemple-de-requête-3)
    - [Response Parameters :](#response-parameters--3)
    - [*Exemple de réponse*](#exemple-de-réponse-3)
  - [Update account](#update-account)
    - [URL](#url-4)
    - [Request Parameters :](#request-parameters--4)
    - [*Exemple de requête*](#exemple-de-requête-4)
    - [Response Parameters :](#response-parameters--4)
    - [*Exemple de réponse*](#exemple-de-réponse-4)
  - [Delete account](#delete-account)
    - [URL](#url-5)
    - [Request Parameters :](#request-parameters--5)
    - [*Exemple de requête*](#exemple-de-requête-5)
    - [Response Parameters :](#response-parameters--5)
    - [*Exemple de réponse*](#exemple-de-réponse-5)
  - [Update profil picture](#update-profil-picture)
    - [URL](#url-6)
    - [Request Parameters :](#request-parameters--6)
    - [*Exemple de requête*](#exemple-de-requête-6)
    - [Response Parameters :](#response-parameters--6)
    - [*Exemple de réponse*](#exemple-de-réponse-6)
  - [Follow Unfollow](#follow-unfollow)
    - [URL](#url-7)
    - [Request Parameters :](#request-parameters--7)
    - [*Exemple de requête*](#exemple-de-requête-7)
    - [Response Parameters :](#response-parameters--7)
    - [*Exemple de réponse*](#exemple-de-réponse-7)
  - [Search user by name](#search-user-by-name)
    - [URL](#url-8)
    - [Request Parameters :](#request-parameters--8)
    - [*Exemple de requête*](#exemple-de-requête-8)
    - [Response Parameters :](#response-parameters--8)
    - [*Exemple de réponse*](#exemple-de-réponse-8)
  - [Search user by id](#search-user-by-id)
    - [URL](#url-9)
    - [Request Parameters :](#request-parameters--9)
    - [*Exemple de requête*](#exemple-de-requête-9)
    - [Response Parameters :](#response-parameters--9)
    - [*Exemple de réponse*](#exemple-de-réponse-9)
  - [Search user by keyword](#search-user-by-keyword)
    - [URL](#url-10)
    - [Request Parameters :](#request-parameters--10)
    - [*Exemple de requête*](#exemple-de-requête-10)
    - [Response Parameters :](#response-parameters--10)
    - [*Exemple de réponse*](#exemple-de-réponse-10)
  - [Suggered user](#suggered-user)
    - [URL](#url-11)
    - [Request Parameters :](#request-parameters--11)
    - [*Exemple de requête*](#exemple-de-requête-11)
    - [Response Parameters :](#response-parameters--11)
    - [*Exemple de réponse*](#exemple-de-réponse-11)
- [About :](#about-)

## Packages
### Dev-packages
- `@commitlint/cli` - Un module très utile pour la normalisation des noms de commit git [^1].
- `@commitlint/config-conventional`  - configuration conventionnel de commitlint [^2]. 
- `@types/bcryptjs` - Définitions des types du module bcryptjs [^3].
- `@types/express` - Définitions des types du module express [^4].
- `@types/express-fileupload` - Définitions des types du module express-fileupload [^5].
- `@types/node` - Définitions des types du module nodejs [^6].
- `@typescript-eslint/eslint-plugin` - Un plugin ESLint qui fournit des règles de contrôle pour les bases de code TypeScript [^7].
- `@typescript-eslint/parser` - Un analyseur ESLint qui exploite TypeScript ESTree pour permettre à ESLint d'analyser le code source TypeScript [^8].
- `eslint` - ESLint est un outil permettant d'identifier et de signaler les schémas trouvés dans le code ECMAScript/JavaScript [^9].
- `husky` - Husky améliore vos commits et plus encore [^10].
- `nodemon` - nodemon est un outil qui redémarre automatiquement l'application node lorsque des changements sont détectés [^11].
- `ts-node` - Exécution TypeScript et REPL pour node.js, avec support source map et ESM natif [^12].
- `typescript` - Javascript avec typage fort [^13].

### Packages
- `axios` - packages pour les requêtes [^14].
- `bcryptjs` - Optimisation de bcrypt en JavaScript avec zéro dépendance [^15].
- `express` - Framework web minimaliste, rapide et sans opinion pour Node.js [^16].
- `express-fileupload` - middleware express simple pour le téléchargement de fichiers [^17].
- `mongoose` - Mongoose est un outil de modélisation d'objets MongoDB conçu pour fonctionner dans un environnement asynchrone [^18].
- `packages` - fonctions et définitions partagé entre plusieurs services [^19].


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

```js
// Dans le fichier `.env`
WEBHOOK_ERROR_FOR_DISCORD="Lien de votre webhook discord"
URLDB="L'url de votre base de donnée mongodb"

PORT_APIGATEWAY="Le port où vous souhaitez que l'api gateway écoute"
PORT_ADRESSMANAGER="Le port où vous souhaitez que l'adress manager écoute"

PASSWORD_SERVICE="Le mot de passe qui sécurise tout les services et leurs communications"
TOKEN_EXPIRATION="Le temps d'expiration du token en miliseconde"

IP_APIGATEWAY="l'ip de la machine de l'api gateway (127.0.0.1 si tout roule sur la même machine)"
IP_ADRESSMANAGER="l'ip de la machine de l'adress manager (127.0.0.1 si tout roule sur la même machine)"
IP_SERVICE_WHITELIST="l'ip des machines autorisé à se connecter directement entre services (127.0.0.1 si tout roule sur la même machine)"

NODE_ENV="DEVELOPMENT|PRODUCTION|TEST"
```

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
| Parameter  | Type     | Taille Min | Taille Max |
| :--------- | :------: | :-----: | :-----: |
| `signature` | `String` | &#9744; | &#9744; |
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
            signature : process.env.PASSWORD_SERVICE,
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
| `title` | `String` | Nom de la réponse |
| `status` | `Interger` | Le code http de la réponse |
| `data` | `User` | Result de la requête |

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[],"token":"zeoifczaeopfahezofafoau.8zfzefiyzgfaf549"}]'
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
| `signature` | `String` | La signature entre services |
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
            signature : process.env.PASSWORD_SERVICE,
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
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[]}]'
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
| `signature` | `String` | La signature entre services |
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
            signature : process.env.PASSWORD_SERVICE,
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

#### *Exemple de réponse*
```js
{
  success : true,
  title : "SUCCESS",
  status : 200,
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[]}]'
}
```

### Get account details
#### URL
```http
GET /@me
```

> [!NOTE]
> \[Token\] Required.

#### Request Parameters : 
| Parameter  |   Type   | Description       |
| :--------- | :------: | :---------------- |
| `signature` | `String` | La signature entre services |
| `token`    | `String` | Votre identifiant |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: `/@me`,
        method: 'GET',
        body: {
            signature : process.env.PASSWORD_SERVICE,
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
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[]}]'
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
| `signature` | `String` | &#9744; | &#9744; |
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
            signature : process.env.PASSWORD_SERVICE,
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
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[]}]'
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
| `signature` | `String` |
| `token`    | `String` |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: `/@me`,
        method: 'DELETE',
        body: {
            signature : process.env.PASSWORD_SERVICE,
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
| `signature` | `String` | &#9744; | Mot de passe inter service |
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
            signature : process.env.PASSWORD_SERVICE,
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
| `signature` | `String` | Mot de passe inter service |
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
            signature : process.env.PASSWORD_SERVICE,
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
> \[Token\] Required.

#### Request Parameters : 
| Parameter |   Type   | 
| :-------- | :------: | 
| `signature` | `String` |
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
            signature : process.env.PASSWORD_SERVICE,
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
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[]}]'
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
| `signature` | `String` |
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
            signature : process.env.PASSWORD_SERVICE,
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
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[]}]'
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
| `signature` | `String` | &#9744; |
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
            signature : process.env.PASSWORD_SERVICE,
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
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[]}]'
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
| `signature` | `String` | &#9744;
| `token`   | `String` | &#9744; |

#### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/suggested/users',
        method: 'GET',
        body: {
            signature : process.env.PASSWORD_SERVICE,
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
  data : '[{"_id":"66b3af30ebbb97b1d38821f8","avatar":"/avatars/default.jpg","username":"camouille","bio":"Hi👋 Welcome To My Profile","followers":[],"following":[]}]'
}
```


------------
## About :
- `CHANGELOG` [source](./CHANGELOG.md)

Ref :
[^1]: [Url du dépot `@commitlint/cli`](https://www.npmjs.com/package/@commitlint/cli)
[^2]: [Url du dépot `@commitlint/config-conventional`](https://www.npmjs.com/package/@commitlint/config-conventional)
[^3]: [Url du dépot `@types/bcryptjs`](https://www.npmjs.com/package/@types/bcryptjs)
[^4]: [Url du dépot `@types/express`](https://www.npmjs.com/package/@types/express)
[^5]: [Url du dépot `@types/express-fileupload`](https://www.npmjs.com/package/@types/express-fileupload)
[^6]: [Url du dépot `@types/node`](https://www.npmjs.com/package/@types/node)
[^7]: [Url du dépot `@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
[^8]: [Url du dépot `@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser)
[^9]: [Url du dépot `eslint`](https://www.npmjs.com/package/eslint)
[^10]: [Url du dépot `husky`](https://www.npmjs.com/package/husky)
[^11]: [Url du dépot `nodemon`](https://www.npmjs.com/package/nodemon)
[^12]: [Url du dépot `ts-node`](https://www.npmjs.com/package/ts-node)
[^13]: [Url du dépot `typescript`](https://www.npmjs.com/package/typescript)
[^14]: [Url du dépot `axios`](https://www.npmjs.com/package/axios)
[^15]: [Url du dépot `bcryptjs`](https://www.npmjs.com/package/bcryptjs)
[^16]: [Url du dépot `express`](https://www.npmjs.com/package/express)
[^17]: [Url du dépot `express-fileupload`](https://www.npmjs.com/package/express-fileupload)
[^18]: [Url du dépot `mongoose`](https://www.npmjs.com/package/mongoose)
[^19]: [Url du dépot `packages`](https://github.com/Horus-Turboss-Finance/Packages/)