import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';

import {
    AppBar,
    Card,
    CardHeader,
    CardContent,
    Grid,
    IconButton,
    TextField,
    Tooltip,
    Avatar
} from '@material-ui/core';

import {
    FilterList,
    Close,
    Done
} from '@material-ui/icons';

import '../app/App.scss';

import {
    getMatches,
    setMatches,
    setMatcherTotal,
    setMatcherTitle
} from './Matcher.actions';

class MatcherView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInputExpanded: false,
            searchQuery: ''
        };
    }

    render() {
        const {
            title,
            matches,
            setTitle,
            getMatches
        } = this.props;

        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    <div>
                        <AppBar
                            className="top-bar"
                            position="sticky">
                            <form onSubmit={(e) => {
                                e.preventDefault();

                                // TODO: Apply filter and call API with the filter

                                this.setState({
                                    ...this.state,
                                    isInputExpanded: !this.state.isInputExpanded,
                                });
                            }}>
                                <div className={`bar-input ${this.state.isInputExpanded ? 'expanded' : ''}`}>
                                    <div className="bar-input-inner">
                                        <Grid container alignItems="center" spacing={16}>
                                            <Grid item xs={4}>
                                                <TextField
                                                    type="number"
                                                    label="Experience"
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>

                                <Grid container justify="space-between" alignItems="center">
                                    <Grid item xs={true}>
                                        {
                                            this.state.isInputExpanded ? (
                                                <div>
                                                    <Tooltip title={<Trans>global.cancel</Trans>} placement="right">
                                                        <IconButton
                                                            type="button"
                                                            onClick={() => this.setState({ ...this.state, isInputExpanded: false })}>
                                                            <Close />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            ) : (
                                                <TextField
                                                    label="Title"
                                                    value={title}
                                                    fullWidth
                                                    onChange={(e) => {
                                                        setTitle(e.target.value);
                                                        getMatches();
                                                    }}
                                                />
                                            )
                                        }
                                    </Grid>

                                    <Grid item>
                                        {
                                            this.state.isInputExpanded ? (
                                                <Tooltip title={<Trans>global.apply</Trans>} placement="left">
                                                    <IconButton type="button" onClick={() => this.setState({ ...this.state, isInputExpanded: false, searchQuery: '' })}>
                                                        <Done />
                                                    </IconButton>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title={<Trans>global.filter</Trans>} placement="left">
                                                    <IconButton type="button" onClick={() => this.setState({ ...this.state, isInputExpanded: true, searchQuery: '' })}>
                                                        <FilterList />
                                                    </IconButton>
                                                </Tooltip>
                                            )
                                        }
                                    </Grid>
                                </Grid>
                            </form>
                        </AppBar>

                        <Grid container className="page-row" spacing={16}>
                            {
                                matches.map((match, index) => {
                                    return(
                                        <Grid item key={index} xs={12} sm={4}>
                                            <Card>
                                                <CardContent>
                                                    <Grid container justify="center">
                                                        <Grid item>
                                                            {
                                                                match.avatar ? (
                                                                    <Avatar src={match.avatar} />
                                                                ) : (
                                                                    <Avatar>{match.firstName[0]}</Avatar>
                                                                )
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>

                                                <CardHeader
                                                    title={match.firstName}
                                                    subheader={match.title}
                                                    titleTypographyProps={{align: 'center'}}
                                                    subheaderTypographyProps={{align: 'center'}}
                                                />
                                            </Card>
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.matcher.title,
        matches: state.matcher.matches
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTitle(titleValue) {
            return dispatch(setMatcherTitle(titleValue));
        },
        getMatches() {
            return dispatch(getMatches())
                .then((matches) => {
                    dispatch(setMatcherTotal(matches.total));

                    return dispatch(setMatches(matches.list));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (MatcherView);
