import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import {
    Button,
    Grid,
    TextField
} from '@material-ui/core';

import '../app/App.scss';

import {
    updateAdProp,
    createAd,
    resetAdInstance,
    fetchAdInstance,
    setAdInstance,
    applyToAd,
    updateAdsList
} from './Ads.actions';

import history from '../utils/history';

class AdsInstanceView extends Component {
    constructor(props) {
        super(props);

        const { adId, adDetailId } = this.props.match.params;

        this.state = {
            isCreation: adId === undefined && adDetailId === undefined,
            isReadonly: adId === undefined && adDetailId !== undefined,
            isEditing: adId !== undefined && adDetailId === undefined
        };

        if (this.state.isEditing || this.state.isReadonly) {
            this.props.getAdInstance(adId || adDetailId);
        }
    }

    componentWillUnmount() {
        this.props.resetAdInstance();
    }

    render() {
        const {
            isEditing,
            isReadonly,
            isCreation
        } = this.state;

        const {
            ad,
            account,
            createAd,
            applyToAd,
            adPropChanged
        } = this.props;

        return(
            <div className="page-row">
                <Grid container justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField
                            label={<Trans>ads.instance.create.title.label</Trans>}
                            name="title"
                            value={ad.title || ''}
                            InputProps={{readOnly: isReadonly}}
                            required
                            fullWidth
                            onChange={adPropChanged}
                        />

                        <TextField
                            label={<Trans>ads.instance.create.content.label</Trans>}
                            name="content"
                            value={ad.content || ''}
                            rows="5"
                            InputProps={{readOnly: isReadonly}}
                            multiline
                            required
                            fullWidth
                            onChange={adPropChanged}
                        />

                        {
                            isEditing ? (
                                <Button
                                    onClick={() => createAd(ad)}
                                    disabled={!ad.title || !ad.content}>
                                    <Trans>ads.instance.edit.button.label</Trans>
                                </Button>
                            ) : (null)
                        }

                        {
                            isCreation ? (
                                <Button
                                    onClick={() => createAd(ad)}
                                    disabled={!ad.title || !ad.content}>
                                    <Trans>ads.instance.create.button.label</Trans>
                                </Button>
                            ) : (null)
                        }

                        {
                            isReadonly ? (
                                <Button
                                    onClick={() => applyToAd(ad)}
                                    disabled={ad.applied}>
                                    <Trans>ads.instance.details.apply.utton.label</Trans>
                                </Button>
                            ) : (null)
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        ad: state.ads.instance
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        applyToAd(ad) {
            return dispatch(applyToAd(ad._id))
                .then((ad) => {
                    return dispatch(setAdInstance(ad));
                });
        },
        getAdInstance(adId) {
            return dispatch(fetchAdInstance(adId))
                .then((ad) => {
                    return dispatch(setAdInstance(ad));
                });
        },
        createAd(ad) {
            return dispatch(createAd(ad))
                .then(() => {
                    history.push('/ads/list');
                });
        },
        adPropChanged(e) {
            const { name, value } = e.target;

            return dispatch(updateAdProp(name, value));
        },
        resetAdInstance() {
            return dispatch(resetAdInstance());
        }
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AdsInstanceView)
);
