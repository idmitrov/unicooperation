import React from 'react';

import {
    Typography
} from '@material-ui/core';

import './UniTitle.scss';

export default (props) => {
    const variant = props.variant || 'h6';

    return (
        <Typography className="uni-title" variant={variant}>
            {props.children}
        </Typography>
    );
}
