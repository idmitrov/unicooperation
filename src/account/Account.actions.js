import accountEndpoints from '../account/Account.endpoints';

export const accountActionTypes = {
    authenticateAccount: 'ACCOUNT_AUTHENTICATED',
    setAccount: 'ACCOUNT_SET',
    unsetAccount: 'ACCOUNT_UNSET'
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
    localStorage.setItem('uniaccount', JSON.stringify(account));

    return dispatch({
        type: accountActionTypes.setAccount,
        payload: account
    });
}

export const unsetAccount = () => (dispatch) => {
    localStorage.removeItem('uniaccount');

    return dispatch({
        type: accountActionTypes.unsetAccount
    })
}
