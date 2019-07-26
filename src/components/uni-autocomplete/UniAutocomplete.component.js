import React, { Fragment, useState } from 'react';
import {
    Grid,
    TextField
} from '@material-ui/core';

export default (props) => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <Fragment>
            <TextField
                {...props}
                onChange={(e) => {
                    if (!isOpened) {
                        setIsOpened(true);
                    }

                    props.events.change(e);
                }}
            />

            {
                props.suggestions && isOpened ? (
                    <Grid container>
                        {
                            props.suggestions.map((suggestion, index) => {
                                return (
                                    <Grid item xs={12} key={index} onClick={(e) => {
                                        setIsOpened(false);

                                        props.events.select(e);
                                    }}>
                                        {suggestion.name}
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                ) : (null)
            }
        </Fragment>
    );
}
