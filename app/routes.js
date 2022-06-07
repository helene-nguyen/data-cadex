//~Import modules
import { Router } from 'express';
const router = Router();

import { fetchAllCadex, doRandomCadex} from './controllers/mainController.js';

//~Routes
router.get('/v1/cadex', fetchAllCadex);
router.post('/v1/cadex', doRandomCadex);

export { router };
