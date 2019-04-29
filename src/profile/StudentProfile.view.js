import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    Grid,
    TextField,
    Tooltip,
    IconButton,
    Avatar
} from '@material-ui/core';

import {
    VerifiedUser,
    MoreHoriz
} from '@material-ui/icons';

import { Trans, Translation } from 'react-i18next';

import {
    fetchMyProfile,
    setMyProfile,
    updateMyProfile
} from './Profile.actions';

import './Profile.scss';

class StudentProfileView extends Component {
    constructor(props) {
        super(props);

        this.props.getMyProfile();
    }

    render() {
        const { profile, account, handleProfileUpdate } = this.props;

        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6}>
                    <div className="profile-header">
                        <div className="profile-header-actions">
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Tooltip
                                        title={<Trans>global.more</Trans>}
                                        placement="left">
                                        <IconButton>
                                            <MoreHoriz />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </div>

                        <Grid container spacing={16} alignItems="center">
                            <Grid item>
                                <div className="profile-avatar">
                                    <div className={`profile-status ${profile.verified ? 'profile-status-verified' : ''}`}>
                                        <Tooltip
                                            placement="right"
                                            title={profile.verified ? 'Verified' : 'Unverified'}>
                                            <VerifiedUser />
                                        </Tooltip>
                                    </div>

                                    <Translation>
                                        {
                                            (t) => {
                                                return(
                                                    <div className="profile-avatar-image" data-hover-text={t('global.edit')}>
                                                        <img
                                                            src={account.avatar || `${process.env.PUBLIC_URL}/avatar-default.png`}
                                                            alt="User avatar"
                                                        />
                                                    </div>
                                                )
                                            }
                                        }
                                    </Translation>

                                    <p className="profile-avatar-text">
                                        {profile.firstName}
                                    </p>
                                </div>
                            </Grid>

                            <Grid item xs={true}>
                                <Grid container alignItems="center">
                                    <Grid item xs={true}>
                                        <TextField
                                            name="summary"
                                            label={<Trans>student.summary.label</Trans>}
                                            value={profile.summary || ''}
                                            multiline
                                            fullWidth
                                            rowsMax="2"
                                            onChange={handleProfileUpdate}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>

                    <div className="profile-row">
                        <Grid container spacing={16}>
                            <Grid item xs={12}>
                                <TextField
                                    label={<Trans>student.facultyId.label</Trans>}
                                    name="facultyId"
                                    value={profile.facultyId || ''}
                                    fullWidth
                                    onChange={handleProfileUpdate}
                                />
                            </Grid>
                        </Grid>
                    </div>

                    <div className="profile-row">
                        <Grid container spacing={16}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    label={<Trans>student.firstName.label</Trans>}
                                    name="firstName"
                                    value={profile.firstName || ''}
                                    fullWidth
                                    onChange={handleProfileUpdate}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    label={<Trans>student.middleName.label</Trans>}
                                    name="middleName"
                                    value={profile.middleName || ''}
                                    fullWidth
                                    onChange={handleProfileUpdate}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField
                                    label={<Trans>student.lastName.label</Trans>}
                                    name="lastName"
                                    value={profile.lastName || ''}
                                    fullWidth
                                    onChange={handleProfileUpdate}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        account: state.account
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleProfileUpdate(e) {
            const { name, value } = e.target;

            return dispatch(updateMyProfile(name, value));
        },
        getMyProfile() {
            return dispatch(fetchMyProfile())
                .then((profileData) => {
                    return dispatch(setMyProfile(profileData));
                });
        }
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(StudentProfileView)
);
