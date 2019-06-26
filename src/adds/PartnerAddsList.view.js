import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Grid,
    Paper,
    Typography
} from '@material-ui/core';

import '../app/App.scss';

import { fetchAddsList, setAddsList } from './Adds.actions';

class PartnerAddsListView extends Component {
    constructor(props) {
        super(props);

        this.props.fetchAddsList();
    }

    render() {
        const { adds } = this.props;

        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    {
                        adds.map((addItem, index) => {
                            return (
                                <Paper className="page-row" key={index}>
                                    <Typography variant="h6">{addItem.title}</Typography>

                                    {addItem.content}
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
        adds: state.adds.list
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAddsList() {
            return dispatch(fetchAddsList())
                .then((adds) => {
                    return dispatch(setAddsList(adds.list));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerAddsListView);
