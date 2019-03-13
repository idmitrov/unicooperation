import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';

import Router, { Routes } from '../shared/router';
import store from '../shared/store';
import history from '../shared/history';

class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Fragment>
                        <header>
                            Unicooperation
                        </header>

                        <main>
                            <Routes />
                        </main>
                    </Fragment>
                </Router>
            </Provider>
        );
    }
}

export default Main;
