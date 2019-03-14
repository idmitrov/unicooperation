import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';

import Home from 'mdi-react/HomeIcon';
import UserCircle from 'mdi-react/UserCircleIcon';
import Magnify from 'mdi-react/MagnifyIcon';
import Power from 'mdi-react/PowerIcon';

import Router, { Routes } from '../shared/router';
import store from '../shared/store';
import history from '../shared/history';

import './App.scss';
import logo from './Logo.svg';
import { Link } from '../shared/router';

class Main extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Fragment>
                        <header>
                            <div className="row align-items-center">
                                <div className="col">
                                    <a href="/" title="Unicooperation">
                                        <img className="logo" src={logo} alt="unicooperation-logo"/>
                                    </a>

                                    <Link className="header-button" to="/" title="Home">
                                        <Home size={32} />
                                    </Link>
                                </div>

                                <nav className="col-auto">
                                    <button className="header-button" title="Search">
                                        <Magnify size={32} />
                                    </button>

                                    <Link className="header-button" to="/user/profile" title="Profile">
                                        <UserCircle size={32} />
                                    </Link>

                                    <button className="header-button header-button-primary" title="Logout">
                                        <Power size={32} />
                                    </button>
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
