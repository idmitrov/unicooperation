import { profileActionTypes } from './Profile.actions';

const profileDefaults = {
    isReadonly: true
};

export default (state = profileDefaults, action) => {
    switch (action.type) {
        case profileActionTypes.removeProfileSkill: {
            return {
                ...state,
                skills: action.payload || []
            };
        }
        case profileActionTypes.addProfileSkill: {
            return {
                ...state,
                skills: [
                    ...state.skills || [],
                    action.payload
                ]
            };
        }
        case profileActionTypes.toggleMyProfileReadonly: {
            return {
                ...state,
                isReadonly: action.payload
            };
        }
        case profileActionTypes.setMyProfileData: {
            return {
                ...state,
                [action.payload.key]: action.payload.value
            };
        }
        case profileActionTypes.setMyProfile:
        case profileActionTypes.setProfile: {
            return {
                ...state,
                ...action.payload
            };
        }
        default: return state;
    }
}
