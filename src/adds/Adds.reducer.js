import { addsActionTypes } from './Adds.actions';

const addsDefautls ={
    list: []
};

export default (state = addsDefautls, action = {}) => {
    switch (action.type) {
        case addsActionTypes.setAddsList: {
            return {
                ...state,
                list: action.payload
            }
        }
        default: return state;
    }
}
