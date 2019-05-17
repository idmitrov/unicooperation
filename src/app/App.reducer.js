import { appActionTypes } from './App.actions';

export const mainDefaults = {
    version: '0.0.1',
    layout: {
        isSearchVisible: false
    }
};

export default (state = mainDefaults, action) => {
    switch (action.type) {
        case appActionTypes.toggleSearchVisibility: {
            return {
                ...state,
                layout: {
                    isSearchVisible: action.payload
                }
            }
        }
        default: return state;
    }
}
