export default {
    followProfile: {
        endpoint: '{profileType}/follow',
        method: 'POST'
    },
    getProfile: {
        endpoint: '{profileType}/preview/{profile}',
        method: 'GET'
    },
    getMyProfile: {
        endpoint: '{profileType}/me',
        method: 'GET'
    },
    updateMyProfile: {
        endpoint: '{profileType}/me',
        method: 'PUT'
    },
    createNewSkill: {
        endpoint: 'skills',
        method: 'POST'
    }
}
