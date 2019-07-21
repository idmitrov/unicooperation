import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Grid,
    Typography,
    Select,
    FormControl,
    InputLabel,
    MenuItem
} from '@material-ui/core';

import { Trans, withTranslation } from 'react-i18next';

import { languages } from './Settings.constants';
import { setLanguage } from './Settings.actions';
class SettingsView extends Component {
    render() {
        const {
            language,
            setLanguage
        } = this.props;

        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    <div className="page-row">
                        <Typography variant="h5">
                            <Trans>settings.title</Trans>
                        </Typography>
                    </div>

                    <div className="page-row">
                        <FormControl fullWidth>
                            <InputLabel htmlFor="language">
                                <Trans>global.language</Trans>
                            </InputLabel>

                            <Select
                            value={language}
                            onChange={(e) => {
                                this.props.i18n.changeLanguage(e.target.value);

                                setLanguage(e.target.value);
                            }}
                            inputProps={{ id: 'language' }}>
                                {
                                    languages.map((language) => {
                                        return (
                                            <MenuItem
                                                key={language.name}
                                                value={language.value}>
                                                {language.label}
                                            </MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.settings.language
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLanguage(language) {
            return dispatch(setLanguage(language));
        }
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withTranslation()(SettingsView));
