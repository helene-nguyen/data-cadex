//~import pg module
//module pg for CommonJs, need to import by default first
import pg from 'pg';

//~create new client
const client = new pg.Client();

//~connect client
client.connect();

//~export client
export { client };