import { createSelector } from 'reselect';

const getInterview = (state) => state.interview.instance;
const getInterviewsList = (state) => state.interview.list;

export const selectInterviewList = createSelector(
    [getInterviewsList],
    (interviews) => interviews
)

export const selectInterview = createSelector(
    [getInterview],
    (interview) => interview
);
