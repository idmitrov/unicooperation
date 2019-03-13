import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { connect as __connect__ } from 'react-redux';
import thunk from 'redux-thunk';

import appReducer from '../app/App.reducer';
import feedReducer from '../feed/Feed.reducer';

import api from '../shared/api';

const store = createStore(
    combineReducers({
        app: appReducer,
        feed: feedReducer
    }),
    composeWithDevTools(
        applyMiddleware(
            thunk,
            api
        )
    )
);

export const mapStateToProps = (mapStateToProps) => connect(mapStateToProps, {});
export const mapDispatchToProps = (mapDispatchToProps) => connect({}, mapDispatchToProps);
export const connect = __connect__;

export default store;

