import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
    AppBar,
    Grid,
    IconButton,
    TextField,
    Tooltip,
    Typography,
    Chip
} from '@material-ui/core';

import {
    FilterList,
    Close,
    Done,
    Visibility,
    GroupWork
} from '@material-ui/icons';

import '../app/App.scss';
import './Matcher.scss';

import { grid } from '../app/App.constants';

import {
    getMatches,
    setMatches,
    setMatcherTotal,
    setMatcherTitle,
    changeMatcherFilter,
    addMatcherSkill,
    deleteMatcherSkill
} from './Matcher.actions';

import { filterSkills, setSkillsFilter } from '../shared/shared.actions';

import UniIntroCard from '../components/uni-intro-card/UniIntroCard.component';
import UniAutocomplete from '../components/uni-autocomplete/UniAutocomplete.component';

class MatcherView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInputExpanded: false
        };

        this.skillsToAdd = createRef();
        this.props.getMatches();
    }

    render() {
        const {
            title,
            matches,
            skills,
            addMatcherSkill,
            deleteMatcherSkill,
            suggestedSkills,
            setTitle,
            getMatches,
            changeMatcherFilter,
            fetchSkillsSuggestions
        } = this.props;

        return (
            <Grid container justify="center" alignItems="flex-start">
                <Grid item xs={12} md={6} lg={4}>
                    <div>
                        <AppBar
                            className="top-bar"
                            position="sticky">
                            <form onSubmit={(e) => {
                                e.preventDefault();

                                // TODO: Apply filter and call API with the filter
                                getMatches();

                                this.setState({
                                    ...this.state,
                                    isInputExpanded: !this.state.isInputExpanded,
                                });
                            }}>
                                <div className={`bar-input ${this.state.isInputExpanded ? 'expanded' : ''}`}>
                                    <div className="bar-input-inner">
                                        <Grid container alignItems="flex-start" spacing={grid.spacing}>
                                            <Grid item xs={4}>
                                                <TextField
                                                    name="experience"
                                                    type="number"
                                                    label="Experience"
                                                    onChange={changeMatcherFilter}
                                                />
                                            </Grid>

                                            <Grid item xs={true}>
                                                <UniAutocomplete
                                                    inputRef={this.skillsToAdd}
                                                    suggestions={suggestedSkills}
                                                    label={<Trans>student.skill.label</Trans>}
                                                    type="search"
                                                    fullWidth
                                                    events={{
                                                        change: (e) => fetchSkillsSuggestions(e.target.value),
                                                        select: (e) => {
                                                            this.skillsToAdd.current.value = '';

                                                            addMatcherSkill(e.currentTarget.innerHTML)
                                                        }
                                                    }}
                                                />

                                                {
                                                    skills ? (
                                                        <div className="page-row">
                                                            <Grid container spacing={grid.spacingSmall}>
                                                                {
                                                                    skills.map((skill, index) => {
                                                                        return (
                                                                        <Grid item key={index}>
                                                                            <Chip
                                                                                label={skill}
                                                                                onDelete={() => deleteMatcherSkill(skill)}
                                                                            />
                                                                        </Grid>
                                                                        );
                                                                    })
                                                                }
                                                            </Grid>
                                                        </div>
                                                    ) : (null)
                                                }
                                            </Grid>

                                        </Grid>
                                    </div>
                                </div>

                                <Grid container justify="space-between" alignItems="center">
                                    <Grid item xs={true}>
                                        {
                                            this.state.isInputExpanded ? (
                                                <div>
                                                    <Tooltip title={<Trans>global.cancel</Trans>} placement="right">
                                                        <IconButton
                                                            type="button"
                                                            onClick={() => this.setState({ ...this.state, isInputExpanded: false })}>
                                                            <Close />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            ) : (
                                                <TextField
                                                    label="Title"
                                                    value={title}
                                                    fullWidth
                                                    onChange={(e) => {
                                                        setTitle(e.target.value);
                                                        getMatches();
                                                    }}
                                                />
                                            )
                                        }
                                    </Grid>

                                    <Grid item>
                                        {
                                            this.state.isInputExpanded ? (
                                                <div>
                                                    <Tooltip title={<Trans>global.apply</Trans>} placement="left">
                                                        <IconButton type="submit">
                                                            <Done />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            ) : (
                                                <Tooltip title={<Trans>global.filter</Trans>} placement="left">
                                                    <IconButton type="button" onClick={() => this.setState({ ...this.state, isInputExpanded: true })}>
                                                        <FilterList />
                                                    </IconButton>
                                                </Tooltip>
                                            )
                                        }
                                    </Grid>
                                </Grid>
                            </form>
                        </AppBar>

                        <div className="page-row">
                            <Typography variant="h5">
                                <Trans>match.title</Trans>
                            </Typography>
                        </div>

                        {
                            matches && matches.length ? (
                                <div className="matches-grid page-row">
                                    <Grid container alignItems="stretch" spacing={grid.spacing}>
                                        {
                                            matches.map((match, index) => {
                                                return(
                                                    <Grid item key={index} xs={12} sm={6}>
                                                        <UniIntroCard
                                                            avatar={match.avatar}
                                                            title={match.firstName}
                                                            subtitle={match.title}
                                                            hoverText={
                                                                <Trans values={{
                                                                    profileName: match.firstName.length < 15
                                                                        ? match.firstName
                                                                        : `${match.firstName.substring(0, 14)}...`
                                                                }}>
                                                                    match.profile.intro
                                                                </Trans>
                                                            }
                                                            actions={
                                                                <Fragment>
                                                                    <Tooltip title={<Trans>match.profile.view</Trans>}>
                                                                        <Link to={`profile/${match.account.type}/${match._id}`}>
                                                                            <IconButton className="match-icon-button">
                                                                                <Visibility className="match-icon" />
                                                                            </IconButton>
                                                                        </Link>
                                                                    </Tooltip>

                                                                    <Tooltip title={<Trans>match.profile.invite</Trans>}>
                                                                        <IconButton className="match-icon-button">
                                                                            <GroupWork className="match-icon" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Fragment>
                                                            }
                                                        />
                                                    </Grid>
                                                );
                                            })
                                        }
                                    </Grid>
                                </div>
                            ) : (null)
                        }
                    </div>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.matcher.title,
        skills: state.matcher.skills,
        matches: state.matcher.matches,
        suggestedSkills: state.shared.skills
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMatcherFilter(e) {
            const { name, value } = e.target;

            return dispatch(changeMatcherFilter(name, value));
        },
        setTitle(titleValue) {
            return dispatch(setMatcherTitle(titleValue));
        },
        getMatches() {
            return dispatch(getMatches())
                .then((matches) => {
                    dispatch(setMatcherTotal(matches.total));

                    return dispatch(setMatches(matches.list));
                });
        },
        fetchSkillsSuggestions(skillName) {
            return dispatch(filterSkills(skillName))
                .then((skills) => {
                    return dispatch(setSkillsFilter(skills.list));
                })
        },
        addMatcherSkill(skill) {
            return dispatch(addMatcherSkill(skill));
        },
        deleteMatcherSkill(skill) {
            return dispatch(deleteMatcherSkill(skill));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (MatcherView);
