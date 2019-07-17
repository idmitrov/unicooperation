export default {
    archive: {
        endpoint: 'interview/{interviewId}',
        method: 'DELETE'
    },
    complete: {
        endpoint: 'interview/complete',
        method: 'POST'
    },
    answer: {
        endpoint: 'interview/answer',
        method: 'POST'
    },
    mine: {
        endpoint: 'interview/mine',
        method: 'GET'
    },
    get: {
        endpoint: 'interview/{id}',
        method: 'GET'
    },
    request: {
        endpoint: 'interview/request',
        method: 'POST'
    },
    save: {
        endpoint: 'interview/request',
        method: 'PUT'
    }
}
