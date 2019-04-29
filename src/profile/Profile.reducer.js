import { profileActionTypes } from './Profile.actions';

const profileDefaults = {};

export default (state = profileDefaults, action) => {
    switch (action.type) {
        case profileActionTypes.setMyProfile: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: return state;
    }
}
