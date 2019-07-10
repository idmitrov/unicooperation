import { interviewActionTypes } from './Interview.actions';

const interviewDefaults = {
    instance: {},
    list: []
};

export default (state = interviewDefaults, action = {}) => {
    switch (action.type) {
        case interviewActionTypes.setInterviewsList: {
            return {
                ...state,
                ...action.payload
            }
        }
        case interviewActionTypes.changeInterviewProp: {
            return {
                ...state,
                instance: {
                    ...state.instance,
                    ...action.payload
                }
            };
        }
        case interviewActionTypes.setInterview: {
            return {
                ...state,
                instance: action.payload
            };
        }
        default: return state;
    }
}
