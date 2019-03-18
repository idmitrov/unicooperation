import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './utils/i18n';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import store from './utils/store';
import App from './app/App';

import 'typeface-roboto';
import './index.scss';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#000'
        },
        secondary: {
            main: '#FFF'
        }
    },
    typography: {
        useNextVariants: true,
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
