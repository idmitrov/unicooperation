import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { connect as __connect__ } from 'react-redux';
import thunk from 'redux-thunk';

import accountReducer from '../account/Account.reducer';
import appReducer from '../app/App.reducer';
import feedReducer from '../feed/Feed.reducer';
import matcherReducer from '../matcher/Matcher.reducer';
import nomReducer from '../nomenclatures/Nom.reducer';
import profileReducer from '../profile/Profile.reducer';
import searchReducer from '../search/Search.reducer';
import sharedReducer from '../shared/shared.reducer';
import { accountActionTypes } from '../account/Account.actions';

import api from './api';

const allReducers = combineReducers({
    account: accountReducer,
    app: appReducer,
    feed: feedReducer,
    matcher: matcherReducer,
    nomenclatures: nomReducer,
    profile: profileReducer,
    search: searchReducer,
    shared: sharedReducer
});

const store = createStore(
    (state, action) => {
        if (action.type === accountActionTypes.unsetAccount) {
            state = undefined;
        }

        return allReducers(state, action);
    },
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

