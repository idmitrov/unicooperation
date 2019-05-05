import { createSelector } from 'reselect';

const getProfile = (state) => state.profile;

export const selectProfile = createSelector(
    [getProfile],
    (profile) => {
        return profile;
    }
);
