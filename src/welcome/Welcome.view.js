import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticateAccount, setAccount } from '../account/Account.actions';

class Welcome extends Component {
    render() {
        const { login } = this.props;

        return (
            <div>
                WELCOME

                <button onClick={() => login('admin@unicooperation.com', 'AdmiN1')}>Login</button>
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login(email, password) {
            return dispatch(authenticateAccount(email, password))
                .then((account) => {
                    return dispatch(setAccount(account));
                });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
