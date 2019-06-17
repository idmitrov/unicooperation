import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid } from '@material-ui/core';

class MatcherView extends Component {
    render() {
        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    <div className="page-row">
                        <div>Matcher view</div>
                    </div>
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
) (MatcherView);
