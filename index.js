//~Environment
import 'dotenv/config';

//~Import modules
import express from 'express';
const app = express();
//~locals
// source : https://stackoverflow.com/questions/70106880/err-import-assertion-type-missing-for-import-of-json-file
import parts from './data/parts.json' assert {type: "json"};
app.locals.parts = parts;

//~Import router
import { router } from './app/routes.js'
import { _404 } from './app/controllers/errorController.js';


//~Route
app.use(router);

//~Error
// app.use(_404);

//~Launch the app
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Running server on : http://localhost:${PORT}`);
});