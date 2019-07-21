import { settingsActionTypes } from './Settings.actions';

const settingsDefaults = {
    language: localStorage.getItem('uni-lang') || 'en-US'
};

export default (state = settingsDefaults, action = {}) => {
    switch (action.type) {
        case settingsActionTypes.setLanguage: {
            return {
                ...state,
                language: action.payload
            };
        }
        default: return state;
    }
}
