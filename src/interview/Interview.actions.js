import interviewEndpoints from './Interview.endpoints';

export const interviewActionTypes = {
    fetchInterview: 'INTERVIEW_FETCH',
    setInterview: 'INTERVIEW_SET',
    changeInterviewProp: 'INTERVIEW_PROP_SET'
};

export const requestInterview = (candidateId, adId, scheduledDate) => (dispatch) => {
    const payload = {
        ad: adId,
        applicant: candidateId,
        scheduledDate
    };

    return dispatch({
        type: interviewActionTypes.fetchInterview,
        payload,
        api: {
            endpoint: interviewEndpoints.request.endpoint,
            method: interviewEndpoints.request.method
        }
    });
}

export const fetchInterview = (interviewId) => (dispatch) => {
    const endpoint = interviewEndpoints.get.endpoint.replace('{id}', interviewId);

    return dispatch({
        type: interviewActionTypes.fetchInterview,
        api: {
            endpoint,
            method: interviewEndpoints.get.method
        }
    });
}

export const setInterview = (interview) => (dispatch) => {
    return dispatch({
        type: interviewActionTypes.setInterview,
        payload: interview
    });
}

export const changeInterviewProp = (change) => (dispatch, getState) => {
    const interviewState = getState().interview;

    return dispatch({
        type: interviewActionTypes.changeInterviewProp,
        payload: {...interviewState.instance, ...change}
    });
}
