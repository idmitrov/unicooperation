import { profileActionTypes } from './Profile.actions';

const profileDefaults = {
    isEditable: false
};

export default (state = profileDefaults, action) => {
    switch (action.type) {
        case profileActionTypes.setMyProfileData: {
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        }
        case profileActionTypes.setMyProfile: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: return state;
    }
}
