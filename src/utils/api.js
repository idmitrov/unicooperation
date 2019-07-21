import appConfig from '../app/App.config';
import { unsetAccount } from '../account/Account.actions';
import { notify } from '../components/uni-notifier/UniNotifier.component';

export default (store) => (next) => (action) => {
    if (action.api) {
        const state = store.getState();

        let options = {
            method: action.api.method,
            headers: {
                'Accept': 'application/json, text/plain, */*'
            }
        };

        if (action.headers) {
            for (let key in action.headers) {
                options.headers[key] = action.headers[key];
            }
        }

        if (/^POST$|^PUT$|^PATCH$/.test(options.method)) {
            if (action.payload) {
                options.body = JSON.stringify(action.payload);
                options.headers['Content-Type'] = 'application/json';
            } else if (action.file || action.files) {
                options.body = action.file;
            }
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
                    let error = 'Something went wrong';

                    if (response.status) {
                        if (response.status === 401) {
                            store.dispatch(unsetAccount());
                        }

                        error = response.statusText;
                    }

                    if (response.error) {
                        error = response.error.message;

                        if (response.error.id) {
                            notify(response.error.id);
                        }
                    }

                    return reject(error);
                })
        });
    }

    next(action);
}
