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
    archiveInterview,
    fetchInterview,
    setInterview,
    changeInterviewProp,
    requestInterview,
    saveInterview,
    answerInterview,
    completeInterview,
    resetInterview,
    createCooperation
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
            this.props.fetch(interviewId || interviewDetailsId);
        } else {
            this.props.changeProp({ _id: null });

            const queryString = this.props.history.location.search;

            if (queryString) {
                const params = new URLSearchParams(queryString);
                const candidateId = params.get('candidate');
                const adId = params.get('ad');

                if (candidateId && adId) {
                    this.props.changeProp({
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
            answer,
            archive,
            changeProp,
            request,
            save,
            complete,
            cooperate
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
                                    onChange={(e) => changeProp({ title: e.target.value })}
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
                                    onChange={(e) => changeProp({ description: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12} style={{marginTop: 15}}>
                                <Grid container justify="space-between">
                                    {
                                        isReadonly && interview.applicant === loggedinProfile? (
                                            <Fragment>
                                                <Grid item>
                                                    <Button onClick={() => answer(interview, false)}>
                                                        Cancel
                                                    </Button>
                                                </Grid>

                                                {
                                                    !interview.accepted ? (
                                                        <Grid item>
                                                            <Button onClick={() => answer(interview, true)}>
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
                                                                                        complete(interview._id, e.target.value);
                                                                                    }}>
                                                                                    <MenuItem value={true}>Passed</MenuItem>
                                                                                    <MenuItem value={false}>Not passed</MenuItem>
                                                                                </Select>
                                                                            </FormControl>
                                                                        </Grid>

                                                                        {
                                                                            interview.succeeded ? (
                                                                                <Grid item>
                                                                                    <Button onClick={() => cooperate(interview._id, interview.applicant)}>Create cooperation</Button>
                                                                                </Grid>
                                                                            ) : (
                                                                                <Button onClick={() => archive(interview._id)}>Archive interview</Button>
                                                                            )
                                                                        }
                                                                    </Grid>
                                                                ) : (
                                                                    <Button onClick={() => archive(interview._id)}>
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
                                                    <IconButton onClick={() => save(interview)}>
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
                                                        <Button onClick={() => request(interview)}>Request interview</Button>
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
        changeProp(prop) {
            return dispatch(changeInterviewProp(prop));
        },
        save(interview) {
            return dispatch(saveInterview(interview))
                .then((savedInterview) => {
                    history.push('/interview/list');

                    return dispatch(setInterview(savedInterview));
                });
        },
        request(interview) {
            return dispatch(requestInterview(interview))
                .then((createdInterview) => {
                    history.push('/interview/list');

                    return dispatch(setInterview(createdInterview));
                });
        },
        fetch(interviewId) {
            return dispatch(fetchInterview(interviewId))
                .then((interview) => {
                    return dispatch(setInterview(interview));
                });
        },
        answer(interview, accepted) {
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
        complete(interviewId, succeeded) {
            return dispatch(completeInterview(interviewId, succeeded))
                .then((completedInterview) => {
                    return dispatch(setInterview(completedInterview));
                });
        },
        archive(interviewId) {
            return dispatch(archiveInterview(interviewId))
                .then(() => {
                    history.push('/interview/list');

                    return dispatch(resetInterview());
                });
        },
        cooperate(interviewId, studentId) {
            return dispatch(createCooperation(interviewId, studentId))
                .then(() => {
                    return dispatch(archiveInterview(interviewId));
                })
                .then(() => {
                    history.push('/interview/list');

                    dispatch(resetInterview());
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterviewView);
