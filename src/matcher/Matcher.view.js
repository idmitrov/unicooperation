import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    AppBar,
    FormControl,
    Grid,
    InputLabel,
    IconButton,
    MenuItem,
    Select,
    TextField,
    Tooltip
} from '@material-ui/core';

import {
    FilterList,
    Close,
    Done
} from '@material-ui/icons';

import { Trans } from 'react-i18next';

import '../app/App.scss';

class MatcherView extends Component {
    constructor() {
        super();

        this.state = {
            isInputExpanded: false,
            searchQuery: ''
        };
    }

    render() {
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

                                            <Grid item xs={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel htmlFor="availability">Availability</InputLabel>

                                                    <Select
                                                        value='any'
                                                        inputProps={{
                                                            name: 'availability',
                                                            id: 'availability',
                                                        }}>
                                                        <MenuItem value={'any'}>Any</MenuItem>
                                                        <MenuItem value={'remote'}>Remote</MenuItem>
                                                        <MenuItem value={'office'}>Office</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={4}>
                                                <FormControl fullWidth>
                                                    <InputLabel htmlFor="availability">Status</InputLabel>

                                                    <Select
                                                        multiple
                                                        value={['unemployed']}
                                                        inputProps={{
                                                            name: 'availability',
                                                            id: 'availability',
                                                        }}>
                                                        <MenuItem value={'unemployed'}>Unemployed</MenuItem>
                                                        <MenuItem value={'interested'}>Interested</MenuItem>
                                                    </Select>
                                                </FormControl>
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
                                                    value={this.state.searchQuery}
                                                    fullWidth
                                                    onChange={(e) => this.setState({ ...this.state, searchQuery: e.target.value })}
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

const mapStateToProps = () => {
    return {};
}

const mapDispatchToProps = () => {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (MatcherView);
