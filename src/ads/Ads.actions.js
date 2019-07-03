import adsEndpoints from './Ads.endpoints';

export const adsActionTypes = {
    fetchMyAds: 'ADS_MINE_FETCH',
    editAd: 'AD_EDIT',
    setAdsList: 'ADS_LIST_SET',
    updateAdsList: 'ADS_LIST_UPDATE',
    fetchAdInstance: 'AD_INSTNACE_FETCH',
    setAdInstance: 'AD_INSTNACE_SET',
    setAdProp: 'AD_PROP_SET',
    resetAdInstance: 'AD_INSTANCE_RESET',
    fetchMyUniversityAds: 'ADS_UNIVERSITY_MINE_FETCH'
};

export const applyToAd = (adId) => (dispatch) => {
    const action = {
        type: adsActionTypes.fetchMyUniversityAds,
        payload: {adId},
        api: {
            endpoint: adsEndpoints.applyToAd.endpoint,
            method: adsEndpoints.applyToAd.method
        }
    };

    return dispatch(action);
}

export const fetchMyUniversityPartnersAds = () => (dispatch) => {
    const action = {
        type: adsActionTypes.fetchMyUniversityAds,
        api: {
            endpoint: adsEndpoints.getMyUniversityAds.endpoint,
            method: adsEndpoints.getMyUniversityAds.method
        }
    };

    return dispatch(action);
}

export const fetchMyAds = () => (dispatch) => {
    const action = {
        type: adsActionTypes.fetchMyAds,
        api: {
            endpoint: adsEndpoints.getMyAds.endpoint,
            method: adsEndpoints.getMyAds.method
        }
    };

    return dispatch(action);
}

export const updateAdsList = (ad) => (dispatch, getState) => {
    const adsList = getState().ads.list.slice();

    const adToUpdateIndex = adsList.findIndex((a) => a._id === ad._id);
    adsList[adToUpdateIndex] = ad;

    const action = {
        type: adsActionTypes.updateAdsList,
        payload: adsList
    };

    return dispatch(action);
}

export const setAdsList = (ads) => (dispatch) => {
    const action = {
        type: adsActionTypes.setAdsList,
        payload: ads
    };

    return dispatch(action);
}

export const updateAdProp = (key, value) => (dispatch) => {
    const action = {
        type: adsActionTypes.setAdProp,
        payload: { key, value }
    };

    return dispatch(action);
}

export const createAd = (ad) => (dispatch) => {
    const { title, content } = ad;

    const action = {
        type: adsActionTypes.setAdProp,
        payload: { title, content },
        api: {
            endpoint: adsEndpoints.createAd.endpoint,
            method: adsEndpoints.createAd.method,
        }
    };

    return dispatch(action);
}

export const editAd = (ad) => (dispatch) => {
    const { title, content } = ad;

    const action = {
        type: adsActionTypes.editAd,
        payload: { title, content },
        api: {
            endpoint: adsEndpoints.editAd.endpoint.replace('{adId}', ad._id),
            method: adsEndpoints.editAd.method,
        }
    };

    return dispatch(action);
}

export const fetchAdInstance = (adId) => (dispatch) => {
    const action = {
        type: adsActionTypes.fetchAdInstance,
        api: {
            endpoint: adsEndpoints.getAd.endpoint.replace('{adId}', adId),
            method: adsEndpoints.getAd.method,
        }
    };

    return dispatch(action);
}

export const setAdInstance = (ad) => (dispatch) => {
    const action = {
        type: adsActionTypes.setAdInstance,
        payload: ad
    };

    return dispatch(action);
}

export const resetAdInstance = () => (dispatch) => {
    const action = {
        type: adsActionTypes.resetAdInstance
    };

    return dispatch(action);
}

