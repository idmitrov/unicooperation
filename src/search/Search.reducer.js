import { searchActionTypes } from './Search.actions';

const searchDefaults = {
    isBarVisible: false,
    results: [],
    resultsTotal: 0,
    query: '',
    limit: 10,
    filterBy: null,
    sortBy: 'asc',
    currentPage: 1
};

export default (state = searchDefaults, action = {}) => {
    switch(action.type) {
        case searchActionTypes.setSearchPage: {
            return {
                ...state,
                ...action.payload
            }
        }
        case searchActionTypes.setSearchQuery: {
                return {
                    ...state,
                    ...action.payload
                }
        }
        case searchActionTypes.setSearchListResults: {
            return {
                ...state,
                ...action.payload
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
