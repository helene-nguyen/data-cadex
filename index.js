//~Environment
import 'dotenv/config';

//~Import modules
import express from 'express';
const app = express();

//~Protect our API
import helmet from 'helmet';
app.use(helmet());

//~url encoded
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//~static
app.use(express.static('public'));

//~Allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    next();
}); 

//~Import router
import { router } from './app/routes.js'
import { _404 } from './app/controllers/errorController.js';

//~Route
app.use(router);

//~Error
app.use(_404);

//~Launch the app
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Running server on : http://localhost:${PORT}`);
});