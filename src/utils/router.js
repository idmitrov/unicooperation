import React from 'react';
import { Router, Route, Switch, Link as _Link } from 'react-router-dom';

import FeedView from '../feed/Feed.view';
import WelcomeView from '../welcome/Welcome.view';
import ProfileView from '../profile/Profile.view';

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
            <PrivateRoute
                path="/"
                component={FeedView}
                fallbackComponent={WelcomeView}
                authenticated={authenticated}
                exact={true}
            />

            <PrivateRoute
                path="/profile"
                component={ProfileView}
                fallbackComponent={WelcomeView}
                authenticated={authenticated}
                exact={true}
            />

            <Route
                path="*"
                render={() => <div>The page was not found</div>}
            />
        </Switch>
    );
};

export default Router;
