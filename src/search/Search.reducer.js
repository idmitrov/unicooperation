import { searchActionTypes } from './Search.actions';

const searchDefaults = {
    isBarVisible: false,
    results: [],
    resultsTotal: 0,
    query: '',
    skip: 0,
    limit: 10,
    filterBy: null,
    sortBy: 'asc'
};

export default (state = searchDefaults, action = {}) => {
    switch(action.type) {
        case searchActionTypes.setSearchParams: {
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
