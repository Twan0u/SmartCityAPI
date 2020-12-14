# SmartClassAPI

## Mise en place

Ce projet utilise postgres comme type de base de donnée.  

Ce projet nécéssite un .env pour fonctionner. En voici un exemple : 

```
DB_HOST = "ADRESSE_DE_MA_DB_POSTGRES"
DB_USER = "NOM_UTILISATEUR"
DB_PASS = "MOT_DE_PASSE"
DB_DBNAME = "NOM_DB"
DB_PORT = "5432"
ACCESS_TOKEN_SECRET="MON_TOKEN"
ACCESS_TOKEN_TIMEOUT = "1800s"
API_HTTP_PORT = "4000"
```

Pour initialiser le projet vous pouvez simplement faire les commandes suivantes : 

```bash
npm install #installe les modules nodejs
npm run initdb #initialise la base de donnée
npm run dev #lance l'api
```

