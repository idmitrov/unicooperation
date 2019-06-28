import addsEndpoints from './Adds.endpoints';

export const addsActionTypes = {
    fetchAddsList: 'ADDS_LIST_FETCH',
    setAddsList: 'ADDS_LIST_SET',
    setAddProp: 'ADD_PROP_SET',
    resetAddInstance: 'ADD_INSTANCE_RESET'
};

export const fetchAddsList = () => (dispatch) => {
    const action = {
        type: addsActionTypes.fetchAddsList,
        api: {
            endpoint: addsEndpoints.fetchAddsList.endpoint,
            method: addsEndpoints.fetchAddsList.method
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

