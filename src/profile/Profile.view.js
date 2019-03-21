import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Grid
} from '@material-ui/core';

import { fetchMyProfile, setMyProfile } from './Profile.actions';
import './Profile.scss';

class ProfileView extends Component {
    constructor(props) {
        super(props);

        this.props.fetchMyProfile();
    }

    render() {
        const { profile, account } = this.props;

        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} className="feed-content">
                    <div className="profile-welcome">
                        <div className="profile-avatar">
                            <img
                                className="profile-avatar-image"
                                src={account.avatar || `${process.env.PUBLIC_URL}/avatar-default.png`}
                                alt="User avatar"
                            />

                            <p className="profile-avatar-text">
                                {`${profile.name}`}
                            </p>
                        </div>
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
)(ProfileView);
