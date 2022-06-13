//~Environment
import 'dotenv/config';

//~Import modules
import express from 'express';
const app = express();

//! For ESMODULE, to get __dirname
//source : https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope#:~:text=The%20__dirname%20or%20__,directory%20name%20of%20the%20path.
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    console.log(`\x1b[1;33m\u26a1Running server on : http://localhost:${PORT} \u26a1\x1b[0m`);
});