import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

import {
    Grid,
    IconButton,
    Tooltip,
    Typography
} from '@material-ui/core';

import {
    Visibility,
    Edit
} from '@material-ui/icons';

import '../app/App.scss';

import { grid } from '../app/App.constants';

import {
    fetchMyAds,
    fetchMyUniversityPartnersAds,
    setAdsList
} from './Ads.actions';

import UniIntroCard from '../components/uni-intro-card/UniIntroCard.component';

import { accountType } from '../account/Account.constants';

import './Ads.scss';

class AdsListView extends Component {
    constructor(props) {
        super(props);

        switch (this.props.loggedInAccount.type) {
            case accountType.student:
                this.props.fetchMyUniversityPartnersAds();
                break;
            case accountType.partner:
                this.props.fetchMyAds();
                break;
            default: console.error('Fetch Ads -> Unknown accountType');
        }
    }

    render() {
        const {
            ads,
            loggedInAccount
        } = this.props;

        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    <div className="page-row">
                        <Typography variant="h5">
                            <Trans>ads.list.title</Trans>
                        </Typography>
                    </div>

                    <div className="ads-grid page-row">
                        <Grid container spacing={grid.spacing}>
                            {
                                ads && ads.length ? (
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
                                                                    <IconButton className="ad-icon-button">
                                                                        <Visibility className="ad-icon" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Link>

                                                            {
                                                                loggedInAccount.type === accountType.partner &&
                                                                loggedInAccount.profile === adItem.author ? (
                                                                    <Link to={`/ads/edit/${adItem._id}`}>
                                                                        <Tooltip title={<Trans>ads.list.item.edit</Trans>}>
                                                                            <IconButton className="ad-icon-button">
                                                                                <Edit className="ad-icon" />
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
                                    <Grid item>
                                        <Trans>ads.list.noData</Trans>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInAccount: state.account,
        ads: state.ads.list
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMyUniversityPartnersAds() {
            return dispatch(fetchMyUniversityPartnersAds())
                .then((ads) => {
                    return dispatch(setAdsList(ads.list));
                });
        },
        fetchMyAds() {
            return dispatch(fetchMyAds())
                .then((ads) => {
                    return dispatch(setAdsList(ads.list));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdsListView);
