import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

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
                            {this.props.children}
                        </main>
                    </Fragment>
                </Router>
            </Provider>
        );
    }
}

export default Main;
