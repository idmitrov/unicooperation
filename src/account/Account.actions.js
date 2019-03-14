import accountEndpoints from '../account/Account.endpoints';

export const accountActionTypes = {
    authenticateAccount: 'ACCOUNT_AUTHENTICATED',
    setAccount: 'ACCOUNT_SET'
};

export const authenticateAccount = (email, password) => (dispatch) => {
    return dispatch({
        type: accountActionTypes.authenticateAccount,
        payload: { email, password },
        api: {
            endpoint: accountEndpoints.authenticate.endpoint,
            method: accountEndpoints.authenticate.method
        }
    });
}

export const setAccount = (account) => (dispatch) => {
    return dispatch({
        type: accountActionTypes.setAccount,
        payload: account
    });
}
