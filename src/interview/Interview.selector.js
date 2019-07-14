import { createSelector } from 'reselect';

const getInterview = (state) => state.interview.instance;

export const selectInterview = createSelector(
    [getInterview],
    (interview) => interview
);
