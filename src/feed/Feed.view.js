import React, { Component } from 'react';
import { connect } from '../utils/store';

import {
    AppBar,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    IconButton,
    Tooltip,
    TextField,
    Avatar,
    Grow
} from '@material-ui/core';

import {
    AddComment,
    ThumbUp,
    Share,
    Message,
    Sort,
    Send,
    Close,
    Update
} from '@material-ui/icons';

import io from 'socket.io-client';

import InfiniteScroll from 'react-infinite-scroller';

import './Feed.scss';

import {
    createPublication,
    fetchPublicationsList,
    fetchRecentPublicationsList,
    setPublicationsList,
    setIsUpToDatePublicationsList,
    setRecentPublicationsList
} from './Feed.actions';

import {
    selectFeedList,
    selectFeedSkip,
    selectFeedHasMore,
    selectFeedIsUpToDate
} from './Feed.selector';

import { selectAccountToken } from '../account/Account.selector';
import appConfig from '../app/App.config';

class FeedView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInputExpanded: false,
            inputMessage: ''
        };

        // TODO: Extract consts and interfaces
        this.socket = io.connect(`${appConfig.REACT_APP_API_URL}/publications`, {
            query: {
                token: this.props.accountToken
            }
        });
        this.socket.on('connect', () => {
            this.socket.emit('join');
        });
        this.socket.on('update', () => {
            this.props.notifyForAvailableUpdate();
        });

        this.props.fetchRecentPublicationsList();
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    render() {
        const {
            list,
            skip,
            hasMorePublicationsToLoad,
            isUpdateAvailable,
            createPublication,
            fetchPublications,
            fetchRecentPublicationsList,
        } = this.props;

        return (
            <div>
                <Grid container justify="center" alignItems="flex-start">
                    <Grid item xs={12} md={6} lg={4} className="feed-content">
                        <div>
                            <AppBar
                                className="top-bar"
                                position="sticky">
                                <form onSubmit={(e) => {
                                    e.preventDefault();

                                    createPublication({
                                        content: this.state.inputMessage
                                    });

                                    this.setState({
                                        ...this.state,
                                        isInputExpanded: !this.state.isInputExpanded,
                                    });
                                }}>
                                    <div className={`bar-input ${this.state.isInputExpanded ? 'expanded' : ''}`}>
                                        <div className="bar-input-inner">
                                            <Grid container alignItems="center">
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Enter your message"
                                                        value={this.state.inputMessage}
                                                        required
                                                        multiline
                                                        fullWidth
                                                        onChange={(e) => this.setState({ ...this.state, inputMessage: e.target.value })}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>

                                    <Grid container justify="space-between" alignItems="center">
                                        <Grid item>
                                            {
                                                this.state.isInputExpanded ? (
                                                    <div>
                                                        {
                                                            this.state.inputMessage && this.state.inputMessage ? (
                                                                <Tooltip title="Submit post" placement="right">
                                                                    <IconButton type="submit">
                                                                        <Send />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            ) : (
                                                                <Tooltip title="Cancel" placement="right">
                                                                    <IconButton
                                                                        type="button"
                                                                        onClick={() => this.setState({ ...this.state, isInputExpanded: false })}>
                                                                        <Close />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            )
                                                        }
                                                    </div>
                                                ) : (
                                                    <Tooltip title="New post" placement="right">
                                                        <IconButton
                                                            type="button"
                                                            onClick={() => this.setState({ ...this.state, isInputExpanded: true, inputMessage: '' })}>
                                                            <Message />
                                                        </IconButton>
                                                    </Tooltip>
                                                )
                                            }
                                        </Grid>


                                        <Grid item>
                                            {
                                                isUpdateAvailable ? (
                                                    <Tooltip title="Get latest publications">
                                                        <IconButton onClick={fetchRecentPublicationsList}>
                                                            <Update />
                                                        </IconButton>
                                                    </Tooltip>
                                                ) : (null)
                                            }

                                            <Tooltip title="Sort by" placement="left">
                                                <IconButton type="button">
                                                    <Sort />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </form>
                            </AppBar>

                            <InfiniteScroll
                                pageStart={skip}
                                hasMore={hasMorePublicationsToLoad}
                                loadMore={fetchPublications}>
                                {
                                    list.map((item, index) => {
                                        return (
                                            <Grow key={index} in>
                                                <Card className="feed-item page-row">
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar
                                                                src={item.publisher ? item.publisher.avatar || `${process.env.PUBLIC_URL}/avatar-default.png` : null}
                                                            /> }
                                                        title={item.publisher ? item.publisher.name || item.publisher.firstName : ''}
                                                        subheader={item.updatedAt}
                                                    />

                                                    <CardContent>
                                                        {item.content}
                                                    </CardContent>

                                                    <CardActions>
                                                        <Grid container alignItems="center">
                                                            <Grid item xs={true}>
                                                                <Tooltip title="Add comment" placement="top">
                                                                    <IconButton>
                                                                        <AddComment />
                                                                    </IconButton>
                                                                </Tooltip>

                                                                <Tooltip title="Share" placement="top">
                                                                    <IconButton>
                                                                        <Share />
                                                                    </IconButton>
                                                                </Tooltip>

                                                                <Tooltip title="Like" placement="top">
                                                                    <IconButton>
                                                                        <ThumbUp />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>

                                                            {/* <Grid item>
                                                                Likes 1 / comments 10
                                                            </Grid> */}
                                                        </Grid>
                                                    </CardActions>
                                                </Card>
                                            </Grow>
                                        )
                                    })
                                }
                            </InfiniteScroll>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accountToken: selectAccountToken(state),
        list: selectFeedList(state),
        skip: selectFeedSkip(state),
        hasMorePublicationsToLoad: selectFeedHasMore(state),
        isUpdateAvailable: !selectFeedIsUpToDate(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecentPublicationsList() {
            return dispatch(fetchRecentPublicationsList())
                .then((publications) => {
                    return dispatch(setRecentPublicationsList(publications));
                });
        },
        fetchPublications() {
            return dispatch(fetchPublicationsList())
                .then((publications) => {
                    return dispatch(setPublicationsList(publications));
                });
        },
        createPublication(publication) {
            return dispatch(createPublication(publication))
                .then((publicationsUpdated) => {
                    return dispatch(setRecentPublicationsList(publicationsUpdated));
                });
        },
        notifyForAvailableUpdate() {
            return dispatch(setIsUpToDatePublicationsList(false));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
