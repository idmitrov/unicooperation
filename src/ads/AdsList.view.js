import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Grid
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
                                        <Grid item sm={4} key={index}>
                                            <Card>
                                                <CardHeader title={adItem.title} />

                                                <CardContent>
                                                    {adItem.content}
                                                </CardContent>

                                                {
                                                    loggedAccountType === accountType.student ? (
                                                        <CardActions>
                                                            <Button disabled={adItem.applied} onClick={() => applyToAd(adItem)}>Apply</Button>
                                                        </CardActions>
                                                    ) : loggedAccountType === accountType.partner ? (
                                                        <CardActions>
                                                            <Button>Edit</Button>
                                                        </CardActions>
                                                    ) : (null)
                                                }
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
