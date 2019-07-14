import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

import {
    Grid,
    IconButton,
    Tooltip
} from '@material-ui/core';

import {
    Edit,
    Visibility
} from '@material-ui/icons';

import { accountType } from '../account/Account.constants';
import { grid } from '../app/App.constants';

import UniIntroCard from '../components/uni-intro-card/UniIntroCard.component';

import { selectInterviewList} from './Interview.selector';
import { fetchMineInterviews, setInterviewsList } from './Interview.actions';

class InterviewListView extends Component {
    constructor(props) {
        super(props);

        this.props.fetchMyInterviews();
    }

    render() {
        const {
            interviews,
            loggedInAccount
        } = this.props;

        return (
            <div className="page-row">
                <Grid container justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid container spacing={grid.spacing}>
                            {
                                interviews ? (
                                    interviews.map((interview, index) => {
                                        return (
                                            <Grid item key={index} xs={12} sm={6}>
                                                <UniIntroCard
                                                    avatar={interview.conver}
                                                    title={
                                                        interview.title.length < 17
                                                            ? interview.title
                                                            : `${interview.title.substring(0, 17)}...`
                                                    }
                                                    hoverText={
                                                        <Trans>ads.list.item.intro</Trans>
                                                    }
                                                    actions={
                                                        <Fragment>
                                                            <Link to={`/interview/details/${interview._id}`}>
                                                                <Tooltip title={<Trans>ads.list.item.details</Trans>}>
                                                                    <IconButton className="ad-icon-button">
                                                                        <Visibility className="ad-icon" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Link>

                                                            {
                                                                loggedInAccount.type === accountType.partner &&
                                                                loggedInAccount.profile === interview.interviewer ? (
                                                                    <Link to={`/interview/edit/${interview._id}`}>
                                                                        <Tooltip title={<Trans>ads.list.item.edit</Trans>}>
                                                                            <IconButton className="ad-icon-button">
                                                                                <Edit className="ad-icon" />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Link>
                                                                ) :(null)
                                                            }
                                                        </Fragment>
                                                    }
                                                />
                                            </Grid>
                                        )
                                    })
                                ) : (null)
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export const mapStateToProps = (state) => {
    return {
        loggedInAccount: state.account,
        interviews: selectInterviewList(state)
    };
}

export const mapDispatchToProps = (dispatch) => {
    return {
        fetchMyInterviews() {
            return dispatch(fetchMineInterviews())
                .then((interviews) => {
                    return dispatch(setInterviewsList(interviews));
                });
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterviewListView);
