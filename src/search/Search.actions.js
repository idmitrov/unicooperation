import searchEndpoints from './Search.endpoints';
import { accountType } from '../account/Account.constants';

export const searchActionTypes = {
    toggleSearchVisibility: 'SEARCH_VISIBILITY_TOGGLE',
    fetchSearchList: 'SEARCH_LIST_FETCH',
    setSearchListResults: 'SEARCH_LIST_RESULTS_SET',
    setSearchQuery: 'SEARCH_QUERY_SET',
    setSearchPage: 'SEARCH_PAGE_SET'
};

/**
 * Fetch API to search for a given profile depending on the account type
 * i.e university is allowed to search only for partners, partner for universities and
 * student for students
 * @name fetchSearchList
 * @desc Search for a given profile
 */
export const fetchSearchList = () => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const state = getState();
        let searchingFor = '';

        if (!state.search.query) {
            return resolve({
                list: [],
                total: 0
            });
        }

        switch (state.account.type) {
            case accountType.student: {
                searchingFor = 'student';
                break;
            }
            case accountType.university: {
                searchingFor = 'partner';
                break;
            }
            case accountType.partner: {
                searchingFor = 'university';
                break;
            }
            default: return reject('Search -> Invalid account type');
        }

        return resolve(
            dispatch({
                type: searchActionTypes.fetchSearchList,
                api: {
                    endpoint: searchEndpoints.searchList.endpoint.replace('{searchType}', searchingFor),
                    method: searchEndpoints.searchList.method,
                    query: `name=${state.search.query}&page=${state.search.currentPage}&limit=${state.search.limit}`
                }
            })
        )
    });
}

export const setSearchPage = (page) => (dispatch) => {
    return dispatch({
        type: searchActionTypes.setSearchPage,
        payload: {
            currentPage: page
        }
    });
}

export const setSearchQuery = (searchQuery) => (dispatch) => {
    dispatch({
        type: searchActionTypes.setSearchQuery,
        payload: { query: searchQuery }
    });
}

/**
 * Set search state results property by received API data
 * @name setSearchListResults
 * @desc Set search state results property
 * @param {Object} results
 */
export const setSearchListResults = (results) => (dispatch) => {
    const action = {
        type: searchActionTypes.setSearchListResults,
        payload: {
            results: results.list,
            resultsTotal: results.total,
        }
    }

    if (!results.list.length) {
        action.payload.currentPage = 1;
    }

    return dispatch(action);
}

/**
 * Toggle true/false search bar visibility
 * @name toggleSearchVisiblity
 * @desc Toggle true/false search bar visibility
 * @param {Boolean} forceVisibility
 */
export const toggleSearchVisiblity = () => (dispatch, getState) => {
    const searchState = getState().search;

    if (searchState.isBarVisible) {
        dispatch(
            setSearchListResults({
                list: [],
                total: 0
            })
        );
    }

    return dispatch({
        type: searchActionTypes.toggleSearchVisibility,
        payload: !searchState.isBarVisible
    })
}
