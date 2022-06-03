//~Import modules
import { Router } from 'express';
const router = Router();

import { fetchAllParts, test } from './controllers/mainController.js';

//~Routes
router.get('/v1/cadex', fetchAllParts, test);
router.post('/v1/cadex', test);

export { router };
