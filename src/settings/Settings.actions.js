export const settingsActionTypes = {
    setLanguage: 'SETTINGS_LANGUAGE_SET'
};

export const setLanguage = (language) => (dispatch) => {
    const action = {
        type: settingsActionTypes.setLanguage,
        payload: language
    };

    return dispatch(action);
}
