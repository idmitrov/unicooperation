import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    AppBar,
    Grid,
    TextField,
    Button,
    Tabs,
    Tab,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from '@material-ui/core';

import { authenticateAccount, createAccount,setAccount } from '../account/Account.actions';

class Welcome extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            mode: 'login',
            accountType: 'university'
        }

        this.handleAccountInputChange = this.handleAccountInputChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleAccountInputChange(e) {
        const { name, value } = e.target;

        this.setState({
            ...this.satte,
            [name]: value
        });
    }

    handleTabChange(e, mode) {
        this.setState({
            ...this.state,
            mode
        });
    }

    render() {
        const { login, register } = this.props;

        return (
            <div>
                <AppBar position="sticky">
                    <Tabs
                        indicatorColor="secondary"
                        variant="fullWidth"
                        value={this.state.mode}
                        onChange={this.handleTabChange}>
                        <Tab value="login" label="Login" />
                        <Tab value="register" label="Register" />
                    </Tabs>
                </AppBar>

                <Grid container justify="center">
                    <Grid item sm={4}>
                        {
                            this.state.mode === 'login' ? (
                                <form onSubmit={(e) => {
                                    e.preventDefault();

                                    login(this.state.email, this.state.password);
                                }}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="email"
                                                name="email"
                                                value={this.state.email}
                                                label="Email"
                                                required
                                                fullWidth
                                                onChange={this.handleAccountInputChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                label="Password"
                                                required
                                                fullWidth
                                                onChange={this.handleAccountInputChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="primary">Login</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            ) : (
                                <form onSubmit={(e) => {
                                    e.preventDefault();

                                    register(this.state.email, this.state.password, this.state.accountType);
                                }}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="email"
                                                name="email"
                                                value={this.state.email}
                                                label="Email"
                                                required
                                                fullWidth
                                                onChange={this.handleAccountInputChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                label="Password"
                                                required
                                                fullWidth
                                                onChange={this.handleAccountInputChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControl>
                                                <FormLabel>Account type</FormLabel>

                                                <RadioGroup
                                                    name="accountType"
                                                    value={this.state.accountType}
                                                    row
                                                    onChange={this.handleAccountInputChange}>
                                                    <FormControlLabel
                                                        value="university"
                                                        control={<Radio color="primary" />}
                                                        label="University"
                                                    />

                                                    <FormControlLabel
                                                        value="company"
                                                        control={<Radio color="primary" />}
                                                        label="Company"
                                                    />

                                                    <FormControlLabel
                                                        value="student"
                                                        control={<Radio color="primary" />}
                                                        label="Student"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="primary">Register</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            )
                        }
                    </Grid>
                </Grid>
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
        },
        register(email, password, accountType) {
            return dispatch(createAccount(email, password, accountType))
                .then((account) => {
                    return dispatch(authenticateAccount(email, password))
                        .then((account) => {
                            return dispatch(setAccount(account));
                        });
                });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
