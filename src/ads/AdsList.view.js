import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';

import {
    Button,
    Card,
    CardHeader,
    CardActions,
    Grid,
    Typography
} from '@material-ui/core';

import '../app/App.scss';

import {
    fetchMyads,
    fetchMyUniversityPartnersAds,
    setAdsList,
    applyToAd,
    updateAdsList
} from './Ads.actions';

import { accountType } from '../account/Account.constants';

class AdsListView extends Component {
    constructor(props) {
        super(props);

        switch (this.props.loggedAccountType) {
            case accountType.student:
                this.props.fetchMyUniversityPartnersAds();
                break;
            case accountType.partner:
                this.props.fetchMyads();
                break;
            default: console.error('Unknown accountType');
        }
    }

    render() {
        const {
            ads,
            loggedAccountType,
            applyToAd
        } = this.props;

        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    <div className="page-row">
                        <Grid container spacing={16}>
                            {
                                ads.map((adItem, index) => {
                                    return (
                                        <Grid item xs={12} sm={6} key={index}>
                                            <Card>
                                                <CardHeader title={
                                                    <Typography variant="h6">
                                                        {
                                                            adItem.title.length < 17
                                                                ? adItem.title
                                                                : `${adItem.title.substring(0, 17)}...`
                                                        }
                                                    </Typography>
                                                } />

                                                <CardActions>
                                                    <Button fullWidth>Details</Button>
                                                    {
                                                        loggedAccountType === accountType.student ? (
                                                            <Button
                                                                disabled={adItem.applied}
                                                                fullWidth
                                                                onClick={() => applyToAd(adItem)}>
                                                                <Trans>{adItem.applied ? 'ads.list.item.applied' : 'ads.list.item.apply' }</Trans>
                                                            </Button>
                                                        ) : loggedAccountType === accountType.partner ? (
                                                            <Button
                                                                fullWidth>
                                                                <Trans>ads.list.item.edit</Trans>
                                                            </Button>
                                                        ) : (null)
                                                    }
                                                </CardActions>

                                            </Card>
                                        </Grid>
                                    );
                                })
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
        loggedAccountType: state.account.type,
        ads: state.ads.list
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        applyToAd(adToApply) {
            if (!adToApply.applied) {
                return dispatch(applyToAd(adToApply._id))
                    .then((ad) => {
                        return dispatch(updateAdsList(ad));
                    });
            }
        },
        fetchMyUniversityPartnersAds() {
            return dispatch(fetchMyUniversityPartnersAds())
                .then((ads) => {
                    return dispatch(setAdsList(ads.list));
                });
        },
        fetchMyads() {
            return dispatch(fetchMyads())
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
