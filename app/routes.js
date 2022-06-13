//~Import modules
import { Router } from 'express';
const router = Router();

import { fetchAllCadex, doRandomCadex } from './controllers/mainController.js';
import { validationService } from './service/validation.js';
import { schema } from './schema/cadex.schema.js';

/**
 * The Cadex is the name for 'Cadavre Exquis' in France, we put random words to make a sentence
 * @typedef {Object} Cadex
 * @property {string} name
 * @property {string} verb
 * @property {string} complement
 * @property {string} adjective
 * @property {string} preposition
 * @property {string} pronom
 */

//~Routes
/*mw validation to check if the body returns the correct response*/

/**
 * GET /v1/cadex
 * @summary Génère un cadex
 * @tags GET
 * @return {Cadex} 200 - success response - application/json
 */
router.get('/v1/cadex', validationService.request, fetchAllCadex);
/**
 * POST /v1/cadex
 * @summary Ajoute des mots à mon dictionnaire
 * @tags POST
 * @return {} 200 - success response - application/json
 */
router.post('/v1/cadex', validationService.body(schema), doRandomCadex);

export { router };
