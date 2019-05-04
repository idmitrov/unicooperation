import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    AppBar,
    Tooltip,
    Grid,
    Avatar
} from '@material-ui/core';

import {
    Home,
    Search,
    School,
    PowerSettingsNew
} from '@material-ui/icons';

import { Trans } from 'react-i18next';

import Router, { Routes, Link } from '../utils/router';
import history from '../utils/history';

import './App.scss';

import { unsetAccount } from '../account/Account.actions';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faLinkedin,
    faFacebook,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';

library.add([
    faLinkedin,
    faFacebook,
    faInstagram
]);

class App extends Component {
    render() {
        const { account, logout } = this.props;

        return (
            <Router history={history}>
                <React.Fragment>
                    {
                        account.authenticated ? (
                            <AppBar position="sticky" color="inherit">
                                <Grid container justify="center" alignItems="center">
                                    <Grid item xs={12} md={5}>
                                        <Grid container alignItems="center">
                                            <Grid item sm={true}>
                                                <Tooltip title={<Trans>global.home.label</Trans>}>
                                                    <Link className="header-button" to="/">
                                                        <Home />
                                                    </Link>
                                                </Tooltip>
                                            </Grid>

                                            <a href="/" title="Unicooperation">
                                                <School id="logo" />
                                            </a>

                                            <Grid item xs={true} sm="auto">
                                                <Tooltip title={<Trans>global.search.label</Trans>}>
                                                    <button className="header-button">
                                                        <Search />
                                                    </button>
                                                </Tooltip>
                                            </Grid>

                                            <Grid item>
                                                <Tooltip title={<Trans>global.profile.label</Trans>}>
                                                    <Link className="header-button" to="/profile">
                                                        <Avatar
                                                            id="avatar"
                                                            src={account.avatar || `${process.env.PUBLIC_URL}/avatar-default.png`}
                                                            alt="User avatar"
                                                        />
                                                    </Link>
                                                </Tooltip>
                                            </Grid>

                                            <Grid item>
                                                <Tooltip title={<Trans>account.logout.label</Trans>}>
                                                    <button
                                                        className="header-button header-button-primary"
                                                        onClick={logout}>
                                                        <PowerSettingsNew />
                                                    </button>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AppBar>
                        ) : (null)
                    }

                    <main>
                        <Routes account={account} />
                    </main>
                </React.Fragment>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout() {
            history.push('/');

            return dispatch(unsetAccount());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
