export const appActionTypes = {
    toggleSearchVisibility: 'TOGGLE_SEARCH_VISIBILITY'
};

export const searchProfile = (query) => (dispatch) => {
    console.log(query);
}

/**
 * Toggles isVisible, if forceVisibility is not provided
 * if you provide forceVisibility then it will be set as value of isVisible
 * @name toggleSearchVisiblity
 * @param {Boolean} forceVisibility
 */
export const toggleSearchVisiblity = (forceVisibility) => (dispatch, getState) => {
    const appState = getState().app;

    return dispatch({
        type: appActionTypes.toggleSearchVisibility,
        payload: forceVisibility || !appState.search.isVisible
    })
}
