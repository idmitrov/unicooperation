import { searchActionTypes } from './Search.actions';

const searchDefaults = {
    isBarVisible: false,
    results: [],
    skip: 0,
    take: 10,
    filterBy: null,
    sortBy: 'asc'
};

export default (state = searchDefaults, action = {}) => {
    switch(action.type) {
        case searchActionTypes.setSearchListResults: {
            return {
                ...state,
                results: action.payload
            }
        }
        case searchActionTypes.toggleSearchVisibility: {
            return {
                ...state,
                isBarVisible: action.payload
            }
        }
        default: return state;
    }
}
