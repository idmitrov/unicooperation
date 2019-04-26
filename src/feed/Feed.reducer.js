import { feedActionTypes } from './Feed.actions';

const feedDefaults = {
    list: [],
    isUpToDate: true,
    sortBy: 'createdAt',
    skip: 0,
    limit: 10,
    hasMore: true
};

export default (state = feedDefaults, action) => {
    switch (action.type) {
        case feedActionTypes.setIsUpToDatePublicationsList: {
            return {
                ...state,
                isUpToDate: action.payload
            }
        }
        case feedActionTypes.setPublicationsList:
        case feedActionTypes.setRecentPublicationsList: {
            return {
                ...state,
                list: action.payload.list,
                hasMore: action.payload.hasMore,
                isUpToDate: true,
                skip: action.payload.skip
            }
        }
        default: return state;
    }
}
