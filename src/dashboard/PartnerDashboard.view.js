import React, { Component, Fragment } from 'react';
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
    AddCircle,
    Edit,
    Visibility,
    GroupWork
} from '@material-ui/icons';

import { grid } from '../app/App.constants';

import UniTitle from '../components/uni-title/UniTitle.component';

import './PartnerDashboard.scss';
import UniIntroCard from '../components/uni-intro-card/UniIntroCard.component';

import { accountType } from '../account/Account.constants';
import { getMatches, setMatches } from '../matcher/Matcher.actions';
import { fetchMyAds, fetchMyUniversityPartnersAds, setAdsList } from '../ads/Ads.actions';
import { fetchMineInterviews, setInterviewsList } from '../interview/Interview.actions';

import { selectAccount } from '../account/Account.selector';

import {
    selectTopInterviews,
    selectTopAds,
    selectoTopMatches
} from './Dashboard.selector';

class PartnerDashboardView extends Component {
    constructor(props) {
        super(props);

        this.props.getTopInterviews();

        switch (this.props.loggedInAccount.type) {
            case accountType.partner:
                this.props.getTopMathes();
                this.props.getTopAds();
                break;
            case accountType.student:
                this.props.getTopMyUniversityPartnersAds()
                break;
            default: console.error('Fetch Dashboard -> Unknown account type');
        }
    }

    render() {
        const {
            matches,
            ads,
            interviews,
            loggedInAccount
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
                                <UniTitle>
                                    <Trans>dashboard.matches.title</Trans>
                                </UniTitle>
                            </Grid>
                        </Grid>

                        <div className="dashboard-grid">
                            <Grid container spacing={grid.spacing}>
                                {
                                    matches.length ? (
                                        matches.map((match, index) => {
                                            return (
                                                <Grid item xs={12} sm={6} key={index}>
                                                    <UniIntroCard
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
                                                            <Fragment>
                                                                <Link to={`profile/${match.account.type}/${match._id}`}>
                                                                    <Tooltip title={<Trans>match.profile.view</Trans>}>
                                                                        <IconButton className="dashboard-grid-icon-button">
                                                                            <Visibility className="dashboard-grid-icon" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Link>

                                                                <Tooltip title={<Trans>match.profile.invite</Trans>}>
                                                                    <IconButton className="dashboard-grid-icon-button">
                                                                        <GroupWork
                                                                            className="dashboard-grid-icon"
                                                                        />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Fragment>
                                                        }
                                                    />
                                                </Grid>
                                            )
                                        })
                                    ) : (
                                        <Grid item xs={12}>
                                            <Trans>dashboard.matches.noData</Trans>
                                        </Grid>
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
                                <UniTitle>
                                    <Trans>dashboard.ads.title</Trans>
                                </UniTitle>
                            </Grid>
                        </Grid>

                        <div className="dashboard-grid">
                            <Grid container spacing={grid.spacing}>
                                {
                                    ads.length ? (
                                        ads.map((adItem, index) => {
                                            return (
                                                <Grid item xs={12} sm={6} key={index}>
                                                    <UniIntroCard
                                                        avatar={adItem.conver}
                                                        title={
                                                            adItem.title.length < 17
                                                                ? adItem.title
                                                                : `${adItem.title.substring(0, 17)}...`
                                                        }
                                                        hoverText={
                                                            <Trans>ads.list.item.intro</Trans>
                                                        }
                                                        actions={
                                                            <Fragment>
                                                                <Link to={`/ads/details/${adItem._id}`}>
                                                                    <Tooltip title={<Trans>ads.list.item.details</Trans>}>
                                                                        <IconButton className="dashboard-grid-icon-button">
                                                                            <Visibility className="dashboard-grid-icon" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Link>
                                                                {
                                                                    loggedInAccount.type === accountType.partner &&
                                                                    loggedInAccount.profile === adItem.author ? (
                                                                        <Link to={`/ads/edit/${adItem._id}`}>
                                                                            <Tooltip title={<Trans>ads.list.item.edit</Trans>}>
                                                                                <IconButton className="dashboard-grid-icon-button">
                                                                                    <Edit className="dashboard-grid-icon" />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        </Link>
                                                                    ) :(null)
                                                                }
                                                            </Fragment>
                                                        }
                                                    />
                                                </Grid>
                                            )
                                        })
                                    ) : (
                                        <Grid item xs={12}>
                                            <Trans>dashboard.ads.noData</Trans>
                                        </Grid>
                                    )
                                }
                            </Grid>

                            <Grid container style={{marginTop: 15}}>
                                <Grid item xs={true}>
                                    <Link to="/ads/list">
                                        <Button variant="text">
                                            <Trans>dashboard.viewAll</Trans>
                                        </Button>
                                    </Link>
                                </Grid>

                                <Grid item>
                                    <Link to="/ads/create">
                                        <Tooltip title={<Trans>ads.instance.create</Trans>}>
                                            <IconButton>
                                                <AddCircle />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    <div className="page-row">
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item xs={true}>
                                <UniTitle>
                                    <Trans>dashboard.interviews.title</Trans>
                                </UniTitle>
                            </Grid>
                        </Grid>

                        <div className="dashboard-grid">
                            <Grid container spacing={grid.spacing}>
                                {
                                    interviews.length ? (
                                        interviews.map((interviewItem, index) => {
                                            return (
                                                <Grid item xs={12} sm={6} key={index}>
                                                    <UniIntroCard
                                                        title={
                                                            interviewItem.title.length < 17
                                                                ? interviewItem.title
                                                                : `${interviewItem.title.substring(0, 17)}...`
                                                        }
                                                        hoverText={
                                                            <Trans>interview.list.item.intro</Trans>
                                                        }
                                                        actions={
                                                            <Fragment>
                                                                <Link to={`/interview/details/${interviewItem._id}`}>
                                                                    <Tooltip title={<Trans>interview.list.item.details</Trans>}>
                                                                        <IconButton className="dashboard-grid-icon-button">
                                                                            <Visibility className="dashboard-grid-icon" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Link>
                                                                {
                                                                    loggedInAccount.type === accountType.partner &&
                                                                    loggedInAccount.profile === interviewItem.interviewer ? (
                                                                        <Link to={`/interview/edit/${interviewItem._id}`}>
                                                                            <Tooltip title={<Trans>interview.list.item.edit</Trans>}>
                                                                                <IconButton className="dashboard-grid-icon-button">
                                                                                    <Edit className="dashboard-grid-icon" />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        </Link>
                                                                    ) :(null)
                                                                }
                                                            </Fragment>
                                                        }
                                                    />
                                                </Grid>
                                            )
                                        })
                                    ) : (
                                        <Grid item xs={12}>
                                            <Trans>dashboard.interviews.noData</Trans>
                                        </Grid>
                                    )
                                }
                            </Grid>

                            <Grid container style={{marginTop: 15}}>
                                <Grid item xs={true}>
                                    <Link to="/interview/list">
                                        <Button variant="text">
                                            <Trans>dashboard.viewAll</Trans>
                                        </Button>
                                    </Link>
                                </Grid>

                                <Grid item>
                                    <Link to="/interview">
                                        <Tooltip title={<Trans>interview.create</Trans>}>
                                            <IconButton>
                                                <AddCircle />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInAccount: selectAccount(state),
        matches: selectoTopMatches(state),
        interviews: selectTopInterviews(state),
        ads: selectTopAds(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTopInterviews() {
            return dispatch(fetchMineInterviews())
                .then((interviews) => {
                    return dispatch(setInterviewsList(interviews));
                });
        },
        getTopAds() {
            return dispatch(fetchMyAds())
                .then((ads) => {
                    return dispatch(setAdsList(ads.list));
                });
        },
        getTopMathes() {
            return dispatch(getMatches())
                .then((matches) => {
                    return dispatch(setMatches(matches.list));
                });
        },
        getTopMyUniversityPartnersAds() {
            return dispatch(fetchMyUniversityPartnersAds())
                .then((ads) => {
                    return dispatch(setAdsList(ads.list));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerDashboardView);
