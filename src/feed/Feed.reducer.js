import { feedActionTypes } from './Feed.actions';

const feedDefaults = {
    list: [],
    isUpToDate: true
};

export default (state = feedDefaults, action) => {
    switch (action.type) {
        case feedActionTypes.setIsUpToDatePublicationsList: {
            return {
                ...state,
                isUpToDate: action.payload
            }
        }
        case feedActionTypes.setPublicationsList: {
            return {
                ...state,
                list: action.payload,
                isUpToDate: true
            }
        }
        default: return state;
    }
}
