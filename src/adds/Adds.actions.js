import addsEndpoints from './Adds.endpoints';

export const addsActionTypes = {
    fetchAddsList: 'ADDS_LIST_FETCH',
    setAddsList: 'ADDS_LIST_SET'
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
