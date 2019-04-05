import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    Grid, Tooltip,
} from '@material-ui/core';

import {
    VerifiedUser
} from '@material-ui/icons';

import { fetchMyProfile, setMyProfile } from './Profile.actions';
import './Profile.scss';

class StudentProfileView extends Component {
    constructor(props) {
        super(props);

        this.props.fetchMyProfile();
    }

    render() {
        const { profile, account } = this.props;

        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} className="feed-content">
                    <div className="profile-header">
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
                                        {profile.name}
                                    </p>
                                </div>
                            </Grid>

                            <Grid item>
                                {profile.summary}
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

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(StudentProfileView)
);
