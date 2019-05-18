import { createSelector } from 'reselect';

const getAppLayout = (state) => state.app.layout;

export const selectAppLayout = createSelector(
    [getAppLayout],
    (appLayout) => {
        return appLayout
    }
);
