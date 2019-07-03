import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import {
    Avatar,
    Button,
    Grid,
    TextField,
    IconButton,
    Tooltip
} from '@material-ui/core';


import {
    Assignment,
    Delete,
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
            deleteAd,
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

                            <Grid item xs={12} style={{marginTop: 15}}>
                                {
                                    isEditing ? (
                                        <Grid container justify="space-between" alignItems="center">
                                            <Grid item>
                                                <Tooltip title={<Trans>ads.instance.delete.button.label</Trans>}>
                                                    <div>
                                                        <IconButton disabled={!ad.title || !ad.content} onClick={() => deleteAd(ad)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </div>
                                                </Tooltip>
                                            </Grid>

                                            <Grid item>
                                                <Tooltip title={<Trans>ads.instance.save.button.label</Trans>}>
                                                    <div>
                                                        <IconButton disabled={!ad.title || !ad.content} onClick={() => editAd(ad)}>
                                                            <Save />
                                                        </IconButton>
                                                    </div>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
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
                                    isReadonly ? (
                                        <React.Fragment>
                                            {
                                                loggedInProfile !== ad.author ? (
                                                    <Grid container alignItems="center" justify="space-between">
                                                        <Grid item>
                                                            <Trans>ads.instance.applicationsTotal</Trans>: {ad.applicationsTotal || 0}
                                                        </Grid>

                                                        <Grid item>
                                                            {
                                                                ad.applied ? (
                                                                    <Button
                                                                        variant="raised"
                                                                        onClick={() => cancelAdApplication(ad)}>
                                                                        <Trans>ads.instance.details.cancelApply.button.label</Trans>
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        variant="raised"
                                                                        disabled={ad.applied}
                                                                        onClick={() => applyToAd(ad)}>
                                                                        <Trans>ads.instance.details.apply.button.label</Trans>
                                                                    </Button>
                                                                )
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                ) : (
                                                    <Grid container alignItems="center" spacing={16}>
                                                        <Grid item>
                                                            <Avatar>
                                                                <Assignment />
                                                            </Avatar>
                                                        </Grid>

                                                        <Grid item>
                                                            Applications: {ad.applicationsTotal || 0}
                                                        </Grid>

                                                        <Grid item xs={true}>
                                                            <Button
                                                                variant="raised"
                                                                disabled={!ad.applicationsTotal}
                                                                fullWidth>
                                                                Show applicants
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            }
                                        </React.Fragment>
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
        deleteAd(ad) {
            // TODO: Popup confirmation, then cancel or delete and redirect to ads list
            console.error('Method not implemented');
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
