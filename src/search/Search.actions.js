import searchEndpoints from './Search.endpoints';
import { accountType } from '../account/Account.constants';

export const searchActionTypes = {
    toggleSearchVisibility: 'SEARCH_VISIBILITY_TOGGLE',
    fetchSearchList: 'SEARCH_LIST_FETCH'
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
        const account = getState().account;
        let searchingFor = '';

        switch (account.type) {
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

        return dispatch({
            type: searchActionTypes.fetchSearchList,
            payload: nameQuery,
            api: {
                endpoint: searchEndpoints.searchList.endpoint.replace('{searchType}', searchingFor),
                method:  searchEndpoints.searchList.method,
                query: `name=${nameQuery}`
            }
        });
    });
}

/**
 * Toggle true/false search bar visibility, if force provided the value of force will be set
 * @name toggleSearchVisiblity
 * @desc Toggle true/false search bar visibility
 * @param {Boolean} forceVisibility
 */
export const toggleSearchVisiblity = (forceVisibility) => (dispatch, getState) => {
    const searchState = getState().search;

    return dispatch({
        type: searchActionTypes.toggleSearchVisibility,
        payload: forceVisibility || !searchState.isBarVisible
    })
}
