import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticateAccount, setAccount } from '../account/Account.actions';

class Welcome extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }

        this.handleAccountInputChange = this.handleAccountInputChange.bind(this);
    }

    handleAccountInputChange(e) {
        const { name, value } = e.target;

        this.setState({
            ...this.satte,
            [name]: value
        });
    }

    render() {
        const { login } = this.props;

        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    login(this.state.email, this.state.password);
                }}>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        placeholder="Email"
                        required
                        onChange={this.handleAccountInputChange}
                    />

                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        placeholder="Password"
                        required
                        onChange={this.handleAccountInputChange}
                    />

                    <button type="submit">Login</button>
                </form>
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
