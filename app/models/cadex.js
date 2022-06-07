import { cadex } from '../service/cadex.js';

class Cadex {
  constructor() {
    this.newCadex = cadex.generate();

    this.name = this.newCadex.name;
    this.verb = this.newCadex.verb;
    this.complement = this.newCadex.complement;
    this.adjective = this.newCadex.adjective;
    this.preposition = this.newCadex.preposition;
    this.pronom = this.newCadex.pronom;
    this.phrase = this.newCadex.toString();

    //get all datas
    this.data = cadex.fetchAllData();
  }
}

export { Cadex };

/* // create new instance of Cadex
const newCadex = new Cadex();
console.log(newCadex instanceof Cadex); //expected output true
*/
