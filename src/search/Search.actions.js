import searchEndpoints from './Search.endpoints';
import { accountType } from '../account/Account.constants';

export const searchActionTypes = {
    toggleSearchVisibility: 'SEARCH_VISIBILITY_TOGGLE',
    fetchSearchList: 'SEARCH_LIST_FETCH',
    setSearchListResults: 'SEARCH_LIST_RESULTS_SET',
    setSearchQuery: 'SEARCH__QUERY_SET'
};

/**
 * Fetch API to search for a given profile depending on the account type
 * i.e university is allowed to search only for partners, partner for universities and
 * student for students
 * @name fetchSearchList
 * @desc Search for a given profile
 * @param {String} searchquery
 */
export const fetchSearchList = (searchquery) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        if (!searchquery) {
            return resolve({
                list: [],
                total: 0
            });
        }

        const state = getState();
        let searchingFor = '';

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
                payload: searchquery,
                api: {
                    endpoint: searchEndpoints.searchList.endpoint.replace('{searchType}', searchingFor),
                    method: searchEndpoints.searchList.method,
                    query: `name=${state.search.query}&skip=${state.search.skip}&limit=${state.search.limit}`
                }
            })
        )
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
 * @param {Array} results
 */
export const setSearchListResults = (results) => (dispatch, getState) => {
    const searchState = getState().search;

    return dispatch({
        type: searchActionTypes.setSearchListResults,
        payload: {
            results: results.list,
            resultsTotal: results.total,
            skip: results.list && results.list.length ? searchState.skip + searchState.limit : 0
        }
    });
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
