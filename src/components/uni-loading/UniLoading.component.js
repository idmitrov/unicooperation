import React, { Fragment } from 'react';
import './UniLoading.scss';

export default (props) => {
    const { loading } = props;

    return (
        <Fragment>
            {
                loading ? (<div>Loading...</div>) : (props.children)
            }
        </Fragment>
    );
}
