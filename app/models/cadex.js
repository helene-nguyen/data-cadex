//~import data
import data from '../../data/parts.json' assert {type: "json"};;

const cadex = {
    generate() { 
        return {data};
    }
};

export { cadex };