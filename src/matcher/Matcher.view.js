import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';

import {
    AppBar,
    Grid,
    IconButton,
    TextField,
    Tooltip
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
    setMatcherTitle
} from './Matcher.actions';

class MatcherView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInputExpanded: false,
            searchQuery: ''
        };

        this.props.getMatches();
    }

    render() {
        const {
            title,
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
                    </div>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.matcher.title
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
                    return dispatch(setMatches(matches.list));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (MatcherView);