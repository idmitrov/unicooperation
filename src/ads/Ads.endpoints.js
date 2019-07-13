export default {
    getAd: {
        endpoint: 'ads/{adId}',
        method: 'GET'
    },
    getAdApplications: {
        endpoint: 'ads/candidates/{adId}',
        method: 'GET'
    },
    applyToAd: {
        endpoint: 'ads/apply',
        method: 'POST'
    },
    cancelAdApplication: {
        endpoint: 'ads/cancel',
        method: 'POST'
    },
    getMyUniversityAds: {
        endpoint: 'ads',
        method: 'GET'
    },
    getMyAds: {
        endpoint: 'ads/mine',
        method: 'GET'
    },
    createAd: {
        endpoint: 'ads',
        method: 'POST'
    },
    editAd: {
        endpoint: 'ads/{adId}',
        method: 'PUT'
    }
}
