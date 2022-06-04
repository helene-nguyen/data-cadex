//~import modules
import { _500 } from './errorController.js';
import { cadex } from '../models/cadex.js';

//~controller
async function fetchAllCadex(req, res, next) {
  try {
    const data = cadex.generate().data;
    res.json(data);
  } catch (err) {
    _500(err, req, res);
  }
}

async function doRandomCadex(req, res) {
  try {
    const data = cadex.generate().data;
    //source that helps https://stackoverflow.com/questions/53215853/how-to-add-a-query-string-to-req-url-in-express
    let { name, adjective, verb, complement, preposition, pronom } = req.body;
    console.log(" req.body: ",  req.body);

    //~get random element from array
    //source https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
    const randomName = data.names[Math.floor(Math.random() * data.names.length)];
    const randomAdjective = data.adjectives[Math.floor(Math.random() * data.adjectives.length)];
    const randomVerb = data.verbs[Math.floor(Math.random() * data.verbs.length)];
    const randomComplement = data.complements[Math.floor(Math.random() * data.complements.length)];
    const randomPreposition = data.prepositions[Math.floor(Math.random() * data.prepositions.length)];
    const randomPronom = data.pronoms[Math.floor(Math.random() * data.pronoms.length)];

    //~test if there is a name in the input
    name ? (req.query.name = name) : name = randomName;
    complement ? (req.query.complement = complement) : complement = randomComplement;
    adjective ? (req.query.adjective = adjective) : adjective = randomAdjective;
    verb ? (req.query.verb = verb) : verb = randomVerb;
    preposition ? (req.query.preposition = preposition) : preposition = randomPreposition;
    pronom ? (req.query.pronom = pronom) : pronom = randomPronom;

    //~return cadex
    res.json(`${name} ${verb} ${complement} ${adjective} ${preposition} ${pronom}`);
  } catch (err) {
    _500(err, req, res);
  }
}

export { fetchAllCadex, doRandomCadex };
