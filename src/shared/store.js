import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { connect } from 'react-redux';
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

export const mapStateToProps = (mapStateToProps) => connect(mapStateToProps, {});
export const mapDispatchToProps = (mapDispatchToProps) => connect({}, mapDispatchToProps);

export default store;

