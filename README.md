# Cadavre exquis

## Concept du jeu

Le cadavre exquis est un jeu graphique ou d'écriture collectif inventé par les surréalistes, en particulier Jacques Prévert et Yves Tanguy, vers 1925.

Le jeu consiste à faire composer une phrase par plusieurs personnes sans qu'aucune d'elles puisse tenir compte des mots précédents.

L'ordre syntaxique est importante pour que la phrase soit grammaticalement correcte.

Pour en savoir plus, c'est par là => [here](https://fr.wikipedia.org/wiki/Cadavre_exquis)

## Concept de l'application

Nous avons choisi de partir sur une phrase composée des différents éléments et qui n'existent que dans le cas où les éléments sont présents.

### Mise en place des éléments : MCD

Pour la mise en place des éléments, nous avons déterminé les associations qui existent entre les différentes entités avec leurs attributs respectifs déterminées chacunes par un code unique.

La réalisation du modèle conceptuel a été fait sur [Mocodo](http://mocodo.wingi.net/) et voici le schéma :

![MCD](./images/MCD.png)

Et ci-dessous la version écrite :

```
NAME: code_name, element
COMPOSE, 0N NAME, 11 PHRASE
BELONGS TO, 0N COMPLEMENT, 11 PHRASE
COMPLEMENT: code_complement, element
:

PRONOM: code_pronom, element
HAS, 0N PRONOM, 11 PHRASE
PHRASE: code_phrase
CONJUGATE, 0N VERB, 11 PHRASE
VERB: code_verb, element

ADJECTIVE: code_adjective, element
CONTAINS, 0N ADJECTIVE, 11 PHRASE
SET, 0N PREPOSITION, 11 PHRASE
PREPOSITION: code_preposition, element
:
```

On distingue donc les entités suivantes :

- Name
- Verb
- Complement
- Adjective
- Preposition
- Pronom

Et chacune des entités sont associées à l'entité phrase que l'on complètera.

### Définition du MLD

Pour le modèle logique de données, nous allons retrouver les différentes tables :

```
NAME ( name_id, element )
COMPLEMENT ( complement_id, element )
ADJECTIVE ( adjective, element )
PHRASE ( phrase_id, #preposition_id, #complement_id, #adjective_id, #name_id, #verb_id, #pronom_id )
PRONOM ( pronom_id, element )
VERB ( verb_id, element )
PREPOSITION ( preposition_id, element )
```

### Définition du MPD

Et voici le modèle physique de données pour l'établissement des différentes tables :

![MPD](./images/mpd.png)

### Création de la base de données

Etablissement du fichier sql pour la création de la base de données [ici](./data/01_create_db.sql)

![tables created](./images/create_db.png)

On peut retrouver les contraintes liées à la phrase sur [pgAdmin](https://www.pgadmin.org/) pour la visualisation sur une interface graphique

Voilà un exemple !

![constraint phrase table](./images/constraints.png)

### Insertion des données en utilisant Javascript

On cherche à importer les données d'un fichier JSON dans la base de données qu'on a créé au préalable.

Les étapes d'insertion sont les suivantes :

- Import du fichier json

- Configurer les variables d'environnement dans le fichier .env

- Se connecter à la base de données

- Créer une requête pour insérer les données

```js
//~import modules
import data from './parts.json' assert {type: 'json'};
// import dotenv from 'dotenv';
// dotenv.config();
import 'dotenv/config';

import pg from 'pg';
const client = new pg.Client();

async function insertData(){
    //#open channel
    await client.connect();
    
    for (const tableName in data) {
    //for await for waiting a Promise
        for await (const value of data[tableName]) {

            // client.query("INSERT INTO table_name (label) VALUES ($1)", [value]);
            const query = {
                text: `
                INSERT INTO "${tableName}"
                ("element")
                VALUES
                ($1);`,
                values: [value]
            };
            //await must be put here
           await client.query(query);
        }
    }

    //#close channel
    await client.end();
};

insertData();
```

=> Configuration du fichier .env pour connecter à la DB

```
#INFO CONNEXION DB PSQL
PGHOST=localhost
PGDATABASE=#
PGUSER=#
PGPASSWORD=#
PGPORT=5432
```

## Partie Back : création de l'API

## Partie Front : récupération et affichage des données

## Déploiement

Déploiement fait sur Heroku : <https://cadex-app.herokuapp.com/>

## Mise en place du package Joi

Télécharger le module Joi

```sh
npm i joi
```

Mettre en place le schéma pour définir ce qu'on veut récupérer du body

```js
import joi from 'joi';
const Joi  = joi;


const schema = Joi.object({
    name:Joi.string(), //name must be a string
    verb:Joi.string(),
    complement:Joi.string(),
    adjective:Joi.string(),
    preposition:Joi.string(),
    pronom:Joi.string()
}).required().min(1).max(6);
// min et max indique le nombre de clefs minimum et maximum de l'objet

export {schema};
```

Dans le router, on va créer des middlewares pour contrôler l'arrivée des informations venant du body.

Sur la route POST, on mettra en argument le schema qu'il faut au préalable importer.

```js
//~Import modules
import { Router } from 'express';
const router = Router();

import { fetchAllCadex, doRandomCadex } from './controllers/mainController.js';
import { validationService } from './service/validation.js';
import { schema } from './schema/cadex.schema.js';

//~Routes
/*mw validation to check if the body returns the correct response*/
router.get('/v1/cadex', validationService.request, fetchAllCadex);
router.post('/v1/cadex', validationService.body(schema), doRandomCadex);

export { router };

```

On va ensuite construire nos méthodes pour valider les éléments

```js
import { schema } from '../schema/cadex.schema.js';

const validationService = {
    body(schemaCustom) {
        //valid req.body format
        return function(req, res, next){

            const { error } = schemaCustom.validate(req.body);
            if (error) { // is any error here ?
                // if yes, error
                return;
            }

            next();
        };
    },
    request(req, res, next) {
        // je valide ma req.query avec Joi
        const { error } = schema.validate(req.query);

        if (error) {
            // j'indique qu'il y a une erreur
            return;
        }

        next();
    }
};

export { validationService };
```

Pour la méthode body, on met bien en paramètre le schéma qu'on récupèrera. S'il y a une erreur, on s'arrête là, rien ne s'affichera.

Par contre, si les éléments passent, grâce au `next()` on passera bien à la fonction suivante (on poursuit notre 'route' :p ! )

## Mise en place de JSDocs grâce à Swagger

## Installation

```sh
npm i express-jsdoc-swagger 
```

Swagger va générer de la documention à partir des commentaires qu'on va faire tout au long de notre code

## Specificité en ES Module

Pour accéder au  `__dirname` on va devoir le récupérer :

```js
//! For ESMODULE, to get __dirname
//source : https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope#:~:text=The%20__dirname%20or%20__,directory%20name%20of%20the%20path.

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

Pour mettre en place Swagger, on doit configurer les options dans notre point d'entrée index.js

```js
//~SWAGGER
import expressJSDocSwagger from 'express-jsdoc-swagger';

const options = {
  info: {
      version: "1.0.0",
      title: "API Cadex",
      license: {
          name: "MIT",
      },
  },
  security: {
      BasicAuth: {
          type: "http",
          scheme: "basic",
      },
  },
  swaggerUIPath: "/api-docs" ,
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: "./**/*.js",
};

expressJSDocSwagger(app)(options);
```

Pour atteindre notre doc :

ajouter `/api-docs`

Avec JSDOCS on peut grouper nos routes avec

```js
@tags GET

ou 

@tags POST
```

Et Tadaaaaam

![swagger](./images/swagger.jpg)

### Et un petit custom pour tester mon tag

![swagger](./images/swagger2.jpg)
