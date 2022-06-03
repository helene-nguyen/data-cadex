/* 
test : (message, function)
it : (message, function)
permet de tester quelque chose

describe: (message, function)
Permet de former un groupe de test */

import { cadexService } from '../app/service/cadexService.js';
const data = cadexService.generate();

//Tester mon service cadex
describe('Cadex service', () => {
  it('should be an object', () => {
    expect(data).toBeInstanceOf(Object);
  });

  //Vérifier que mon cadex a un nom, un verbe, un complément et un adjectif
});
