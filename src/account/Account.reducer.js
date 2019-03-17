import { accountActionTypes } from './Account.actions';

const __cachedAccount = JSON.parse(localStorage.getItem('uniaccount'));

const accountDefaults = {
    authenticated: __cachedAccount !== null,
    token: __cachedAccount ? __cachedAccount.token : null,
    email: __cachedAccount ? __cachedAccount.email : null
};

export default (state = accountDefaults, action) => {
    switch (action.type) {
        case accountActionTypes.setAccount: {
            return {
                ...state,
                ...action.payload,
                authenticated: action.payload.token !== null && action.payload.token !== ''
            }
        }
        default: return state;
    }
}
