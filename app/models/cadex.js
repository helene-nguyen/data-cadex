//~import data
// source : https://stackoverflow.com/questions/70106880/err-import-assertion-type-missing-for-import-of-json-file
import data from '../../data/parts.json';

const cadex = {
    generate() { 
        return {data};
    }
};

export { cadex };