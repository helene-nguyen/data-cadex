/* 
test : (message, function)
it : (message, function)

test = it
permet de tester quelque chose

describe: (message, function)
Permet de former un groupe de test */
//~Import modules
import { cadex } from '../app/models/cadex.js';
const data = cadex.generate().data;

//~Tests
describe('Cadex service', () => {
  //use 'it' (alias of test)
  //#Test if cadex is an object
  it('should be an object', () => {
    expect(data).toBeInstanceOf(Object);
  });

  //#Test if data precisely a name
  it(`should contain 'un pingouin'`, () => {
    expect(data.names).toContain('Un pingouin');
  });
  //#Test if data precisely a verb
  it(`should contain 'consulte'`, () => {
    expect(data.verbs).toContain('consulte');
  });
  //#Test if data precisely a complement
  it(`should contain 'Arthur`, () => {
    expect(data.complements).toContain('Arthur');
  });
  //#Test if data precisely an adjectif
  it(`should contain 'amusé'`, () => {
    expect(data.adjectives).toContain('amusé');
  });

  
});

describe(`have the good data keys`, () => {
  //use 'test'
  test(`have the good properties`, () => {
    expect(data).toHaveProperty('names'),
    expect(data).toHaveProperty('verbs'),
    expect(data).toHaveProperty('adjectives'),
    expect(data).toHaveProperty('complements'),
    expect(data).toHaveProperty('pronoms'),
    expect(data).toHaveProperty('prepositions'),
    expect(data).not.toHaveProperty(`this property doesn't exist`)
  });
})
