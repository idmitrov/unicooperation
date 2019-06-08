import profileEndpoints from './Profile.endpoints';

export const profileActionTypes = {
    fetchProfile: 'PROFILE_FETCH',
    setProfile: 'PROFILE_SET',
    fetchMyProfile: 'PROFILE_MINE_FETCH',
    setMyProfile: 'PROFILE_MINE_SET',
    setMyProfileData: 'PROFILE_MINE_DATA_SET',
    updateMyProfile: 'PROFILE_MINE_UPDATE',
    toggleMyProfileReadonly: 'PROFILE_MINE_READONLY_TOGGLE'
};

export const fetchProfile = (type, id) => (dispatch) => {
    const endpoint = profileEndpoints.getProfile.endpoint
        .replace('{profileType}', type)
        .replace('{profileId}', id)

    return dispatch({
        type: profileActionTypes.fetchProfile,
        api: {
            endpoint,
            method: profileEndpoints.getProfile.method
        }
    });
}

export const setProfile = (profile) => (dispatch) => {
    return dispatch({
        type: profileActionTypes.setProfile,
        payload: profile
    });
}

export const fetchMyProfile = () => (dispatch, getState) => {
    const profileType = getState().account.type;
    const endpoint = profileEndpoints.getMyProfile.endpoint.replace('{profileType}', profileType);

    return dispatch({
        type: profileActionTypes.fetchMyProfile,
        api: {
            endpoint,
            method: profileEndpoints.getMyProfile.method
        }
    });
}

export const updateMyProfileAvatar = (avatar) => (dispatch, getState) => {
    const profileType = getState().account.type;

    let formData = new FormData();
    formData.append('avatar', avatar);

    let action = {
        type: profileActionTypes.updateMyProfile,
        file: formData,
        api: {
            endpoint: profileEndpoints.updateMyProfile.endpoint.replace('{profileType}', profileType),
            method: profileEndpoints.updateMyProfile.method
        }
    };

    return dispatch(action);
}

export const updateMyProfile = (updates) => (dispatch, getState) => {
    const profileType = getState().account.type;

    let action = {
        type: profileActionTypes.updateMyProfile,
        payload: updates,
        api: {
            endpoint: profileEndpoints.updateMyProfile.endpoint.replace('{profileType}', profileType),
            method: profileEndpoints.updateMyProfile.method
        }
    };

    return dispatch(action);
}

export const setMyProfile = (profile) => (dispatch) => {
    return dispatch({
        type: profileActionTypes.setMyProfile,
        payload: profile
    });
}

export const setMyProfileData = (key, value) => (dispatch) => {
    return dispatch({
        type: profileActionTypes.setMyProfileData,
        payload: { key, value }
    });
}

export const toggleMyProfileReadonly = () => (dispatch, getState) => {
    const profileState = getState().profile;

    return dispatch({
        type: profileActionTypes.toggleMyProfileReadonly,
        payload: !profileState.isReadonly
    });
}
