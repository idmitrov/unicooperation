import interviewEndpoints from './Interview.endpoints';

export const interviewActionTypes = {
    fetchInterview: 'INTERVIEW_FETCH',
    setInterview: 'INTERVIEW_SET',
    changeInterviewProp: 'INTERVIEW_PROP_SET',
    fetchMineInterviews: 'INTERVIEW_MINE_FETCH',
    setInterviewsList: 'INTERVIEW_LIST_SET'
};

export const requestInterview = (candidateId, adId, scheduledDate, title=`Interview ${new Date()}`) => (dispatch) => {
    // TODO: Make title required after ui implementation for it
    const payload = {
        ad: adId,
        applicant: candidateId,
        scheduledDate,
        title
    };

    const action = {
        type: interviewActionTypes.fetchInterview,
        payload,
        api: {
            endpoint: interviewEndpoints.request.endpoint,
            method: interviewEndpoints.request.method
        }
    };

    return dispatch(action);
}

export const fetchMineInterviews = () => (dispatch) => {
    const action = {
        type: interviewActionTypes.fetchMineInterviews,
        api: {
            endpoint: interviewEndpoints.mine.endpoint,
            method: interviewEndpoints.mine.method
        }
    };

    return dispatch(action);
}

export const setInterviewsList = (interviews) => (dispatch) => {
    const action = {
        type: interviewActionTypes.setInterviewsList,
        payload: interviews
    };

    return dispatch(action);
}

export const fetchInterview = (interviewId) => (dispatch) => {
    const endpoint = interviewEndpoints.get.endpoint.replace('{id}', interviewId);

    const action = {
        type: interviewActionTypes.fetchInterview,
        api: {
            endpoint,
            method: interviewEndpoints.get.method
        }
    };

    return dispatch(action);
}

export const setInterview = (interview) => (dispatch) => {
    const action = {
        type: interviewActionTypes.setInterview,
        payload: interview
    };

    return dispatch(action);
}

export const changeInterviewProp = (change) => (dispatch, getState) => {
    const interviewState = getState().interview;

    const action = {
        type: interviewActionTypes.changeInterviewProp,
        payload: { ...interviewState.instance, ...change }
    };

    return dispatch(action);
}
