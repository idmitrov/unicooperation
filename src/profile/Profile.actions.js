import profileEndpoints from './Profile.endpoints';

export const profileActionTypes = {
    fetchProfile: 'PROFILE_FETCH',
    fetchMyProfile: 'PROFILE_MINE_FETCH',
    setMyProfile: 'PROFILE_MINE_SET',
    setMyProfileData: 'PROFILE_MINE_DATA_SET',
    updateMyProfile: 'PROFILE_MINE_UPDATE',
};

export const fetchProfile = (type, id) => (dispatch) => {
    // TODO: METHOD NOT IMPLEMENTED
}

export const fetchMyProfile = () => (dispatch, getState) => {
    const profileType = getState().account.type;

    return dispatch({
        type: profileActionTypes.fetchMyProfile,
        api: {
            endpoint: profileEndpoints.getMyProfile.endpoint.replace('{profileType}', profileType),
            method: profileEndpoints.getMyProfile.method.replace('{profileType}', profileType)
        }
    });
}

export const updateMyProfile = (updates) => (dispatch, getState) => {
    const profileType = getState().account.type;

    let action = {
        type: profileActionTypes.updateMyProfile,
        payload: updates,
        api: {
            endpoint: profileEndpoints.updateMyProfile.endpoint.replace('{profileType}', profileType),
            method: profileEndpoints.updateMyProfile.method.replace('{profileType}', profileType)
        }
    };

    if (updates.avatar) {
        let formData = new FormData();

        formData.append('avatar', updates.avatar);
        action.file = formData;
        action.payload = null;
    }

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
