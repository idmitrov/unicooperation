import { createSelector } from 'reselect';

const getInterview = (state) => state.interview.instance;
const getAccount = (state) => state.account;

export const selectInterviewEditMode = createSelector(
    [getInterview],
    (interview) => interview && interview._id
);

export const selectInterviewReadonlyMode = createSelector(
    [getInterview, getAccount],
    (interview, account) => interview && interview._id && interview.interviewer !== account.profile
);

export const selectInterview = createSelector(
    [getInterview],
    (interview) => interview
);
