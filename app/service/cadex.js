//~import data
// source : https://stackoverflow.com/questions/70106880/err-import-assertion-type-missing-for-import-of-json-file
import data from '../../data/parts.json' assert {type: 'json'};
import  { getRandomNumber }  from './random.js';
//for test, error with assert
//Support for the experimental syntax 'importAssertions' isn't currently enabled (3:42):
import { findAll, createData } from '../datamapper/cadex.js';
// const data = await findAll();
/**
 * The Cadex is the name for 'Cadavre Exquis' in France, we put random words to make a sentence
 * @typedef {*} Cadex
 * @property {string} name
 * @property {string} verb
 * @property {string} complement
 * @property {string} adjective
 * @property {string} preposition
 * @property {string} pronom
 */

const cadex = {
   fetchAllData() {
        return data ;
    },
/**
 * 
 * Generate a Cadex
 * @returns{}
 */
    generate() { 
        return {
            //this here is for cadex
            /**
             *  First part of sentence
             * @type {string}
             */
            name: this.getRandomElement('names'),
            /**
             *  Second part of sentence
             * @type {string}
             */
            verb: this.getRandomElement('verbs'),
            /**
             *  Third part of sentence
             * @type {string}
             */
            complement: this.getRandomElement('complements'),
            /**
             *  Fourth part of sentence
             * @type {string}
             */
            adjective: this.getRandomElement('adjectives'),
            /**
             *  Fifth part of sentence
             * @type {string}
             */
            preposition: this.getRandomElement('prepositions'),
            /**
             *  Sixth part of sentence
             * @type {string}
             */
            pronom: this.getRandomElement('pronoms'),
            /**
             *  Bind all element to make the sentence
             * @returns {string} un cadex
             */
            toString() {
                return `${this.name} ${this.verb} ${this.complement} ${this.adjective} ${this.preposition} ${this.pronom}`
            }
        }
    },   
    /**
     * 
     * @param {string} property 
     * @return {string} random value
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
