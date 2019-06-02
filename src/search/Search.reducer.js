import { searchActionTypes } from './Search.actions';

const searchDefaults = {
    isBarVisible: false,
    results: [],
    resultsTotal: 0,
    page: 1,
    limit: 10,
    filterBy: null,
    sortBy: 'asc'
};

export default (state = searchDefaults, action = {}) => {
    switch(action.type) {
        case searchActionTypes.setSearchListResults: {
            return {
                ...state,
                results: action.payload.list,
                resultsTotal: action.payload.total
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
