import { createSelector } from 'reselect';

const getFeedList = (state) => state.feed.list;
const getFeedSkip = (state) => state.feed.skip;
const getFeedHasMore = (state) => state.feed.hasMore;
const getFeedIsUpToDate = (state) => state.feed.isUpToDate;

export const selectFeedList = createSelector(
    [getFeedList],
    (feedList) => {
        return feedList;
    }
);

export const selectFeedSkip = createSelector(
    [getFeedSkip],
    (feedSkip) => {
        return feedSkip;
    }
);

export const selectFeedHasMore = createSelector(
    [getFeedHasMore],
    (feedHasMore) => {
        return feedHasMore;
    }
);

export const selectFeedIsUpToDate = createSelector(
    [getFeedIsUpToDate],
    (feedIsUpToDate) => {
        return feedIsUpToDate;
    }
);
