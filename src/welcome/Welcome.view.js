import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Grid,
    TextField,
    Button
} from '@material-ui/core';

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
                    <Grid container>
                        <Grid item>
                            <TextField
                                type="email"
                                name="email"
                                value={this.state.email}
                                label="Email"
                                required
                                onChange={this.handleAccountInputChange}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                type="password"
                                name="password"
                                value={this.state.password}
                                label="Password"
                                required
                                onChange={this.handleAccountInputChange}
                            />
                        </Grid>

                        <Grid item>
                            <Button type="submit" variant="contained" color="primary">Login</Button>
                        </Grid>
                    </Grid>
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
