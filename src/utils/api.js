import appConfig from '../app/App.config';
import { unsetAccount } from '../account/Account.actions';

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

        if (/^POST$|^PUT$|^PATCH$/.test(options.method) && action.payload) {
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
                    if (!response.ok) {
                        throw response;
                    }

                    if (/application\/json/.test(response.headers.get('Content-Type'))) {
                        return response.json();
                    }

                    return response.text();
                })
                .then((response) => {
                    if (response.error) {
                        throw response;
                    } else {
                        if (action.api.successMessage) {
                            console.log(action.api.successMessage);
                        }

                        resolve(response.data);
                    }
                })
                .catch((response) => {
                    if (response.status) {
                        store.dispatch(unsetAccount());

                        reject(response.statusText);
                    }

                    const error = response.error || 'Something went wrong';

                    reject(error);
                })
        });
    }

    next(action);
}
