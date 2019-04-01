import setupEndpoints from './Setup.endpoints';

export const setupActionTypes = {
    createUniversitySetup: 'SETUP_UNIVERSITY_CREATE'
};

export const createUniversitySetup = (name, countryCode) => (dispatch) => {
    return dispatch({
        type: setupActionTypes.createUniversitySetup,
        payload: { name, countryCode },
        api: {
            endpoint: setupEndpoints.createUniversitySetup.endpoint,
            method: setupEndpoints.createUniversitySetup.method
        }
    });
}
