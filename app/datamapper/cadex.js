//~import modules
import { client } from '../database.js';
//destructured array
const TABLE_NAME = ['names', 'verbs', 'complements', 'adjectives', 'prepositions', 'pronoms'];

//~datamapper
/**
 * 
 * @returns all data from DB where each key is table and value their own values
 */
async function findAll() {
  const data = {};

  for (let index = 0; index < TABLE_NAME.length; index++) {
    const element = TABLE_NAME[index];

    const query = {
      text: `
        SELECT 
        JSON_AGG(DISTINCT "${element}".element) as "${element}" 
        FROM ${element};`
    };

    const result = await client.query(query);

    data[element] = result.rows[0][element];
  }

  return data;
}
/**
 * 
 * @param {string} dataElement Body we get for inserting in DB
 */
async function createData(dataElement) {
  for (let index = 0; index < TABLE_NAME.length; index++) {
    const element = TABLE_NAME[index];
    //giving 'name' in singular
    const tableElement = element.slice(0, -1);
    const bodyElementValue = dataElement[tableElement];

    if (bodyElementValue !== undefined) {
      for (const [key, value] of Object.entries(dataElement)) {
        if (key === tableElement) {
          const query = {
            text: `
              INSERT INTO "${element}"
              ("element")
              VALUES
              ($1);`,
            values: [value]
          };

          await client.query(query);
          //if return, created only one entry
        }
      }
    }
  }
}

export { findAll, createData };
