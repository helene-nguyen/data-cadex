//~import data
// source : https://stackoverflow.com/questions/70106880/err-import-assertion-type-missing-for-import-of-json-file
import data from '../../data/parts.json' assert{ type: 'json' };
//for test, error with assert 
//Support for the experimental syntax 'importAssertions' isn't currently enabled (3:42):
// import data from '../../data/parts.json';
// const { default: data } = await import('../../data/parts.json', {assert: { type: 'json' }})

const cadex = {
    generate() { 
        return {data};
    }
};

export { cadex };