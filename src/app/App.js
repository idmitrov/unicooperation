import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';

import Router, { Routes } from '../shared/router';
import store from '../shared/store';
import history from '../shared/history';

import './App.scss';
import logo from './Logo.svg';

class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Fragment>
                        <header className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <a href="/" title="Unicooperation">
                                        <img className="logo" src={logo} />
                                    </a>

                                    Home
                                </div>

                                <nav className="col-auto">
                                    RIGHT NAV
                                </nav>
                            </div>
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
