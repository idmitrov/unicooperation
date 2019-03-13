import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import appReducer from '../app/App.reducer';

const store = createStore(
    combineReducers({
        app: appReducer
    }),
    composeWithDevTools(
        applyMiddleware(
            thunk
        )
    )
);

export default store;

