
//~import modules
import data from './parts.json' assert {type: 'json'};
// import dotenv from 'dotenv';
// dotenv.config();
import 'dotenv/config';

import pg from 'pg';
const client = new pg.Client();

async function insertData(){
    //#open channel
    await client.connect();
    
    for (const tableName in data) {
    //for await for waiting a Promise
        for await (const value of data[tableName]) {

            // client.query("INSERT INTO table_name (label) VALUES ($1)", [value]);
            const query = {
                text: `
                INSERT INTO "${tableName}"
                ("element")
                VALUES
                ($1);`,
                values: [value]
            };
            //await must be put here
           await client.query(query);
        }
    }

    //#close channel
    await client.end();
};

insertData();