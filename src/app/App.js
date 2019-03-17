import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    AppBar,
    Tooltip,
    Grid
} from '@material-ui/core';

import {
    Home,
    Menu,
    AccountCircle,
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
                            <AppBar position="sticky" color="inherit">
                                <Grid container alignItems="center">
                                    <Grid item sm={true}>
                                        <Tooltip title="Home">
                                            <Link className="header-button" to="/">
                                                <Home />
                                            </Link>
                                        </Tooltip>
                                    </Grid>

                                    <a href="/" title="Unicooperation">
                                        <School id="logo" />
                                    </a>

                                    <Grid item xs={true} sm="auto">
                                        <Tooltip title="Search">
                                            <button className="header-button">
                                                <Search />
                                            </button>
                                        </Tooltip>
                                    </Grid>

                                    <Grid item>
                                        <Tooltip title="Profile">
                                            <Link className="header-button" to="/user/profile">
                                                <AccountCircle />
                                            </Link>
                                        </Tooltip>
                                    </Grid>

                                    <Grid item>
                                        <Tooltip title="Logout">
                                            <button
                                                className="header-button header-button-primary"
                                                onClick={logout}>
                                                <PowerSettingsNew />
                                            </button>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </AppBar>
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
