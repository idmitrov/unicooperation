import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Tooltip
} from '@material-ui/core';

import {
    Home,
    Menu,
    Person,
    Search,
    School,
    PowerSettingsNew
} from '@material-ui/icons';

import Router, { Routes, Link } from '../utils/router';
import history from '../utils/history';

import './App.scss';

import { unsetAccount } from '../account/Account.actions';

class App extends Component {
    render() {
        const { authenticated, logout } = this.props;

        return (
            <Router history={history}>
                <React.Fragment>
                    {
                        authenticated ? (
                            <header>
                                <div className="row align-items-center no-gutters">
                                    <div className="col">
                                        <div className="row no-gutters justify-content-between">
                                            <div className="col-auto">
                                                <Tooltip title="Home">
                                                    <Link className="header-button" to="/">
                                                        <Home />
                                                    </Link>
                                                </Tooltip>
                                            </div>
                                            <div className="col-auto d-md-none">
                                                <button className="header-button header-button-primary">
                                                    <Menu />
                                                </button>
                                            </div>
                                        </div>

                                        <a href="/" title="Unicooperation">
                                            <School id="logo" />
                                        </a>
                                    </div>

                                    {/* NAV */}
                                    <nav id="drawer" className="col-auto">
                                        <ul className="row flex-column flex-md-row no-gutters">
                                            <li className="col-auto">
                                                <Tooltip title="Search">
                                                    <button className="header-button">
                                                        <Search />
                                                    </button>
                                                </Tooltip>
                                            </li>
                                            <li className="col-auto">
                                                <Tooltip title="Profile">
                                                    <Link className="header-button" to="/user/profile">
                                                        <Person />
                                                    </Link>
                                                </Tooltip>
                                            </li>
                                            <li className="col-auto">
                                                <Tooltip title="Logout">
                                                    <button
                                                        className="header-button header-button-primary"
                                                        onClick={logout}>
                                                        <PowerSettingsNew />
                                                    </button>
                                                </Tooltip>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </header>
                        ) : (null)
                    }

                    <main>
                        <Routes authenticated={authenticated} />
                    </main>
                </React.Fragment>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.account.authenticated
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout() {
            return dispatch(unsetAccount());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
