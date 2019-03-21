import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMyProfile } from './Profile.actions';

class ProfileView extends Component {
    constructor(props) {
        super(props);

        this.props.fetchMyProfile();
    }

    render() {
        return (
            <h2>Profile</h2>
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
                    console.log(profileData);
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileView);
