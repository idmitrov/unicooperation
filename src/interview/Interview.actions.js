import interviewEndpoints from './Interview.endpoints';

export const interviewActionTypes = {
    fetchInterview: 'INTERVIEW_FETCH',
    saveInterview: 'INTERVIEW_SAVE',
    setInterview: 'INTERVIEW_SET',
    resetInterview: 'INTERVIEW_RESET',
    answerInterview: 'INTERVIEW_ANSWER',
    completeInterview: 'INTERVIEW_COMPLETE',
    archiveInterview: 'INTERVIEW_ARCHIVE',
    changeInterviewProp: 'INTERVIEW_PROP_SET',
    fetchMineInterviews: 'INTERVIEW_MINE_FETCH',
    setInterviewsList: 'INTERVIEW_LIST_SET'
};

export const resetInterview = () => (dispatch) => {
    const action = { type: interviewActionTypes.resetInterview };

    return dispatch(action);
}

export const archiveInterview = (interviewId) => (dispatch) => {
    const action = {
        type: interviewActionTypes.archiveInterview,
        payload: { interviewId },
        api: {
            endpoint: interviewEndpoints.archive.endpoint.replace('{interviewId}', interviewId),
            method: interviewEndpoints.archive.method
        }
    };

    return dispatch(action);
}

export const completeInterview = (interviewId, succeeded) => (dispatch) => {
    const action = {
        type: interviewActionTypes.completeInterview,
        payload: { interviewId, succeeded },
        api: {
            endpoint: interviewEndpoints.complete.endpoint,
            method: interviewEndpoints.complete.method
        }
    };

    return dispatch(action);
}

export const answerInterview = (interview, accepted) => (dispatch) => {
    const action = {
        type: interviewActionTypes.answerInterview,
        payload: { interviewId: interview._id, accepted },
        api: {
            endpoint: interviewEndpoints.answer.endpoint,
            method: interviewEndpoints.answer.method
        }
    };

    return dispatch(action);
}

export const saveInterview = (interview) => (dispatch) => {
    const action = {
        type: interviewActionTypes.saveInterview,
        payload: { interview },
        api: {
            endpoint: interviewEndpoints.save.endpoint,
            method: interviewEndpoints.save.method
        }
    };

    return dispatch(action);
}

export const requestInterview = (interviewData) => (dispatch) => {
    if (!interviewData.scheduledDate) {
        interviewData.scheduledDate = new Date();
    }

    const action = {
        type: interviewActionTypes.fetchInterview,
        payload: interviewData,
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
