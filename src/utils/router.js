import React from 'react';
import { Router, Route, Switch, Link as _Link } from 'react-router-dom';

import Feed from '../feed/Feed.view';
import Welcome from '../welcome/Welcome.view';

export const Link = _Link;

const PrivateRoute = ({ component: Component, fallbackComponent: FallBackComponent, authenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                (props) => authenticated ? (
                    <Component {...rest} {...props} />
                ) : (
                    <FallBackComponent {...rest} {...props} />
                )
            }
        />
    );
}

export const Routes = ({ authenticated }) => {
    return (
        <Switch>
            <PrivateRoute path="/" component={Feed} fallbackComponent={Welcome} authenticated={authenticated} exact={true} />
            <Route path="*" render={() => <div>The page was not found</div>} />
        </Switch>
    );
};

export default Router;
