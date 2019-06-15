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

/**
 *  Request API to get profile data
 *  @name fetchProfile
 *  @param {String} type
 *  @param {String} id
 */
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

/**
 *  Sets profile state after fetching profile data
 *  @name setProfile
 *  @param {Object} profile
 */
export const setProfile = (profile) => (dispatch) => {
    return dispatch({
        type: profileActionTypes.setProfile,
        payload: profile
    });
}

/**
 *  Request API to get profile data
 *  @name fetchMyProfile
 */
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

/**
 *  Request API to upload avatar
 *  @name updateMyProfileAvatar
 *  @param {String} avatar
 */
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

/**
 *  Request API to update profile
 *  @name updateMyProfile
 *  @param {Object} updates
 */
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

/**
 *  Sets profile state after fetching profile data
 *  @name setMyProfile
 *  @param {Object} profile
 */
export const setMyProfile = (profile) => (dispatch) => {
    return dispatch({
        type: profileActionTypes.setMyProfile,
        payload: profile
    });
}

/**
 *  Sets profile give property by provided profile state key
 *  @name setMyProfileData
 *  @param {String} key
 *  @param {Any} value
 */
export const setMyProfileData = (key, value) => (dispatch) => {
    return dispatch({
        type: profileActionTypes.setMyProfileData,
        payload: { key, value }
    });
}

/**
 *  Toggles profile readonly true/false
 *  @name toggleMyProfileReadonly
 */
export const toggleMyProfileReadonly = () => (dispatch, getState) => {
    const profileState = getState().profile;

    return dispatch({
        type: profileActionTypes.toggleMyProfileReadonly,
        payload: !profileState.isReadonly
    });
}
