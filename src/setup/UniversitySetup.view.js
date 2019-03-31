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

import { fetchCountries, setCountries } from '../nomenclatures/nom.actions';

class UniversitySetupView extends Component {
    constructor(props) {
        super(props);

        this.props.fetchCountries();

        this.state = {
            name: '',
            countryId: null,
            isNameDirty: true,
            isCountryIdDirty: true
        };

        this.handleSetupInputChange = this.handleSetupInputChange.bind(this);
    }

    handleSetupInputChange(e) {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        const { countries } = this.props;

        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    console.log(this.state);
                }}>
                    <Grid container justify="center">
                        <Grid item sm={8} md={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        <Trans>setup.university.title</Trans>
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
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
                                                this.setState({...this.state, isNameDirty: false});
                                            }
                                        }}
                                        onChange={this.handleSetupInputChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl
                                        error={!this.state.isCountryIdDirty && !this.state.countryId}
                                        required
                                        fullWidth
                                        onClick={() => {
                                            if (this.state.isCountryIdDirty) {
                                                this.setState({...this.state, isCountryIdDirty: false});
                                            }
                                        }}>
                                        <InputLabel htmlFor="name-error">
                                            Country
                                        </InputLabel>

                                        <Select
                                            name="countryId"
                                            value={this.state.countryId || ''}
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
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={!this.state.countryId || !this.state.name}>
                                        Proceed
                                    </Button>
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
