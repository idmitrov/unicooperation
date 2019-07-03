import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import {
    Button,
    Grid,
    TextField,
    IconButton,
    Tooltip
} from '@material-ui/core';


import {
    Save
} from '@material-ui/icons';

import '../app/App.scss';

import {
    updateAdProp,
    createAd,
    editAd,
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
            loggedInProfile,
            createAd,
            editAd,
            applyToAd,
            cancelAdApplication,
            adPropChanged
        } = this.props;

        return(
            <div className="page-row">
                <Grid container justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    label={<Trans>ads.instance.create.title.label</Trans>}
                                    name="title"
                                    value={ad.title || ''}
                                    InputProps={{readOnly: isReadonly}}
                                    required
                                    fullWidth
                                    onChange={adPropChanged}
                                />
                            </Grid>

                            <Grid item xs={12} style={{marginTop: 15}}>
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
                            </Grid>

                            <Grid item xs="auto" style={{marginTop: 15}}>

                                {
                                    isEditing ? (
                                        <Tooltip title={<Trans>ads.instance.edit.button.label</Trans>}>
                                            <div>
                                                <IconButton disabled={!ad.title || !ad.content} onClick={() => editAd(ad)}>
                                                    <Save />
                                                </IconButton>
                                            </div>
                                        </Tooltip>
                                    ) : (null)
                                }

                                {
                                    isCreation ? (
                                        <Tooltip title={<Trans>ads.instance.create.button.label</Trans>}>
                                            <div>
                                                <IconButton disabled={!ad.title || !ad.content} onClick={() => createAd(ad)}>
                                                    <Save />
                                                </IconButton>
                                            </div>
                                        </Tooltip>
                                    ) : (null)
                                }

                                {
                                    isReadonly && loggedInProfile !== ad.author ? (
                                        ad.applied ? (
                                            <Button
                                                onClick={() => cancelAdApplication(ad)}>
                                                <Trans>ads.instance.details.cancelApply.button.label</Trans>
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => applyToAd(ad)}
                                                disabled={ad.applied}>
                                                <Trans>ads.instance.details.apply.button.label</Trans>
                                            </Button>
                                        )
                                    ) : (null)
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInProfile: state.account.profile,
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
        cancelAdApplication(ad) {
            console.error('METHOD NOT IMPLEMENTED');
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
        editAd(ad) {
            return dispatch(editAd(ad))
                .then((ad) => {
                    history.push('/ads/list');

                    return dispatch(updateAdsList(ad));
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
