export const appActionTypes = {
    toggleSearchVisibility: 'TOGGLE_SEARCH_VISIBILITY'
};

/**
 * Toggles app.layout.isSearchVisible if forceVisibility is not provided
 * if you provide forceVisibility the it will be set as value of app.layout.isSearchVisible
 * @name toggleSearchVisiblity
 * @param {Boolean} forceVisibility
 */
export const toggleSearchVisiblity = (forceVisibility) => (dispatch, getState) => {
    const appState = getState().app;

    return dispatch({
        type: appActionTypes.toggleSearchVisibility,
        payload: forceVisibility || !appState.layout.isSearchVisible
    })
}
