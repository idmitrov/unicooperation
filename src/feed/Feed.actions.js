import feedEndpoints from './Feed.endpoints';

/**
 * All action types related to FEED/PUBLICATIONS
 * @name feedActionTypes
 */
export const feedActionTypes = {
    fetchPublicationsList: 'PUBLICATIONS_LIST_FETCH',
    setPublicationsList: 'PUBLICATIONS_LIST_SET',
    createPublication: 'PUBLICATION_CREATE',
    setIsUpToDatePublicationsList: 'PUBLICATIONS_LIST_IS_UP_TO_DATE_SET'
};

/**
 * Call the API to fetch the publications list
 * @name fetchPublicationsList
 */
export const fetchPublicationsList = () => (dispatch) => {
    return dispatch({
        type: feedActionTypes.fetchPublicationsList,
        api: {
            endpoint: feedEndpoints.getPublicationsList.endpoint,
            method: feedEndpoints.getPublicationsList.method
        }
    });
}

/**
 *  Receive publications list and set it into the store
 *  @name setPublicationsList
 */
export const setPublicationsList = (publications) => (dispatch) => {
    return dispatch({
        type: feedActionTypes.setPublicationsList,
        payload: publications
    });
}

/**
 *  Create a new publication
 *  @name createPublication
 */
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

/**
 *  Set the store propert isUpToDate of the publications list
 *  @name setIsUpToDatePublicationsList
 */
export const setIsUpToDatePublicationsList = (isUpToDate) => (dispatch) => {
    return dispatch({
        type:  feedActionTypes.setIsUpToDatePublicationsList,
        payload: isUpToDate
    });
}
