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
    updateAddProps,
    createAdd,
    resetAddInstance
} from './Adds.actions';

import history from '../utils/history';

class PartnerAddsInstanceView extends Component {
    constructor(props) {
        super(props);

        const { addId } = this.props.match.params;

        if (addId) {
            // TODO: Fetch add
        }
    }

    componentWillUnmount() {
        this.props.resetAddInstance();
    }

    render() {
        const {
            addId,
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
                            label={<Trans>add.instance.create.title.label</Trans>}
                            name="title"
                            value={addTitle || ''}
                            required
                            fullWidth
                            onChange={addPropChanged}
                        />

                        <TextField
                            label={<Trans>add.instance.create.content.label</Trans>}
                            name="content"
                            value={addContent || ''}
                            multiline
                            required
                            rows="5"
                            fullWidth
                            onChange={addPropChanged}
                        />

                        {
                            addId ? (
                                <Button
                                    onClick={() => createAdd(addTitle, addContent)}>
                                    <Trans>add.instance.edit.button.label</Trans>
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => createAdd(addTitle, addContent)}>
                                    <Trans>add.instance.create.button.label</Trans>
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
        addId: state.adds.instance.id,
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

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(PartnerAddsInstanceView)
);
