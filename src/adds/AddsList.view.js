import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Grid,
    Paper,
    Typography
} from '@material-ui/core';

import '../app/App.scss';

import {
    fetchMyadds,
    fetchMyUniversityPartnersAdds,
    setAddsList
} from './Adds.actions';

import { accountType } from '../account/Account.constants';

class AddsListView extends Component {
    constructor(props) {
        super(props);

        switch (this.props.accountType) {
            case accountType.student:
                this.props.fetchMyUniversityPartnersAdds();
                break;
            case accountType.partner:
                this.props.fetchMyadds();
                break;
            default: console.error('Unknown accountType');
        }
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
        accountType: state.account.type,
        adds: state.adds.list
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMyUniversityPartnersAdds() {
            return dispatch(fetchMyUniversityPartnersAdds())
                .then((adds) => {
                    return dispatch(setAddsList(adds.list));
                });
        },
        fetchMyadds() {
            return dispatch(fetchMyadds())
                .then((adds) => {
                    return dispatch(setAddsList(adds.list));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddsListView);
