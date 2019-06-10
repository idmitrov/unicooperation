import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    AppBar,
    Avatar,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    TextField,
    IconButton
} from '@material-ui/core';

import {
    Home,
    Search,
    School,
    PowerSettingsNew,
    ChevronLeft,
    ChevronRight
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

import { selectAccount } from '../account/Account.selector';

import {
    fetchSearchList,
    toggleSearchVisiblity,
    setSearchListResults,
    setSearchQuery,
    setSearchPage
} from '../search/Search.actions';


import { accountType } from '../account/Account.constants';
import { selectPages, selectSearch, selectTotalPages } from '../search/Search.selector';

library.add([
    faLinkedin,
    faFacebook,
    faInstagram
]);

class App extends Component {
    render() {
        const {
            account,
            search,
            toggleSearchVisiblity,
            searchProfile,
            searchProfileOnGivenPage,
            logout,
            pages,
            totalPages
        } = this.props;

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
                                                    <button className="header-button" onClick={toggleSearchVisiblity}>
                                                        <Search />
                                                    </button>
                                                </Tooltip>
                                            </Grid>

                                            <Grid item>
                                                <Tooltip title={<Trans>global.profile.label</Trans>}>
                                                    <Link className="header-button" to="/profile/me">
                                                        <Avatar
                                                            id="avatar"
                                                            src={`${process.env.PUBLIC_URL}/avatar-default.png`}
                                                            alt="profile avatar"
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

                    <Drawer anchor="top"  open={search.isBarVisible} onClose={toggleSearchVisiblity}>
                        <div id="search-input">
                            <TextField
                                type="search"
                                label="Search"
                                autoFocus
                                fullWidth
                                onChange={searchProfile}
                            />
                        </div>

                        {
                            search.results.length ? (
                                <div id="search-content">
                                    <List dense>
                                        <Grid container>
                                            {
                                                search.results.map((result, index) => {
                                                    const title = result.name || result.firstName;
                                                    const searchCriteria = result.account.type === accountType.student ? result.facultyId : result.name;

                                                    return (
                                                        <Grid item key={index} xs={6} md={4} lg={2}>
                                                            <Link to={`/profile/${result.account.type}/${searchCriteria}`} className="link-no-underline" onClick={toggleSearchVisiblity}>
                                                                <ListItem button>
                                                                    <ListItemAvatar>
                                                                        {
                                                                            result.avatar ? (
                                                                                <Avatar alt="profile image" src={result.avatar}></Avatar>
                                                                            ) : (<Avatar>{title[0].toUpperCase()}</Avatar>)
                                                                        }
                                                                    </ListItemAvatar>

                                                                    <ListItemText primary={title} />
                                                                </ListItem>
                                                            </Link>
                                                        </Grid>
                                                    );
                                                })
                                            }
                                        </Grid>
                                    </List>

                                    <div id="search-meta">
                                        <Grid container justify="center" alignItems="center" spacing={16}>
                                            <Grid item>
                                                <IconButton
                                                    disabled={search.currentPage <= 1}
                                                    onClick={() => searchProfileOnGivenPage(search.currentPage - 1)}>
                                                    <ChevronLeft />
                                                </IconButton>
                                            </Grid>

                                            {
                                                pages.map((page) => {
                                                    return (
                                                        <Grid item key={page}>
                                                            <button
                                                                variant="text"
                                                                disabled={page === search.currentPage}
                                                                onClick={() => searchProfileOnGivenPage(page)}>
                                                                {page}
                                                            </button>
                                                        </Grid>
                                                    )
                                                })
                                            }

                                            <Grid item>
                                                <IconButton
                                                    disabled={search.currentPage >= totalPages}
                                                    onClick={() => searchProfileOnGivenPage(search.currentPage + 1)}
                                                    >
                                                    <ChevronRight />
                                                </IconButton>
                                            </Grid>
                                        </Grid>

                                        <Grid container justify="center">
                                            <Grid item>
                                                <Trans values={{
                                                    from: (search.currentPage * search.limit) - search.limit + 1,
                                                    to: search.currentPage * search.limit > search.resultsTotal ? search.resultsTotal : (search.currentPage * search.limit),
                                                    total: search.resultsTotal
                                                }}>
                                                    global.shownFromToOfTotal
                                                </Trans>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            ) : (null)
                        }
                    </Drawer>
                </React.Fragment>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: selectAccount(state),
        pages: selectPages(state),
        totalPages: selectTotalPages(state),
        search: selectSearch(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSearchVisiblity() {
            return dispatch(toggleSearchVisiblity());
        },
        searchProfile(e) {
            dispatch(setSearchQuery(e.target.value));

            return dispatch(fetchSearchList())
                .then((foundProfiles) => {
                    return dispatch(setSearchListResults(foundProfiles))
                });
        },
        searchProfileOnGivenPage(pageNumber) {
            dispatch(setSearchPage(pageNumber));

            return dispatch(fetchSearchList())
                .then((foundProfiles) => {
                    return dispatch(setSearchListResults(foundProfiles))
                });
        },
        logout() {
            history.push('/');

            return dispatch(unsetAccount());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
