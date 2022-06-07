//~import modules
import { _500 } from './errorController.js';
import { Cadex } from '../models/cadex.js';

//~controller
async function fetchAllCadex(req, res, next) {
  try {
    //
    const cadex = new Cadex();

    res.json(cadex.data);
  } catch (err) {
    _500(err, req, res);
  }
}

async function doRandomCadex(req, res) {
  try {
    //New instance of Cadex
    const random = new Cadex().newCadex;

    //source that helps https://stackoverflow.com/questions/53215853/how-to-add-a-query-string-to-req-url-in-express

    let cadex = [];

    for (const [key, value] of Object.entries(random)) {
      let inputFilled = req.body[key];
      let word = req.query[key]

      inputFilled ? (word = inputFilled) : (word = value);
    
      cadex.push(word);
    }
    cadex.pop();
    res.json(`${cadex.join(' ')}`);
    //~get random element from array
  } catch (err) {
    _500(err, req, res);
  }
}

export { fetchAllCadex, doRandomCadex };
