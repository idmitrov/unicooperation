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
import { createPartnerSetup } from './Setup.actions.js';
import { setAccount } from '../account/Account.actions';

class PartnerSetupView extends Component {
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
        const { countries, createPartnerSetup } = this.props;

        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    createPartnerSetup(this.state.name, this.state.countryCode);
                }}>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6} lg={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <div className="page-row">
                                        <Typography variant="h5">
                                            <Trans>setup.partner.title</Trans>
                                        </Typography>
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className="page-row">

                                        <TextField
                                            type="text"
                                            name="name"
                                            value={this.state.name}
                                            label={<Trans>partner.name.label</Trans>}
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
                                                Country
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
                                            Proceed
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
        countries: state.nomenclatures.countries
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPartnerSetup(name, countryCode) {
            return dispatch(createPartnerSetup(name, countryCode))
                .then((data) => {
                    return dispatch(setAccount(data.account));
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
)(PartnerSetupView);
