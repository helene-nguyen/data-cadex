//~Import modules
import { Router } from "express";
const router = Router();

import {fetchAllParts} from './controllers/mainController.js'

//~Routes
router.get('/v1', fetchAllParts);

router.post('/v1/cadex', (req, res) => {
    res.send("Youhou from post router");
})

export { router };