import React, { Component } from 'react';

import {
    Grid,
    Typography
} from '@material-ui/core';

import { Trans } from 'react-i18next';

class SettingsView extends Component {
    render() {
        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    <div className="page-row">
                        <Typography variant="h5">
                            <Trans>settings.title</Trans>
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default SettingsView;
