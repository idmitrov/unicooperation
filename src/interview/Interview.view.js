import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
    Grid,
    IconButton,
    TextField
} from '@material-ui/core';

import {
    Save, Delete
} from '@material-ui/icons';

import { grid } from '../app/App.constants';

import { DateTimePicker } from '@material-ui/pickers';

import {
    fetchInterview,
    setInterview,
    changeInterviewProp,
    requestInterview,
    saveInterview
} from './Interview.actions';

import { selectInterview } from './Interview.selector';

import history from '../utils/history';

class InterviewView extends Component {
    constructor(props) {
        super(props);

        const { interviewId, interviewDetailsId } = this.props.match.params;

        this.state = {
            isCreation: interviewId === undefined && interviewDetailsId === undefined,
            isReadonly: interviewId === undefined && interviewDetailsId !== undefined,
            isRedaction: interviewId !== undefined && interviewDetailsId === undefined
        };

        if (this.state.isRedaction || this.state.isReadonly) {
            this.props.fetchInterview(interviewId || interviewDetailsId);
        } else {
            this.props.changeInterviewProp({ _id: null });

            const queryString = this.props.history.location.search;

            if (queryString) {
                const params = new URLSearchParams(queryString);
                const candidateId = params.get('candidate');
                const adId = params.get('ad');

                if (candidateId && adId) {
                    this.props.changeInterviewProp({
                        applicant: candidateId,
                        ad: adId
                    });
                }
            }
        }
    }

    render() {
        const { isCreation, isRedaction, isReadonly } = this.state;

        const {
            interview,
            changeInterviewProp,
            requestInterview,
            saveInterview
        } = this.props;

        return (
            <div className="page-row">
                <Grid container justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid container spacing={grid.spacing}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Title"
                                    value={interview.title || ''}
                                    fullWidth
                                    InputProps={{ readOnly: isReadonly }}
                                    onChange={(e) => changeInterviewProp({ title: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <DateTimePicker
                                    label="Date"
                                    autoOk
                                    ampm={false}
                                    InputProps={{ readOnly: isReadonly }}
                                    DialogProps={{ hidden: isReadonly }}
                                    value={interview.scheduledDate}
                                    onChange={(e) => {
                                        if (isRedaction && !isReadonly) {
                                            changeInterviewProp({ scheduledDate: e._d })
                                        }
                                    }}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    value={interview.description || ''}
                                    fullWidth
                                    multiline
                                    rows="5"
                                    InputProps={{ readOnly: isReadonly }}
                                    onChange={(e) => changeInterviewProp({ description: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12} style={{marginTop: 15}}>
                                <Grid container justify="space-between">
                                    {
                                        isRedaction ? (
                                            <Fragment>
                                                <Grid item>
                                                    <IconButton>
                                                        <Delete />
                                                    </IconButton>
                                                </Grid>

                                                <Grid item>
                                                    <IconButton onClick={() => saveInterview(interview)}>
                                                        <Save/>
                                                    </IconButton>
                                                </Grid>
                                            </Fragment>
                                        ) : (null)
                                    }

                                    {
                                        isCreation ? (
                                            <Grid item>
                                                <button onClick={() => requestInterview(interview)}>Request interview</button>
                                            </Grid>
                                        ) : (null)
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        interview: selectInterview(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeInterviewProp(prop) {
            return dispatch(changeInterviewProp(prop));
        },
        saveInterview(interview) {
            return dispatch(saveInterview(interview))
                .then((savedInterview) => {
                    history.push('/interview/list');

                    return dispatch(setInterview(savedInterview));
                });
        },
        requestInterview(interview) {
            return dispatch(requestInterview(interview))
                .then((createdInterview) => {
                    history.push('/interview/list');

                    return dispatch(setInterview(createdInterview));
                });
        },
        fetchInterview(interviewId) {
            return dispatch(fetchInterview(interviewId))
                .then((interview) => {
                    return dispatch(setInterview(interview));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterviewView);
