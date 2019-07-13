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

class InterviewView extends Component {
    constructor(props) {
        super(props);

        const { interviewId } = this.props.match.params;

        if (interviewId) {
            const { interviewId } = this.props.match.params;
            this.props.fetchInterview(interviewId);
        } else {
            const queryString = this.props.history.location.search;

            if (queryString) {
                const params = new URLSearchParams(queryString);
                const candidateId = params.get('candidate');
                const adId = params.get('ad');

                if (candidateId && adId) {
                    this.props.changeInterviewProp({
                        applicant: candidateId,
                        ad: adId,
                        _id: null
                    });
                }
            }
        }
    }

    render() {
        const {
            interview,
            requestInterview
        } = this.props;

        return (
            <div className="page-row">
                <Grid container justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={6} lg={4}>
                        {
                            interview._id || interview.id ? (
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
        interview: state.interview.instance
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
