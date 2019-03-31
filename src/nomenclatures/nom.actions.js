import nomEndpoints from './nom.endpoints';

export const nomActionTypes = {
    fetchCountriesNom: 'NOM_COUNTRIES_FETCH',
    setCountriesNom: 'NOM_COUNTRIES_SET'
};

export const fetchCountries = () => (dispatch) => {
    return dispatch({
        type: nomActionTypes.fetchCountriesNom,
        api: {
            endpoint: nomEndpoints.getCountries.endpoint,
            method: nomEndpoints.getCountries.method
        }
    });
}

export const setCountries = (countries) => (dispatch) => {
    return dispatch({
        type: nomActionTypes.setCountriesNom,
        payload: countries
    });
}
