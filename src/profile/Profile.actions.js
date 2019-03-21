import profileEndpoints from './Profile.endpoints';

export const profileActionTypes = {
    fetchProfile: 'PROFILE_FETCH',
    fetchMyProfile: 'PROFILE_MINE_FETCH',
};

export const fetchProfile = (type, id) => (dispatch) => {
    // TODO: METHOD NOT IMPLEMENTED
}

export const fetchMyProfile = () => (dispatch) => {
    return dispatch({
        type: profileActionTypes.fetchMyProfile,
        api: {
            endpoint: profileEndpoints.myProfile.endpoint,
            method: profileEndpoints.myProfile.method
        }
    });
}
