import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Grid
} from '@material-ui/core';

import '../app/App.scss';

class PartnerAddsCreateView extends Component {
    render() {
        return(
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    Create new add
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = () => {
    return {};
}

const mapDispatchToProps = () => {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerAddsCreateView);
