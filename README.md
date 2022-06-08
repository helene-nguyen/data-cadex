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
