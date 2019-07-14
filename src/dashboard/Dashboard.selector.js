import { createSelector } from 'reselect';

const MAX_VISIBLE_ITEMS = 2;

const getInterviews = (state) => state.interview.list;
const getAds = (state) => state.ads.list;
const getMatches = (state) => state.matcher.matches;

export const selectTopInterviews = createSelector(
    [getInterviews],
    (interviews) => interviews.slice(0, MAX_VISIBLE_ITEMS)
);

export const selectTopAds = createSelector(
    [getAds],
    (ads) => ads.slice(0, MAX_VISIBLE_ITEMS)
);

export const selectoTopMatches = createSelector(
    [getMatches],
    (matches) => matches.slice(0, MAX_VISIBLE_ITEMS)
);
