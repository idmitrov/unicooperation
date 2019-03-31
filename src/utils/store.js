import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { connect as __connect__ } from 'react-redux';
import thunk from 'redux-thunk';

import accountReducer from '../account/Account.reducer';
import appReducer from '../app/App.reducer';
import feedReducer from '../feed/Feed.reducer';
import nomReducer from '../nomenclatures/nom.reducer';
import ProfileReducer from '../profile/Profile.reducer';

import api from './api';

const store = createStore(
    combineReducers({
        account: accountReducer,
        app: appReducer,
        feed: feedReducer,
        nomenclatures: nomReducer,
        profile: ProfileReducer
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

