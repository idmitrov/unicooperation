import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    Grid,
    TextField,
    Tooltip,
    IconButton,
    InputAdornment,
    Typography
} from '@material-ui/core';

import {
    VerifiedUser,
    Edit,
    Save,
    Cancel
} from '@material-ui/icons';

import { Trans } from 'react-i18next';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    fetchMyProfile,
    setMyProfile,
    updateMyProfile,
    updateMyProfileAvatar,
    setMyProfileData,
    toggleMyProfileReadonly
} from './Profile.actions';

import './Profile.scss';

class StudentProfileView extends Component {
    constructor(props) {
        super(props);

        this.props.getMyProfile();
    }

    render() {
        const {
            profile,
            changeProfileReadonly,
            handleProfileChange,
            handleProfileAvatarChange,
            updateMyProfile
        } = this.props;

        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={5}>
                    <div className={`profile-header ${profile.isReadonly ? 'readonly' : ''}`}>
                        {/* PROFILE HEADER ACTIONS */}
                        <div className="profile-header-actions">
                            <Grid container justify="flex-end">
                                {
                                    profile.isReadonly ? (
                                        <Grid item>
                                            <Tooltip title={<Trans>global.edit</Trans>} placement="left">
                                                <IconButton onClick={changeProfileReadonly}>
                                                    <Edit />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    ) : (
                                        <React.Fragment>
                                            <Grid item>
                                                <Tooltip title={<Trans>global.save</Trans>} placement="left">
                                                    <IconButton onClick={() => updateMyProfile(profile)}>
                                                        <Save />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>

                                            <Grid item>
                                                <Tooltip title={<Trans>global.cancel</Trans>} placement="left">
                                                    <IconButton onClick={changeProfileReadonly}>
                                                        <Cancel />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>
                                        </React.Fragment>
                                    )
                                }
                            </Grid>
                        </div>

                        {/* PROFILE HEADER AVATAR */}
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

                                    <div className={`profile-avatar-image ${profile.isReadonly ? 'readonly' : ''}`}>
                                        <label htmlFor="profile-avatar-input" className="profile-avatar-label">
                                            <Trans>global.edit</Trans>
                                        </label>

                                        <input
                                            type="file"
                                            name="avatar"
                                            id="profile-avatar-input"
                                            className="profile-avatar-input"
                                            disabled={profile.isReadonly}
                                            onChange={handleProfileAvatarChange}
                                        />

                                        <img
                                            src={profile.avatar || `${process.env.PUBLIC_URL}/avatar-default.png`}
                                            alt="User avatar"
                                        />
                                    </div>
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
                                            InputProps={{ readOnly: profile.isReadonly }}
                                            onChange={handleProfileChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* PERSONAL SECTION */}
                        <div className="page-row">
                            <Typography className="profile-title" variant="h6">
                                <Trans>student.personal.label</Trans>
                            </Typography>
                        </div>

                        <div className="page-row">
                            <Grid container spacing={16}>
                                {/* FIRST NAME */}
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label={<Trans>student.firstName.label</Trans>}
                                        name="firstName"
                                        value={profile.firstName || ''}
                                        variant="standard"
                                        InputProps={{ readOnly: profile.isReadonly }}
                                        fullWidth
                                        onChange={handleProfileChange}
                                    />
                                </Grid>

                                {/* MIDDLE NAME */}
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label={<Trans>student.middleName.label</Trans>}
                                        name="middleName"
                                        value={profile.middleName || ''}
                                        variant="standard"
                                        fullWidth
                                        InputProps={{ readOnly: profile.isReadonly }}
                                        onChange={handleProfileChange}
                                    />
                                </Grid>

                                {/* LAST NAME */}
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label={<Trans>student.lastName.label</Trans>}
                                        name="lastName"
                                        value={profile.lastName || ''}
                                        variant="standard"
                                        InputProps={{ readOnly: profile.isReadonly }}
                                        fullWidth
                                        onChange={handleProfileChange}
                                    />
                                </Grid>
                            </Grid>
                        </div>

                        {/* SOCIALS SECTION */}
                        <div className="page-row">
                            <Typography className="profile-title" variant="h6">
                                <Trans>student.socials.label</Trans>
                            </Typography>
                        </div>

                        <div className="page-row">
                            <Grid container>
                                {/* LINKEDIN */}
                                <Grid item xs={true}>
                                    <TextField
                                        label={<Trans>student.linkedin.label</Trans>}
                                        name="linkedinUrl"
                                        variant="outlined"
                                        value={profile.linkedinUrl || ''}
                                        InputProps={{
                                            readOnly: profile.isReadonly,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FontAwesomeIcon color="#0077b5" size="2x" icon={['fab', 'linkedin']}></FontAwesomeIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                        fullWidth
                                        onChange={handleProfileChange}
                                    />
                                </Grid>
                            </Grid>
                        </div>

                        {/* FACEBOOK */}
                        <div className="page-row">
                            <Grid container>
                                <Grid item xs={true}>
                                    <TextField
                                        label={<Trans>student.facebook.label</Trans>}
                                        name="facebookUrl"
                                        variant="outlined"
                                        value={profile.facebookUrl || ''}
                                        InputProps={{
                                            readOnly: profile.isReadonly,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FontAwesomeIcon color="#3b5998" size="2x" icon={['fab', 'facebook']}></FontAwesomeIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                        fullWidth
                                        onChange={handleProfileChange}
                                    />
                                </Grid>
                            </Grid>
                        </div>

                        {/* INSTAGRAM */}
                        <div className="page-row">
                            <Grid container>
                                <Grid item xs={true}>
                                    <TextField
                                        label={<Trans>student.instagram.label</Trans>}
                                        name="instagramUrl"
                                        variant="outlined"
                                        value={profile.instagramUrl || ''}
                                        InputProps={{
                                            readOnly: profile.isReadonly,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FontAwesomeIcon color="#405DE6" size="2x" icon={['fab', 'instagram']}></FontAwesomeIcon>
                                                </InputAdornment>
                                            )
                                        }}
                                        fullWidth
                                        onChange={handleProfileChange}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid>
            </Grid>
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
        handleProfileAvatarChange(e) {
            return dispatch(updateMyProfileAvatar( e.target.files[0]))
                .then((updatedProfile) => {
                    return dispatch(setMyProfile(updatedProfile));
                });
        },
        handleProfileChange(e) {
            return dispatch(setMyProfileData(e.target.name, e.target.value));
        },
        changeProfileReadonly() {
            return dispatch(toggleMyProfileReadonly());
        },
        updateMyProfile(updates) {
            return dispatch(updateMyProfile(updates))
                .then((updatedProfile) => {
                    return dispatch(setMyProfile(updatedProfile));
                });
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
