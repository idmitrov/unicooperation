import { feedActionTypes } from './Feed.actions';

const feedDefaults = {
    list: []
};

export default (state = feedDefaults, action) => {
    switch (action.type) {
        case feedActionTypes.setPublicationsList: {
            console.log(action);

            return {
                ...state,
                list: action.payload
            }
        }
        default: return state;
    }
}
