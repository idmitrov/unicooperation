import { matcherActionTypes } from './Matcher.actions';

const matcherDefaults = {
    experience: null,
    matches: [],
    salary: null,
    skills: [],
    title: ''
};

export default (state = matcherDefaults, action = {}) => {
    switch (action.type) {
        case matcherActionTypes.setMatcherTitle: {
            return {
                ...state,
                title: action.payload
            };
        }
        case matcherActionTypes.setMatches: {
            return {
                ...state,
                matches: action.payload
            };
        }
        default: return state;
    }
}
