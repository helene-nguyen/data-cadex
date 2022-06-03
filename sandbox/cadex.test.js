/* 
test : (message, function)
it : (message, function)
permet de tester quelque chose

describe: (message, function)
Permet de former un groupe de test */
//~Import modules
import { cadex } from '../app/models/cadex.js';
const cadex = cadex.generate();
const data = cadex.data;

//~Tests
describe('Cadex service', () => {
  //#Test if cadex is an object
  it('should be an object', () => {
    expect(cadex).toBeInstanceOf(Object);
  });

  //#Test if data precisely a name
  it(`should contain 'un cheval'` , () => {
    expect(data.names).toContain('un cheval');
  });
  //#Test if data precisely a verb
  it(`should contain 'consulte'`, () => {
    expect(data.verbs).toContain('consulte');
  });
  //#Test if data precisely a complement
  it(`should contain 'la Mer Noire'`, () => {
    expect(data.complements).toContain('la Mer Noire');
  });
  //#Test if data precisely an adjectif
  it(`should contain 'blond'`, () => {
    expect(data.adjectives).toContain('blond');
  });
});

