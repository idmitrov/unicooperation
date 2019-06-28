import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';

import {
    Button,
    Grid,
    TextField
} from '@material-ui/core';

import '../app/App.scss';

import {
    updateAddProps,
    createAdd,
    resetAddInstance
} from './Adds.actions';

import history from '../utils/history';

class PartnerAddsCreateView extends Component {
    componentWillUnmount() {
        this.props.resetAddInstance();
    }

    render() {
        const {
            addTitle,
            addContent,
            createAdd,
            addPropChanged
        } = this.props;

        return(
            <div className="page-row">

                <Grid container justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField
                            label={<Trans>add.create.title.label</Trans>}
                            name="title"
                            value={addTitle || ''}
                            required
                            fullWidth
                            onChange={addPropChanged}
                        />

                        <TextField
                            label={<Trans>add.create.content.label</Trans>}
                            name="content"
                            value={addContent || ''}
                            multiline
                            required
                            fullWidth
                            rows="5"
                            onChange={addPropChanged}
                        />

                        <Button
                            title={<Trans>add.create.button.label</Trans>}
                            onClick={() => createAdd(addTitle, addContent)}>
                            <Trans>add.create.button.label</Trans>
                        </Button>
                    </Grid>
                </Grid>
            </div>
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
        },
        resetAddInstance() {
            return dispatch(resetAddInstance());
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerAddsCreateView);
