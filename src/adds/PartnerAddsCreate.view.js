import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Button,
    Grid,
    TextField
} from '@material-ui/core';

import '../app/App.scss';

import {
    updateAddProps,
    createAdd
} from './Adds.actions';

import history from '../utils/history';

class PartnerAddsCreateView extends Component {
    render() {
        const {
            addTitle,
            addContent,
            createAdd,
            addPropChanged
        } = this.props;

        return(
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    <TextField
                        label="Title"
                        name="title"
                        value={addTitle || ''}
                        required
                        fullWidth
                        onChange={addPropChanged}
                    />

                    <TextField
                        label="Content"
                        name="content"
                        value={addContent || ''}
                        multiline
                        required
                        fullWidth
                        rows="5"
                        onChange={addPropChanged}
                    />

                    <Button onClick={() => createAdd(addTitle, addContent)}>Create</Button>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addTitle: state.adds.instance.title,
        addContent: state.adds.instance.content
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createAdd(title, content) {
            return dispatch(createAdd(title, content))
                .then(() => {
                    history.push('/adds/list');
                });
        },
        addPropChanged(e) {
            const { name, value } = e.target;

            return dispatch(updateAddProps(name, value));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerAddsCreateView);
