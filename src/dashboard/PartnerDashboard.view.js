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
    Edit,
    GroupWork,
    Visibility,
    AddCircle
} from '@material-ui/icons';

import UniTitle from '../components/uni-title/UniTitle.component';

import './PartnerDashboard.scss';
import UniIntroCard from '../components/uni-intro-card/UniIntroCard.component';

import { getMatches, setMatches } from '../matcher/Matcher.actions';
import { fetchMyAds, fetchMyUniversityPartnersAds, setAdsList } from '../ads/Ads.actions';
import { accountType } from '../account/Account.constants';

class PartnerDashboardView extends Component {
    constructor(props) {
        super(props);

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
                            <Grid container spacing={16}>
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
                                                            <React.Fragment>
                                                                    <Link to={`profile/${match.account.type}/${match._id}`}>
                                                                        <Tooltip title={<Trans>match.profile.view</Trans>}>
                                                                            <IconButton className="dashboard-grid-icon-button">
                                                                                <Visibility className="dashboard-grid-icon" />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Link>

                                                                <Tooltip title={<Trans>match.profile.invite</Trans>}>
                                                                    <IconButton className="dashboard-grid-icon-button">
                                                                        <GroupWork className="dashboard-grid-icon" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </React.Fragment>
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
                            <Grid container spacing={16}>
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
                                                            <React.Fragment>
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
                                                            </React.Fragment>
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
                                        <Tooltip title="Create ad">
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
        loggedInAccount: state.account,
        matches: state.matcher.matches.slice(0, 2),
        ads: state.ads.list.slice(0, 2)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
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
