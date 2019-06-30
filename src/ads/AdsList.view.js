import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Grid,
    Paper,
    Typography
} from '@material-ui/core';

import '../app/App.scss';

import {
    fetchMyads,
    fetchMyUniversityPartnersAds,
    setAdsList
} from './Ads.actions';

import { accountType } from '../account/Account.constants';

class AdsListView extends Component {
    constructor(props) {
        super(props);

        switch (this.props.accountType) {
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
        const { ads } = this.props;

        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    {
                        ads.map((adItem, index) => {
                            return (
                                <Paper className="page-row" key={index}>
                                    <Typography variant="h6">{adItem.title}</Typography>

                                    {adItem.content}
                                </Paper>
                            );
                        })
                    }
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accountType: state.account.type,
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
