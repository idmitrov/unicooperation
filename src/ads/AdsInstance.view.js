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
    setAdInstance
} from './Ads.actions';

import history from '../utils/history';

class AdsInstanceView extends Component {
    constructor(props) {
        super(props);

        const { adId } = this.props.match.params;

        if (adId) {
            this.props.getAdInstance(adId);
        }
    }

    componentWillUnmount() {
        this.props.resetAdInstance();
    }

    render() {
        const {
            adId,
            adTitle,
            adContent,
            createAd,
            adPropChanged
        } = this.props;

        return(
            <div className="page-row">
                <Grid container justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField
                            label={<Trans>ads.instance.create.title.label</Trans>}
                            name="title"
                            value={adTitle || ''}
                            required
                            fullWidth
                            onChange={adPropChanged}
                        />

                        <TextField
                            label={<Trans>ads.instance.create.content.label</Trans>}
                            name="content"
                            value={adContent || ''}
                            multiline
                            required
                            rows="5"
                            fullWidth
                            onChange={adPropChanged}
                        />

                        {
                            adId ? (
                                <Button
                                    onClick={() => createAd(adTitle, adContent)}>
                                    <Trans>ads.instance.edit.button.label</Trans>
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => createAd(adTitle, adContent)}>
                                    <Trans>ads.instance.create.button.label</Trans>
                                </Button>
                            )
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        adId: state.ads.instance.id,
        adTitle: state.ads.instance.title,
        adContent: state.ads.instance.content
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAdInstance(adId) {
            return dispatch(fetchAdInstance(adId))
                .then((ad) => {
                    return dispatch(setAdInstance(ad));
                });
        },
        createAd(title, content) {
            return dispatch(createAd(title, content))
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
