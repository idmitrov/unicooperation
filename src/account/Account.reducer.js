import { accountActionTypes } from './Account.actions';
import { notify } from '../components/uni-notifier/UniNotifier.component';

const __cachedAccount = JSON.parse(localStorage.getItem('uniaccount'));

if (__cachedAccount) {
    notify('account.welcome');
}

const accountReset = {
    authenticated: false,
    token: null,
    email: null,
    avatar: null,
    profile: null,
    type: null
};

const accountDefaults = {
    authenticated: __cachedAccount !== null,
    avatar: __cachedAccount ? __cachedAccount.avatar : accountReset.avatar,
    email: __cachedAccount ? __cachedAccount.email : accountReset.email,
    token: __cachedAccount ? __cachedAccount.token : accountReset.token,
    profile: __cachedAccount ? __cachedAccount.profile : accountReset.profile,
    type: __cachedAccount ? __cachedAccount.type : accountReset.type
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
