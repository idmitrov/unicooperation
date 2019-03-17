import accountEndpoints from '../account/Account.endpoints';

export const accountActionTypes = {
    createAccount: 'ACCOUNT_CREATE',
    authenticateAccount: 'ACCOUNT_AUTHENTICATED',
    setAccount: 'ACCOUNT_SET',
    unsetAccount: 'ACCOUNT_UNSET'
};

export const createAccount = (email, password, name, type) => (dispatch) => {
    return dispatch({
        type: accountActionTypes.createAccount,
        payload: { email, name, password, type },
        api: {
            endpoint: accountEndpoints.create.endpoint,
            method: accountEndpoints.create.method
        }
    });
}

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
