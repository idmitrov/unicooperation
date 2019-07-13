import { createSelector } from 'reselect';

const getInterview = (state) => state.interview.instance;

export const selectInterviewMode = createSelector(
    getInterview,
    (interview) => interview._id && interview._id !== null && interview._id !== undefined
)

export const selectInterview = createSelector(
    getInterview,
    (interview) => interview
)
