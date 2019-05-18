import { createSelector } from 'reselect';

const getAppSearch = (state) => state.app.search;

export const selectAppSearch = createSelector(
    [getAppSearch],
    (search) => {
        return search
    }
);
