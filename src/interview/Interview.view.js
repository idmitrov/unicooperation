import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
    Grid
} from '@material-ui/core';

import {
    fetchInterview,
    setInterview,
    changeInterviewProp,
    requestInterview
} from './Interview.actions';

import { selectInterview, selectInterviewMode } from './Interview.selector';

class InterviewView extends Component {
    constructor(props) {
        super(props);

        const { interviewId } = this.props.match.params;

        if (interviewId) {
            this.props.fetchInterview(interviewId);
        } else {
            this.props.changeInterviewProp({ _id: null});

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
            requestInterview
        } = this.props;

        return (
            <div className="page-row">
                <Grid container justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={6} lg={4}>
                        {
                            isEditMode ? (
                                <Fragment>
                                    <h2>Edit interview</h2>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <h2>Request interview</h2>
                                    <button onClick={() => requestInterview(interview.applicant, interview.ad, new Date())}>Request interview</button>
                                </Fragment>
                            )
                        }
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
        requestInterview(candidateId, adId, scheduledDate) {
            return dispatch(requestInterview(candidateId, adId, scheduledDate))
                .then((interview) => {
                    return dispatch(setInterview(interview));
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
