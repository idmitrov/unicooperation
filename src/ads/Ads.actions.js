import adsEndpoints from './Ads.endpoints';

export const adsActionTypes = {
    fetchMyads: 'ADS_MINE_FETCH',
    setAdsList: 'ADS_LIST_SET',
    setAdProp: 'AD_PROP_SET',
    resetAdInstance: 'AD_INSTANCE_RESET',
    fetchMyUniversityAds: 'ADS_UNIVERSITY_MINE_FETCH'
};

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

export const fetchMyads = () => (dispatch) => {
    const action = {
        type: adsActionTypes.fetchMyads,
        api: {
            endpoint: adsEndpoints.getMyAds.endpoint,
            method: adsEndpoints.getMyAds.method
        }
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

export const createAd = (title, content) => (dispatch) => {
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

export const resetAdInstance = () => (dispatch) => {
    const action = {
        type: adsActionTypes.resetAdInstance
    };

    return dispatch(action);
}

