//~import data
// source : https://stackoverflow.com/questions/70106880/err-import-assertion-type-missing-for-import-of-json-file
import data from '../../data/parts.json' assert {type:'json'};
import  { getRandomNumber }  from './random.js';
//for test, error with assert 
//Support for the experimental syntax 'importAssertions' isn't currently enabled (3:42):
// import data from '../../data/parts.json';
// const { default: data } = await import('../../data/parts.json', {assert: { type: 'json' }})

const cadex = {
    fetchAllData() {
        return data ;
    },

    generate() { 

        return {
            //this here is for cadex
            name: this.getRandomElement('names'),
            verb:this.getRandomElement('verbs'),
            complement:this.getRandomElement('complements'),
            adjective:this.getRandomElement('adjectives'),
            preposition:this.getRandomElement('prepositions'),
            pronom: this.getRandomElement('pronoms'),
            toString() {
                return `${this.name} ${this.verb} ${this.complement} ${this.adjective} ${this.preposition} ${this.pronom}`
            }
        }
    },   
/**
 * 
 * @param {string} property 
 * @returns random value
 */
    getRandomElement(property) {
        // data.names[0]
        // data["names"][0] -- les deux sont équivalents

        // je cherche un index random entre 0 et le nombre de names - 1
        const indexRandom = getRandomNumber(data[property].length - 1);
        return data[property][indexRandom];
    }
};

export { cadex };
