import { matcherActionTypes } from './Matcher.actions';

const matcherDefaults = {
    experience: null,
    matches: [],
    salary: null,
    skills: [],
    title: '',
    page: 1,
    limit: 10
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
