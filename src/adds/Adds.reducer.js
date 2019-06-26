import { addsActionTypes } from './Adds.actions';

const addsDefautls = {
    instance: {
        title: '',
        content: ''
    },
    list: []
};

export default (state = addsDefautls, action = {}) => {
    switch (action.type) {
        case addsActionTypes.setAddProp: {
            return {
                ...state,
                instance: {
                    ...state.instance,
                    [action.payload.key]: action.payload.value
                }
            }
        }
        case addsActionTypes.setAddsList: {
            return {
                ...state,
                list: action.payload
            }
        }
        default: return state;
    }
}
