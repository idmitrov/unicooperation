import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Grid,
    TextField,
    Tooltip,
    IconButton
} from '@material-ui/core';

import {
    VerifiedUser,
    MoreHoriz
} from '@material-ui/icons';

import { Trans } from 'react-i18next';

import { fetchMyProfile, setMyProfile } from './Profile.actions';
import './Profile.scss';

class UniversityProfileView extends Component {
    constructor(props) {
        super(props);

        this.props.fetchMyProfile();
    }

    render() {
        const { profile, account } = this.props;

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

                                    <img
                                        className="profile-avatar-image"
                                        src={account.avatar || `${process.env.PUBLIC_URL}/avatar-default.png`}
                                        alt="User avatar"
                                    />

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
                                            label={<Trans>university.summary.label</Trans>}
                                            value={profile.summary || ''}
                                            multiline
                                            fullWidth
                                            rowsMax="2"
                                        // onChange={handleProfileUpdate}
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
                                    label={<Trans>university.name.label</Trans>}
                                    name="name"
                                    value={profile.name || ''}
                                    fullWidth
                                    // onChange={handleProfileUpdate}
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
        fetchMyProfile() {
            return dispatch(fetchMyProfile())
                .then((profileData) => {
                    return dispatch(setMyProfile(profileData));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UniversityProfileView);
