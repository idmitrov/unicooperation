import matcherEndpoints from './Matcher.endpoints';
import { accountType } from '../account/Account.constants';

export const matcherActionTypes = {
    getMatches: 'MATCHER_GET',
    setMatches: 'MATCHER_SET',
    setMatcherTitle: 'MATCHER_TITLE_SET'
};

export const setMatcherTitle = (title) => (dispatch) => {
    return dispatch( {
        type: matcherActionTypes.setMatcherTitle,
        payload: title
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
        const { title } = matcher;
        const query = `title=${title}`;

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
