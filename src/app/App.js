import React, { Component } from 'react';
import { connect } from 'react-redux';

import Home from 'mdi-react/HomeIcon';
import UserCircle from 'mdi-react/UserCircleIcon';
import Magnify from 'mdi-react/MagnifyIcon';
import Power from 'mdi-react/PowerIcon';
import Menu from 'mdi-react/MenuIcon';

import Router, { Routes, Link } from '../utils/router';
import history from '../utils/history';

import './App.scss';
import logo from './Logo.svg';

class App extends Component {
    render() {
        const { authenticated } = this.props;

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
                                                    <Home size={32} />
                                                </Link>
                                            </div>
                                            <div className="col-auto d-md-none">
                                                <button className="header-button header-button-primary">
                                                    <Menu size={32} />
                                                </button>
                                            </div>
                                        </div>

                                        <a href="/" title="Unicooperation">
                                            <img className="logo" src={logo} alt="unicooperation-logo" />
                                        </a>
                                    </div>

                                    {/* NAV */}
                                    <nav id="drawer" className="col-auto">
                                        <ul className="row flex-column flex-md-row no-gutters">
                                            <li className="col-auto">
                                                <button className="header-button" title="Search">
                                                    <Magnify size={32} />
                                                </button>
                                            </li>
                                            <li className="col-auto">
                                                <Link className="header-button" to="/user/profile" title="Profile">
                                                    <UserCircle size={32} />
                                                </Link>
                                            </li>
                                            <li className="col-auto">
                                                <button className="header-button header-button-primary" title="Logout">
                                                    <Power size={32} />
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
        login() {

        },
        register() {

        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
