import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Grid, TextField
} from '@material-ui/core';

import {
    fetchInterview,
    setInterview,
    changeInterviewProp,
    requestInterview,
    saveInterview
} from './Interview.actions';

import { selectInterview, selectInterviewMode } from './Interview.selector';

import history from '../utils/history';

class InterviewView extends Component {
    constructor(props) {
        super(props);

        const { interviewId } = this.props.match.params;

        if (interviewId) {
            this.props.fetchInterview(interviewId);
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
        const {
            interview,
            isEditMode,
            changeInterviewProp,
            requestInterview,
            saveInterview
        } = this.props;

        return (
            <div className="page-row">
                <Grid container justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    label="Title"
                                    value={interview.title || ''}
                                    fullWidth
                                    onChange={(e) => changeInterviewProp({ title: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    value={interview.description || ''}
                                    fullWidth
                                    multiline
                                    rows="5"
                                    onChange={(e) => changeInterviewProp({ description: e.target.value })}
                                />
                            </Grid>

                            <Grid item>
                                {
                                    isEditMode ? (
                                        <button onClick={() => saveInterview(interview)}>Save interview</button>
                                    ) : (
                                        <button onClick={() => requestInterview(interview)}>Request interview</button>
                                    )
                                }
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
        isEditMode: selectInterviewMode(state),
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
