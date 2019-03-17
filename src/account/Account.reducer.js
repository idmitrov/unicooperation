import { accountActionTypes } from './Account.actions';

const __cachedAccount = JSON.parse(localStorage.getItem('uniaccount'));

const accountReset = {
    authenticated: false,
    token: null,
    email: null
};

const accountDefaults = {
    authenticated: __cachedAccount !== null,
    token: __cachedAccount ? __cachedAccount.token : accountReset.token,
    email: __cachedAccount ? __cachedAccount.email : accountReset.email
};

export default (state = accountDefaults, action) => {
    switch (action.type) {
        case accountActionTypes.unsetAccount: {
            return accountReset;
        }
        case accountActionTypes.setAccount: {
            return {
                ...state,
                ...action.payload,
                authenticated: action.payload.token !== null && action.payload.token !== ''
            };
        }
        default: return state;
    }
}
