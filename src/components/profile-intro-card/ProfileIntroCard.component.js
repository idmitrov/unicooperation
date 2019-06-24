import React from 'react';

import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    Avatar,
    Zoom
} from '@material-ui/core';

export default (props) => {
    const {
        actions,
        title,
        avatar,
        hoverText,
        subtitle
    } = props;

    return (
        <Zoom in>
            <Card elevation={4} className="match">
                <CardHeader
                    title={title}
                    subheader={subtitle}
                    avatar={
                        avatar ? (
                            <Avatar src={avatar} />
                        ) : (
                            <Avatar>{title ? title[0] : '?'}</Avatar>
                        )
                    }
                />

                {
                    actions ? (
                        <CardContent className="match-content">
                            <Grid container alignItems="center" justify="space-between" wrap="nowrap">
                                <Grid item xs={true}>
                                    {hoverText}
                                </Grid>

                                <Grid item>
                                    {actions}
                                </Grid>
                            </Grid>
                        </CardContent>
                    ) : (null)
                }
            </Card>
        </Zoom>
    );
}
