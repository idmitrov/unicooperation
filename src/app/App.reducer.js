import { appActionTypes } from './App.actions';

export const mainDefaults = {
    version: '0.0.1',
    search: {
        text: '',
        isVisible: false
    }
};

export default (state = mainDefaults, action) => {
    switch (action.type) {
        case appActionTypes.toggleSearchVisibility: {
            return {
                ...state,
                search: {
                    ...state.search,
                    isVisible: action.payload
                }
            }
        }
        default: return state;
    }
}
