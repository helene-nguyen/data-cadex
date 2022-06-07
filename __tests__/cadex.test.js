/* 
test : (message, function)
it : (message, function)

test = it
permet de tester quelque chose

describe: (message, function)
Permet de former un groupe de test */
//~Import modules
import { cadex } from '../app/service/cadex.js';
const {name, verb, complement, adjective, preposition, pronom} = cadex.generate();
const data = cadex.fetchAllData();

//~Tests
describe('Cadex service', () => {
  //use 'it' (alias of test)
  //#Test if cadex is an object
  it('should be an object', () => {
    expect(data).toBeInstanceOf(Object);
  });

  //#Test if data precisely has this value
  it(`should contain 'un pingouin'`, () => {
    expect(data.names).toContain('Un pingouin');
  });

  it(`should contain 'consulte'`, () => {
    expect(data.verbs).toContain('consulte');
  });

  it(`should contain 'Arthur`, () => {
    expect(data.complements).toContain('Arthur');
  });

  it(`should contain 'amusé'`, () => {
    expect(data.adjectives).toContain('amusé');
  });
});

describe(`Good data keys`, () => {
  //use 'test'
  test(`have the good properties`, () => {
    expect(data).toHaveProperty('names'), expect(data).toHaveProperty('verbs'), expect(data).toHaveProperty('adjectives'), expect(
      data
    ).toHaveProperty('complements'), expect(data).toHaveProperty('pronoms'), expect(data).toHaveProperty('prepositions'), expect(
      data
    ).not.toHaveProperty(`this property doesn't exist`);
  });
});

describe(`Good data type`, () => {
  //use 'test'
  test(`is a string`, () => {
    expect(typeof name).toBe('string');
  });
  test(`is a string`, () => {
    expect(typeof verb).toBe('string');
  });
  test(`is a string`, () => {
    expect(typeof complement).toBe('string');
  });
  test(`is a string`, () => {
    expect(typeof adjective).toBe('string');
  });
  test(`is a string`, () => {
    expect(typeof preposition).toBe('string');
  });
  test(`is a string`, () => {
    expect(typeof pronom).toBe('string');
  });
});
