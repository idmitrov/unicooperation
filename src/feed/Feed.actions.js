import feedEndpoints from './Feed.endpoints';

/**
 * All action types related to FEED/PUBLICATIONS
 * @name feedActionTypes
 */
export const feedActionTypes = {
    fetchPublicationsList: 'PUBLICATIONS_LIST_FETCH',
    fetchRecentPublicationsList: 'PUBLICATIONS_RECENT_LIST_FETCH',
    setPublicationsList: 'PUBLICATIONS_LIST_SET',
    setRecentPublicationsList: 'PUBLICATIONS_RECENT_LIST_SET',
    createPublication: 'PUBLICATION_CREATE',
    setIsUpToDatePublicationsList: 'PUBLICATIONS_LIST_IS_UP_TO_DATE_SET'
};

/**
 * Call the API to fetch the publications list
 * @name fetchPublicationsList
 */
export const fetchPublicationsList = () => (dispatch, getState) => {
    const publicationsState = getState().feed;
    const { skip, limit, sortBy } = publicationsState;

    return dispatch({
        type: feedActionTypes.fetchPublicationsList,
        api: {
            endpoint: feedEndpoints.getPublicationsList.endpoint,
            method: feedEndpoints.getPublicationsList.method,
            query: `sort=${sortBy}&skip=${skip}&limit=${limit}`
        }
    });
}

/**
 *  Receive publications list and set it into the store
 *  along with the previously loaded publications
 *  @name setPublicationsList
 */
export const setPublicationsList = (publications) => (dispatch, getState) => {
    const publicationsState = getState().feed;
    const previouslyLoadedPublications = publicationsState.list;
    const allLoadedPublications = [
        ...previouslyLoadedPublications,
        ...publications.list
    ];

    return dispatch({
        type: feedActionTypes.setPublicationsList,
        payload: {
            list: allLoadedPublications,
            hasMore: publications.hasMore,
            skip: publicationsState.skip + publicationsState.limit
        }
    });
}

/**
 * Call the API to fetch the publications list by getting only the recent publications
 * @name fetchRecentPublicationsList
 */
export const fetchRecentPublicationsList = () => (dispatch) => {
    return dispatch({
        type: feedActionTypes.fetchRecentPublicationsList,
        api: {
            endpoint: feedEndpoints.getPublicationsList.endpoint,
            method: feedEndpoints.getPublicationsList.method
        }
    });
}

/**
 *  Receive the recent publications list and set it to the store
 *  without to keep the previously loaded publications
 *  @name setRecentPublicationsList
 */
export const setRecentPublicationsList = (publications) => (dispatch, getState) => {
    const publicationsState = getState().feed;

    return dispatch({
        type: feedActionTypes.setRecentPublicationsList,
        payload: {
            list: publications.list,
            hasMore: publications.hasMore,
            skip: publicationsState.limit
        }
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
