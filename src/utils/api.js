import appConfig from '../app/App.config';

export default (store) => (next) => (action) => {
    if (action.api) {
        const state = store.getState();
        let options = {
            method: action.api.method,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        };

        if ((options.method.test(/^POST$|^PUT$|^PATCH$/)) && action.payload) {
            options.body = JSON.stringify(action.payload);
        }

        if (action.api.query) {
            action.api.endpoint += `?${action.api.query}`;
        }

        if (state.account.authenticated) {
            options.headers['Authorization'] = `Bearer ${state.account.token}`;
        }

        return new Promise((resolve, reject) => {
            fetch(`//${appConfig.REACT_APP_API_URL}/${action.api.endpoint}`, options)
                .then((response) => {
                    if (/application\/json/.test(response.headers.get('Content-Type'))) {
                        return response.json();
                    }

                    return response.text();
                })
                .then((response) => {
                    if (response.errors.length) {
                        response.errors.forEach((error) => {
                            console.error(error);
                        });

                        reject(response.errors);
                    } else {
                        if (action.api.successMessage) {
                            console.log(action.api.successMessage);
                        }

                        resolve(response.data);
                    }
                })
                .catch((response) => {
                    console.error('Error', 'Something went wrong');

                    if (appConfig.NODE_ENV !== 'production') {
                        console.error(response);
                    }
                })
        });
    }

    next(action);
}
