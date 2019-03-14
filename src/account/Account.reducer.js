import { accountActionTypes } from './Account.actions';

const accountDefaults = {
    authenticated: false,
    token: null,
    email: null
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
