import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './utils/i18n';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

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
    <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Provider store={store}>
                <App />
            </Provider>
        </MuiPickersUtilsProvider>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
