import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMyProfile, setMyProfile } from './Profile.actions';

class ProfileView extends Component {
    constructor(props) {
        super(props);

        this.props.fetchMyProfile();
    }

    render() {
        const { profile } = this.props;

        return (
            <div>
                <h2>Profile</h2>
                <p>{`Welcome ${profile.name}`}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
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
