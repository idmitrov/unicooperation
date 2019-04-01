import { sharedActionTypes } from './shared.actions';

const sharedDefaults = {
    universities: [],
    students: [],
    partners: []
};

export default (state = sharedDefaults, action) => {
    switch (action.type) {
        case sharedActionTypes.setUniversityFilter: {
            return {
                ...state,
                universities: action.payload
            }
        }
        default: return state;
    }
}
