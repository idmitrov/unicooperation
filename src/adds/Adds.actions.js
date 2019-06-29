import addsEndpoints from './Adds.endpoints';

export const addsActionTypes = {
    fetchMyadds: 'ADDS_MINE_FETCH',
    setAddsList: 'ADDS_LIST_SET',
    setAddProp: 'ADD_PROP_SET',
    resetAddInstance: 'ADD_INSTANCE_RESET',
    fetchMyUniversityAdds: 'ADDS_UNIVERSITY_MINE_FETCH'
};

export const fetchMyUniversityPartnersAdds = () => (dispatch) => {
    const action = {
        type: addsActionTypes.fetchMyUniversityAdds,
        api: {
            endpoint: addsEndpoints.getMyUniversityAdds.endpoint,
            method: addsEndpoints.getMyUniversityAdds.method
        }
    };

    return dispatch(action);
}

export const fetchMyadds = () => (dispatch) => {
    const action = {
        type: addsActionTypes.fetchAddsList,
        api: {
            endpoint: addsEndpoints.getMyAdds.endpoint,
            method: addsEndpoints.getMyAdds.method
        }
    };

    return dispatch(action);
}

export const setAddsList = (adds) => (dispatch) => {
    const action = {
        type: addsActionTypes.setAddsList,
        payload: adds
    };

    return dispatch(action);
}

export const updateAddProps = (key, value) => (dispatch) => {
    const action = {
        type: addsActionTypes.setAddProp,
        payload: { key, value }
    };

    return dispatch(action);
}

export const createAdd = (title, content) => (dispatch) => {
    const action = {
        type: addsActionTypes.setAddProp,
        payload: { title, content },
        api: {
            endpoint: addsEndpoints.createAdd.endpoint,
            method: addsEndpoints.createAdd.method,
        }
    };

    return dispatch(action);
}

export const resetAddInstance = () => (dispatch) => {
    const action = {
        type: addsActionTypes.resetAddInstance
    };

    return dispatch(action);
}

