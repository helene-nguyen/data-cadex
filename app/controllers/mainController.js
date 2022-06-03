//~import modules
import { _500 } from './errorController.js';

//~controller
async function fetchAllParts(req, res, next) {
  try {
    res.json(req.app.locals.parts);
  } catch (err) {
    _500(err, req, res);
  }
}

async function test(req, res, next) {
  try {
    //source that helps https://stackoverflow.com/questions/53215853/how-to-add-a-query-string-to-req-url-in-express
    const { name, adjective, verb, complement } = req.body;

    res.json(`${name} ${adjective} ${verb} ${complement}`);
    
    req.query = req.body;
   /*  console.log(req.body);
    console.log(req.url); */

      console.log('req.query: ', req.query);
      
  } catch (err) {
    _500(err, req, res);
  }
}

export { fetchAllParts, test };
