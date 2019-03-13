import React, { Component, Fragment } from 'react';
import { Router } from 'react-router-dom';

import history from '../shared/history';

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Fragment>
                    <header>
                        Unicooperation
                    </header>

                    <main>
                        {this.props.children}
                    </main>
                </Fragment>
            </Router>
        );
    }
}

export default App;
