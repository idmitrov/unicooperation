import sharedEndpoints from './shared.endpoints';

export const sharedActionTypes = {
    filterUniversity: 'UNIVERSITY_FILTER',
    setUniversityFilter: 'FILTER_UNIVERSITY_SET'
};

export const filterUniversity = (name) => (dispatch) => {
    return dispatch({
        type: sharedActionTypes.filterUniversity,
        api: {
            endpoint: sharedEndpoints.filterUniversity.endpoint,
            method: sharedEndpoints.filterUniversity.method,
            query: `name=${name}`
        }
    });
}

export const setUniversityFilter = (universities) => (dispatch) => {
    return dispatch({
        type: sharedActionTypes.setUniversityFilter,
        payload: universities
    });
}
