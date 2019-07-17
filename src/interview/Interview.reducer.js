import { interviewActionTypes } from './Interview.actions';

const interviewInstanceDefaults = {};

const interviewDefaults = {
    instance: interviewInstanceDefaults,
    list: []
};

export default (state = interviewDefaults, action = {}) => {
    switch (action.type) {
        case interviewActionTypes.resetInterview: {
            return {
                ...state,
                instance: interviewInstanceDefaults
            }
        }
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
                instance: action.payload || interviewDefaults.instance
            };
        }
        default: return state;
    }
}
