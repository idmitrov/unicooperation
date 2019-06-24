import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    Grid,
    Typography
} from '@material-ui/core';

class PartnerDashboardView extends Component {
    render() {
        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    <Typography variant="h5">Dashboard</Typography>

                    <Grid container>
                        <Grid item>
                            <Link to="/matches">All Matches</Link>
                        </Grid>

                    </Grid>

                    <Grid container>
                        <Grid item>
                            <Link to="/projects">All Projects</Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
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
)(PartnerDashboardView);
