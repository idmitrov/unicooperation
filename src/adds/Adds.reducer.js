import { addsActionTypes } from './Adds.actions';

const addInstanceDefaults = {
    title: '',
    content: ''
};

const addsDefautls = {
    instance: addInstanceDefaults,
    list: []
};

export default (state = addsDefautls, action = {}) => {
    switch (action.type) {
        case addsActionTypes.resetAddInstance: {
            return {
                ...state,
                instance: addInstanceDefaults
            }
        }
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
