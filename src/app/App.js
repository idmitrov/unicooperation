import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                                                <Link className="header-button" to="/" title="Home">
                                                    <Home />
                                                </Link>
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
                                                <button className="header-button" title="Search">
                                                    <Search />
                                                </button>
                                            </li>
                                            <li className="col-auto">
                                                <Link className="header-button" to="/user/profile" title="Profile">
                                                    <Person />
                                                </Link>
                                            </li>
                                            <li className="col-auto">
                                                <button
                                                    className="header-button header-button-primary"
                                                    title="Logout"
                                                    onClick={logout}>
                                                    <PowerSettingsNew />
                                                </button>
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
