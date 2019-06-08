export default {
    getProfile: {
        endpoint: '{profileType}/preview/{profileId}',
        method: 'GET'
    },
    getMyProfile: {
        endpoint: '{profileType}/me',
        method: 'GET'
    },
    updateMyProfile: {
        endpoint: '{profileType}/me',
        method: 'PUT'
    }
}
