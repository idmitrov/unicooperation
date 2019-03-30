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

import { Trans } from 'react-i18next';
import { authenticateAccount, createAccount, setAccount } from '../account/Account.actions';
import { accountType } from './account.constants';

class AccountView extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            mode: 'login',
            password: '',
            type: accountType.university
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
                        <Tab value="login" label={<Trans>account.login.label</Trans>} />
                        <Tab value="register" label={<Trans>account.register.label</Trans>} />
                    </Tabs>
                </AppBar>

                <Grid container justify="center">
                    <Grid item sm={8} md={4}>
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
                                                label={<Trans>account.email.label</Trans>}
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
                                                label={<Trans>account.password.label</Trans>}
                                                required
                                                fullWidth
                                                onChange={this.handleAccountInputChange}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="primary">
                                                <Trans>account.login.label</Trans>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            ) : (
                                    <form onSubmit={(e) => {
                                        e.preventDefault();

                                        register(this.state.email, this.state.password, this.state.name, this.state.type);
                                    }}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <FormControl>
                                                    <FormLabel>
                                                        <Trans>account.type.label</Trans>
                                                    </FormLabel>

                                                    <RadioGroup
                                                        name="type"
                                                        value={this.state.type}
                                                        row
                                                        onChange={this.handleAccountInputChange}>
                                                        {
                                                            Object
                                                                .keys(accountType)
                                                                .map((accountTypeKey) => {
                                                                    return (<FormControlLabel
                                                                        key={accountTypeKey}
                                                                        value={accountType[accountTypeKey]}
                                                                        control={<Radio color="primary" />}
                                                                        label={<Trans>{`${accountTypeKey}.label`}</Trans>}
                                                                    />);
                                                                })
                                                        }
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    type="email"
                                                    name="email"
                                                    value={this.state.email}
                                                    label={<Trans>account.email.label</Trans>}
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
                                                    label={<Trans>account.password.label</Trans>}
                                                    required
                                                    fullWidth
                                                    onChange={this.handleAccountInputChange}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary">
                                                    <Trans>account.register.label</Trans>
                                                </Button>
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
        register(email, password, name, type) {
            return dispatch(createAccount(email, password, name, type))
                .then((account) => {
                    return dispatch(authenticateAccount(email, password))
                        .then((account) => {
                            return dispatch(setAccount(account));
                        });
                });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountView);
