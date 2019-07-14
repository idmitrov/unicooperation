import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Grid
} from '@material-ui/core';

class InterviewListView extends Component {
    render() {
        return (
            <div className="page-row">
                <Grid container justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid item>
                            There are no interviews...
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export const mapStateToProps = () => {
    return {};
}

export const mapDispatchToProps = () => {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterviewListView);
