import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
    Grid,
    IconButton,
    TextField,
    Button,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel
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
    saveInterview,
    answerInterview,
    completeInterview
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
            loggedinProfile,
            answerInterview,
            changeInterviewProp,
            requestInterview,
            saveInterview,
            completeInterview
        } = this.props;

        return (
            <div className="page-row">
                <Grid container justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid container spacing={grid.spacing}>
                            <Grid item xs={12}>
                                {
                                    isReadonly ? (
                                        <Typography variant="h6">
                                            {
                                                interview.accepted ? (
                                                    'The interview was accepted'
                                                ) : interview.rejected ? (
                                                    'The interview was rejected'
                                                ) : (
                                                    'Awaiting for applicant answer'
                                                )
                                            }
                                        </Typography>
                                    ) : isRedaction ? (
                                        <Typography variant="h6">Edit interview</Typography>
                                    ) : (
                                        <Typography variant="h6">Arrange interview</Typography>
                                    )
                                }
                            </Grid>

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
                                        isReadonly && interview.applicant === loggedinProfile? (
                                            <Fragment>
                                                <Grid item>
                                                    <Button onClick={() => answerInterview(interview, false)}>
                                                        Cancel
                                                    </Button>
                                                </Grid>

                                                {
                                                    !interview.accepted ? (
                                                        <Grid item>
                                                            <Button onClick={() => answerInterview(interview, true)}>
                                                                Acceppt
                                                            </Button>
                                                        </Grid>
                                                    ) : (null)
                                                }
                                            </Fragment>
                                        ) : (null)
                                    }

                                    {
                                        isReadonly && interview.interviewer === loggedinProfile? (
                                            <Fragment>
                                                <Grid item xs={12}>
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                            {
                                                                interview.accepted ? (
                                                                    <Grid container alignItems="center" justify="space-between">
                                                                        <Grid item>
                                                                            <FormControl fullWidth>
                                                                                <InputLabel htmlFor="interview-succeeded">Status</InputLabel>

                                                                                <Select
                                                                                    value={interview.succeeded}
                                                                                    inputProps={{id: 'interview-succeeded'}}
                                                                                    fullWidth
                                                                                    onChange={(e) => {
                                                                                        completeInterview(interview._id, e.target.value);
                                                                                    }}>
                                                                                    <MenuItem value={true}>Passed</MenuItem>
                                                                                    <MenuItem value={false}>Not passed</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Grid>

                                                                        {
                                                                            interview.succeeded ? (
                                                                                <Grid item>
                                                                                    <Button>Create cooperation</Button>
                                                                                </Grid>
                                                                            ) : (
                                                                                <Button>Archive interview</Button>
                                                                            )
                                                                        }
                                                                    </Grid>
                                                                ) : (
                                                                    <Button>
                                                                        {
                                                                            interview.rejected ? 'Archive interview' : 'Cancel interview'
                                                                        }
                                                                    </Button>
                                                                )
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Fragment>
                                        ) : (null)
                                    }

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
                                            <Grid item xs={12}>
                                                <Grid container justify="flex-end">
                                                    <Grid item>
                                                        <Button onClick={() => requestInterview(interview)}>Request interview</Button>
                                                    </Grid>
                                                </Grid>
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
        loggedinProfile: state.account.profile,
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
        },
        answerInterview(interview, accepted) {
            if (interview.rejected === false) {
                return dispatch(answerInterview(interview, accepted))
                    .then((answeredInterview) => {
                        if (!answeredInterview.isActive) {
                            return history.push('/interview/list');
                        }

                        return dispatch(setInterview(answeredInterview));
                    });
            }
        },
        completeInterview(interviewId, succeeded) {
            return dispatch(completeInterview(interviewId, succeeded))
                .then((completedInterview) => {
                    return dispatch(setInterview(completedInterview));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterviewView);
