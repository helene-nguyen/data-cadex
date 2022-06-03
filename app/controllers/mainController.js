//~import modules
import { _500 } from './errorController.js';

//~controller
async function fetchAllParts(req, res) {
    try {
        res.send(req.app.locals.parts);
  } catch (err) {
    _500(err, req, res);
  }
}

export { fetchAllParts };
