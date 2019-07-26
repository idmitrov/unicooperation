import matcherEndpoints from './Matcher.endpoints';
import { accountType } from '../account/Account.constants';

export const matcherActionTypes = {
    getMatches: 'MATCHER_GET',
    setMatches: 'MATCHER_SET',
    setMatcherTitle: 'MATCHER_TITLE_SET',
    setMatcherTotal: 'MATCHER_TOTAL_SET',
    changeMatcherFilter: 'MATCHER_FILTER_CHANGE'
};

export const changeMatcherFilter = (key, value) => (dispatch) => {
    const action = {
        type: matcherActionTypes.changeMatcherFilter,
        payload: { key, value }
    };

    return dispatch(action);
}

export const setMatcherTitle = (title) => (dispatch) => {
    return dispatch( {
        type: matcherActionTypes.setMatcherTitle,
        payload: title
    });
}

export const setMatcherTotal = (total) => (dispatch) => {
    return dispatch( {
        type: matcherActionTypes.setMatcherTotal,
        payload: total
    });
}

export const setMatches = (matches) => (dispatch) => {
    return dispatch( {
        type: matcherActionTypes.setMatches,
        payload: matches
    });
}

export const getMatches = () => (dispatch, getState) => {
    const { account, matcher } = getState();
    let accType = null;

    // Currently support only Partner matches, but provide the ability for extending
    switch (account.type) {
        case accountType.partner:
            accType = accountType.student;
            break;
        default: console.error('Unknown matcher account type');
    }

    if (accType) {
        const { title, page, limit, experience } = matcher;
        let query = `&page=${page}&limit=${limit}`;

        if (title) {
            query += `&title=${title}`;
        }

        if (experience) {
            query += `&experience=${experience}`;
        }

        return dispatch({
            type: matcherActionTypes.getMatches,
            api: {
                endpoint: matcherEndpoints.getMatches.endpoint.replace('{accountType}', accType),
                method: matcherEndpoints.getMatches.method,
                query
            }
        });
    }
}
