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
            university: null,
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
        const {
            account,
            createStudentSetup,
            filterUniversity,
            universities
        } = this.props;

        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    createStudentSetup(this.state.firstName, this.state.facultyId, this.state.university, account);
                }}>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6} lg={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <div className="page-row">
                                        <Typography variant="h5">
                                            <Trans>setup.student.title</Trans>
                                        </Typography>
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className="page-row">
                                        <TextField
                                            type="text"
                                            name="firstName"
                                            value={this.state.firstName || ''}
                                            label={<Trans>student.firstName.label</Trans>}
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
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className="page-row">
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
                                                            university: university._id
                                                        });
                                                    }}>
                                                        {university.name}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className="page-row">
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
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className="page-row">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={!this.state.facultyId || !this.state.firstName || !this.state.university}>
                                            <Trans>global.proceed</Trans>
                                        </Button>
                                    </div>
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
        account: state.account,
        universities: state.shared.universities
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createStudentSetup(name, facultyId, university, account) {
            return dispatch(createStudentSetup(name, facultyId, university))
                .then((data) => {
                    const updatedAccount = { ...account, profile: data.account.profile };

                    return dispatch(setAccount(updatedAccount));
                });
        },
        filterUniversity(name) {
            return dispatch(filterUniversity(name))
                .then((universities) => {
                    return dispatch(setUniversityFilter(universities.list));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentSetupView);
