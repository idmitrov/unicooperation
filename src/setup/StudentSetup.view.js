import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Grid,
    TextField,
    Typography,
    Button,
    MenuItem
} from '@material-ui/core';

import { Trans } from 'react-i18next';

import { createStudentSetup } from './Setup.actions.js';
import { filterUniversity, setUniversityFilter } from '../shared/shared.actions';
import { setAccount } from '../account/Account.actions';

class StudentSetupView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            facultyId: null,
            universityId: null,
            universityName: null,
            isFirstNameDirty: true,
            isFacultyIdDirty: true,
            isUniversityNameDirty: true
        };

        this.handleSetupInputChange = this.handleSetupInputChange.bind(this);
    }

    handleSetupInputChange(e, cb) {
        const { name, value } = e.target;

        this.setState({ [name]: value }, cb ? cb : null);
    }

    render() {
        const { createStudentSetup, filterUniversity, universities } = this.props;

        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    createStudentSetup(this.state.firstName, this.state.facultyId, this.state.universityId);
                }}>
                    <Grid container justify="center">
                        <Grid item sm={8} md={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        <Trans>setup.student.title</Trans>
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        name="firstName"
                                        value={this.state.firstName || ''}
                                        label={<Trans>student.name.label</Trans>}
                                        error={!this.state.isFirstNameDirty && !this.state.firstName}
                                        required
                                        fullWidth
                                        onFocus={() => {
                                            if (this.state.isFirstNameDirty) {
                                                this.setState({ ...this.state, isFirstNameDirty: false });
                                            }
                                        }}
                                        onChange={this.handleSetupInputChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="search"
                                        name="universityName"
                                        value={this.state.universityName || ''}
                                        label={<Trans>student.university.label</Trans>}
                                        required
                                        fullWidth
                                        onFocus={() => {
                                            if (this.state.isFirstNameDirty) {
                                                this.setState({ ...this.state, isUniversityNameDirty: false });
                                            }
                                        }}
                                        onChange={(e) => this.handleSetupInputChange(e, () => filterUniversity(this.state.universityName))}
                                    />
                                        {
                                            universities.map((university) => {
                                                return (
                                                    <MenuItem key={university.name} onClick={(e) => {
                                                        this.setState({
                                                            ...this.state,
                                                            universityName: university.name,
                                                            universityId: university._id
                                                        });
                                                    }}>
                                                        {university.name}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        name="facultyId"
                                        value={this.state.facultyId || ''}
                                        label={<Trans>student.facultyId.label</Trans>}
                                        error={!this.state.isFacultyIdDirty && !this.state.facultyId}
                                        required
                                        fullWidth
                                        onFocus={() => {
                                            if (this.state.isFacultyIdDirty) {
                                                this.setState({ ...this.state, isFacultyIdDirty: false });
                                            }
                                        }}
                                        onChange={this.handleSetupInputChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={!this.state.facultyId || !this.state.firstName || !this.state.universityId}>
                                        Proceed
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        universities: state.shared.universities
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createStudentSetup(name, facultyId, universityId) {
            return dispatch(createStudentSetup(name, facultyId, universityId))
                .then((data) => {
                    return dispatch(setAccount(data.account));
                });
        },
        filterUniversity(name) {
            return dispatch(filterUniversity(name))
                .then((universities) => {
                    return dispatch(setUniversityFilter(universities));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentSetupView);
