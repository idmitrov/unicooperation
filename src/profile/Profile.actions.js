import profileEndpoints from './Profile.endpoints';

export const profileActionTypes = {
    fetchProfile: 'PROFILE_FETCH',
    fetchMyProfile: 'PROFILE_MINE_FETCH',
    setMyProfile: 'PROFILE_MINE_SET',
    updateProfile: 'PROFILE_UPDATE'
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
        type: profileActionTypes.updateProfile,
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

export const changeProfileData = (updatePath, updateValue) => (dispatch) => {
    console.log(updatePath, updateValue);
}
