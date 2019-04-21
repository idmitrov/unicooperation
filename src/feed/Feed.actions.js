import feedEndpoints from './Feed.endpoints';

export const feedActionTypes = {
    fetchPublicationsList: 'PUBLICATIONS_LIST_FETCH',
    setPublicationsList: 'PUBLICATIONS_LIST_SET',
    createPublication: 'PUBLICATION_CREATE'
};

export const fetchPublicationsList = () => (dispatch) => {
    return dispatch({
        type: feedActionTypes.fetchPublicationsList,
        api: {
            endpoint: feedEndpoints.getPublicationsList.endpoint,
            method: feedEndpoints.getPublicationsList.method
        }
    });
}

export const setPublicationsList = (publications) => (dispatch) => {
    return dispatch({
        type: feedActionTypes.setPublicationsList,
        payload: publications
    });
}

export const createPublication = (publication) => (dispatch) => {
    return dispatch({
        type: feedActionTypes.createPublication,
        payload: publication,
        api: {
            endpoint: feedEndpoints.createPublication.endpoint,
            method: feedEndpoints.createPublication.method
        }
    });
}
