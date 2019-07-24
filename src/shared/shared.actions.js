import sharedEndpoints from './shared.endpoints';

export const sharedActionTypes = {
    filterUniversity: 'UNIVERSITY_FILTER',
    setUniversityFilter: 'FILTER_UNIVERSITY_SET',
    filterSkills: 'SKILLS_FILTER',
    setSkillsFilter: 'SKILLS_FILTER_SET'
};

export const filterSkills = (name) => (dispatch) => {
    const action = {
        type: sharedActionTypes.filterSkills,
        api: {
            endpoint: sharedEndpoints.filterSkills.endpoint,
            method: sharedEndpoints.filterSkills.method,
            query: `skill=${name}`
        }
    };

    return dispatch(action);
}

export const setSkillsFilter = (skillNameQuery) => (dispatch) => {
    const action = {
        type: sharedActionTypes.setSkillsFilter,
        payload: skillNameQuery
    };

    return dispatch(action);
}

export const filterUniversity = (name) => (dispatch) => {
    const action = {
        type: sharedActionTypes.filterUniversity,
        api: {
            endpoint: sharedEndpoints.filterUniversity.endpoint,
            method: sharedEndpoints.filterUniversity.method,
            query: `name=${name}`
        }
    };

    return dispatch(action);
}

export const setUniversityFilter = (universities) => (dispatch) => {
    const action = {
        type: sharedActionTypes.setUniversityFilter,
        payload: universities
    };

    return dispatch(action);
}
