import setupEndpoints from './Setup.endpoints';

export const setupActionTypes = {
    createUniversitySetup: 'SETUP_UNIVERSITY_CREATE',
    createPartnerSetup: 'SETUP_PARTNER_CREATE'
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

export const createPartnerSetup = (name, countryCode) => (dispatch) => {
    return dispatch({
        type: setupActionTypes.createPartnerSetup,
        payload: { name, countryCode },
        api: {
            endpoint: setupEndpoints.createPartnerSetup.endpoint,
            method: setupEndpoints.createPartnerSetup.method
        }
    });
}
