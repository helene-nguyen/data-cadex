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
        JSON_AGG("${element}".element) as "${element}" 
        FROM ${element};`
    };

    const result = await client.query(query);

    data[element] = result.rows[0][element];
  }

  return data;
}
/**
 * 
 * @param {string} dataElement Element we want to insert in table 
 */
async function createData(dataElement) {

  for (let index = 0; index < TABLE_NAME.length; index++) {
    const element = TABLE_NAME[index];
    console.log("element: ", element.slice(0, -1));

    const bodyElement = element.slice(0, -1);
    
    console.log(dataElement.bodyElement);
        
      const query = {
        text: `
            INSERT INTO "${element}"
            ("element")
            VALUES
            ($1);`,
        values: [dataElement.bodyElement]
      };

      // const result = await client.query(query);

      return result.rowCount;
    
  }
}

export { findAll, createData };
