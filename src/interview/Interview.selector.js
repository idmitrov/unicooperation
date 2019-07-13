import { createSelector } from 'reselect';

const getInterview = (state) => state.interview.instance;

export const selectInterviewMode = createSelector(
    getInterview,
    (interview) => interview && interview._id
)

export const selectInterview = createSelector(
    getInterview,
    (interview) => interview
)
