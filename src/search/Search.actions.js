import searchEndpoints from './Search.endpoints';
import { accountType } from '../account/Account.constants';

export const searchActionTypes = {
    toggleSearchVisibility: 'SEARCH_VISIBILITY_TOGGLE',
    fetchSearchList: 'SEARCH_LIST_FETCH',
    setSearchListResults: 'SEARCH_LIST_RESULTS_SET',
    setSearchParams: 'SEARCH_PARAMS_SET'
};

/**
 * Fetch API to search for a given profile depending on the account type
 * i.e university is allowed to search only for partners, partner for universities and
 * student for students
 * @name fetchSearchList
 * @desc Search for a given profile
 * @param {String} nameQuery
 */
export const fetchSearchList = (nameQuery) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
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

        dispatch({
            type: searchActionTypes.setSearchParams,
            payload: { query: nameQuery }
        });

        return dispatch({
            type: searchActionTypes.fetchSearchList,
            payload: nameQuery,
            api: {
                endpoint: searchEndpoints.searchList.endpoint.replace('{searchType}', searchingFor),
                method:  searchEndpoints.searchList.method,
                query: `name=${nameQuery}&skip=${state.search.skip}&limit=${state.search.limit}`
            }
        })
            .then((searchResult) => {
                return resolve(searchResult);
            });
    });
}

/**
 * Set search state results property by received API data
 * @name setSearchListResults
 * @desc Set search state results property
 * @param {Array} results
 */
export const setSearchListResults = (results) => (dispatch) => {
    return dispatch({
        type: searchActionTypes.setSearchListResults,
        payload: results
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
