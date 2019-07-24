import { sharedActionTypes } from './shared.actions';

const sharedDefaults = {
    universities: [],
    students: [],
    partners: [],
    skills: []
};

export default (state = sharedDefaults, action) => {
    switch (action.type) {
        case sharedActionTypes.setSkillsFilter: {
            return {
                ...state,
                skills: action.payload
            };
        }
        case sharedActionTypes.setUniversityFilter: {
            return {
                ...state,
                universities: action.payload
            };
        }
        default: return state;
    }
}
