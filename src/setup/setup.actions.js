import setupEndpoints from './Setup.endpoints';

export const setupActionTypes = {
    createUniversitySetup: 'SETUP_UNIVERSITY_CREATE',
    createPartnerSetup: 'SETUP_PARTNER_CREATE',
    createStudentSetup: 'SETUP_STUDENT_CREATE'
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

export const createStudentSetup = (firstName, facultyId, university) => (dispatch) => {
    return dispatch({
        type: setupActionTypes.createStudentSetup,
        payload: { firstName, facultyId, university },
        api: {
            endpoint: setupEndpoints.createStudentSetup.endpoint,
            method: setupEndpoints.createStudentSetup.method
        }
    });
}
