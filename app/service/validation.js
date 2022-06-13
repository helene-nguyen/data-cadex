import { schema } from '../schema/cadex.schema.js';

const validationService = {
    body(schemaCustom) {
        //valid req.body format
        return function(req, res, next){

            const { error } = schemaCustom.validate(req.body);
            if (error) { // is any error here ?
                // if yes, error
                return;
            }

            next();
        };
    },
    request(req, res, next) {
        // je valide ma req.query avec Joi
        const { error } = schema.validate(req.query);

        if (error) {
            // j'indique qu'il y a une erreur
            return;
        }

        next();
    }
};

export { validationService };