import joi from 'joi';
const Joi = joi;

const schema = Joi.object({
  name: Joi.string(), //name must be a string
  verb: Joi.string(),
  complement: Joi.string(),
  adjective: Joi.string(),
  preposition: Joi.string(),
  pronom: Joi.string()
})
  .required()
  .min(0) //Nothing in query string for object
  .max(6);
// min et max indique le nombre de clefs minimum et maximum de l'objet

export { schema };
