import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    fetchInterview,
    setInterview,
    changeInterviewProp,
    requestInterview
} from './Interview.actions';

class InterviewView extends Component {
    constructor(props) {
        super(props);
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
            // REQUEST
        } else {
            // EDIT
            // const { interviewId } = this.props.match.params;
            // this.props.fetchInterview(interviewId);
        }
    }

    render() {
        const {
            interview,
            requestInterview
        } = this.props;

        return (
            <div>
                <h2>Interview {interview._id}</h2>

                <button onClick={() => requestInterview(interview.applicant, interview.ad, new Date())}>Request interview</button>
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
