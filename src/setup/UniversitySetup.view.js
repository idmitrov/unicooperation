import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Grid,
    Input,
    InputLabel,
    Select,
    TextField,
    FormControl,
    MenuItem,
    Typography,
    Button
} from '@material-ui/core';

import { Trans } from 'react-i18next';

import { fetchCountries, setCountries } from '../nomenclatures/Nom.actions';
import { createUniversitySetup } from './Setup.actions.js';
import { setAccount } from '../account/Account.actions';

class UniversitySetupView extends Component {
    constructor(props) {
        super(props);

        this.props.fetchCountries();

        this.state = {
            name: '',
            countryCode: null,
            isNameDirty: true,
            isCountryCodeDirty: true
        };

        this.handleSetupInputChange = this.handleSetupInputChange.bind(this);
    }

    handleSetupInputChange(e) {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        const {
            account,
            countries,
            createUniversitySetup
        } = this.props;

        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    createUniversitySetup(this.state.name, this.state.countryCode, account);
                }}>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6} lg={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <div className="page-row">
                                        <Typography variant="h5">
                                            <Trans>setup.university.title</Trans>
                                        </Typography>
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className="page-row">
                                        <TextField
                                            type="text"
                                            name="name"
                                            value={this.state.name}
                                            label={<Trans>university.name.label</Trans>}
                                            error={!this.state.isNameDirty && !this.state.name}
                                            required
                                            fullWidth
                                            onFocus={() => {
                                                if (this.state.isNameDirty) {
                                                    this.setState({ ...this.state, isNameDirty: false });
                                                }
                                            }}
                                            onChange={this.handleSetupInputChange}
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className="page-row">
                                        <FormControl
                                            error={!this.state.isCountryCodeDirty && !this.state.countryCode}
                                            required
                                            fullWidth
                                            onClick={() => {
                                                if (this.state.isCountryCodeDirty) {
                                                    this.setState({ ...this.state, isCountryCodeDirty: false });
                                                }
                                            }}>
                                            <InputLabel htmlFor="name-error">
                                                <Trans>global.country</Trans>
                                            </InputLabel>

                                            <Select
                                                name="countryCode"
                                                value={this.state.countryCode || ''}
                                                onChange={this.handleSetupInputChange}
                                                input={<Input id="name-error" />}
                                            >
                                                {
                                                    countries.map((country) => {
                                                        return (
                                                            <MenuItem
                                                                key={country.code}
                                                                value={country.code}>
                                                                {country.name}
                                                            </MenuItem>
                                                        );
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className="page-row">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={!this.state.countryCode || !this.state.name}>
                                            <Trans>global.proceed</Trans>
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        countries: state.nomenclatures.countries
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUniversitySetup(name, countryCode, account) {
            return dispatch(createUniversitySetup(name, countryCode))
                .then((data) => {
                    const updatedAccount = { ...account, profile: data.account.profile };

                    return dispatch(setAccount(updatedAccount));
                });
        },
        fetchCountries() {
            return dispatch(fetchCountries())
                .then((countries) => {
                    return dispatch(setCountries(countries));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UniversitySetupView);
