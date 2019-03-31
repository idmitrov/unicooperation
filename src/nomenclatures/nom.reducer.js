import { nomActionTypes } from './nom.actions';

const nomDefaults = {
    countries: []
};

export default (state = nomDefaults, action) => {
    switch(action.type) {
        case nomActionTypes.setCountriesNom: {
            return {
                ...state,
                countries: action.payload
            }
        }
        default: return state;
    }
}
