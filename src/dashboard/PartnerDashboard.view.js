import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

import {
    Button,
    Grid,
    IconButton,
    Typography,
    Tooltip
} from '@material-ui/core';

import {
    Visibility,
    GroupWork,
    AddCircle
} from '@material-ui/icons';

import './PartnerDashboard.scss';
import ProfileIntroCard from '../components/profile-intro-card/ProfileIntroCard.component';

import { getMatches, setMatches } from '../matcher/Matcher.actions';

class PartnerDashboardView extends Component {
    constructor(props) {
        super(props);

        this.props.getTopMathes();
    }

    render() {
        const {
            matches,
            ads
        } = this.props;

        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    <div className="page-row">
                        <Typography variant="h5">
                            <Trans>dashboard.title</Trans>
                        </Typography>
                    </div>

                    <div className="page-row">
                        <Grid container>
                            <Grid item xs={true}>
                                <Typography variant="h6">
                                    <Trans>dashboard.matches.title</Trans>
                                </Typography>
                            </Grid>
                        </Grid>

                        <div className="matches-grid">
                            <Grid container spacing={16}>
                                {
                                    matches.length ? (
                                        matches.map((match, index) => {
                                            return (
                                                <Grid item xs={12} sm={6} key={index}>
                                                    <ProfileIntroCard
                                                        avatar={match.avatar}
                                                        title={match.firstName}
                                                        subtitle={match.title}
                                                        hoverText={
                                                            <Trans values={{
                                                                profileName: match.firstName.length < 15
                                                                    ? match.firstName
                                                                    : `${match.firstName.substring(0, 14)}...`
                                                            }}>
                                                                match.profile.intro
                                                            </Trans>
                                                        }
                                                        actions={
                                                            <React.Fragment>
                                                                <Tooltip title={<Trans>match.profile.view</Trans>}>
                                                                    <Link to={`profile/${match.account.type}/${match._id}`}>
                                                                        <IconButton className="match-icon-button">
                                                                            <Visibility className="match-icon" />
                                                                        </IconButton>
                                                                    </Link>
                                                                </Tooltip>

                                                                <Tooltip title={<Trans>match.profile.invite</Trans>}>
                                                                    <IconButton className="match-icon-button">
                                                                        <GroupWork className="match-icon" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </Grid>
                                            )
                                        })
                                    ) : (
                                        <Trans>dashboard.matches.noData</Trans>
                                    )
                                }

                                <Grid item xs={12}>
                                    <Link to="/matches">
                                        <Button variant="text">
                                            <Trans>dashboard.viewAll</Trans>
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    <div className="page-row">
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item xs={true}>
                                <Typography variant="h6">
                                    <Trans>dashboard.ads.title</Trans>
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Link to="/ads/create">
                                    <Tooltip title="Create ad">
                                        <IconButton>
                                            <AddCircle />
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                            </Grid>
                        </Grid>

                        {
                            ads.length ? (
                                null
                            ) : (
                                <Trans>dashboard.ads.noData</Trans>
                            )
                        }

                        <Grid container>
                            <Grid item>
                                <Link to="/ads/list">
                                    <Button variant="text">
                                        <Trans>dashboard.viewAll</Trans>
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        matches: state.matcher.matches.slice(0, 2),
        ads: []
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTopMathes() {
            return dispatch(getMatches())
                .then((matches) => {
                    return dispatch(setMatches(matches.list));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerDashboardView);
