import React from 'react';
import { Router, Route, Switch, Link as _Link } from 'react-router-dom';

import FeedView from '../feed/Feed.view';
import AccountView from '../account/Account.view';
import StudentProfileView from '../profile/StudentProfile.view';
import UniversityProfileView from '../profile/UniversityProfile.view';
import CompanyProfileView from '../profile/CompanyProfile.view';
import AdminProfileView from '../profile/AdminProfile.view';

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

export const Routes = ({ authenticated, accountType }) => {
    return (
        <Switch>
            <PrivateRoute
                path="/"
                component={FeedView}
                fallbackComponent={AccountView}
                authenticated={authenticated}
                exact={true}
            />

            <PrivateRoute
                path="/profile"
                component={
                    accountType === "Admin"
                        ? AdminProfileView
                        : accountType === 'University'
                            ? UniversityProfileView : accountType === 'Company'
                                ? CompanyProfileView : StudentProfileView
                }
                fallbackComponent={AccountView}
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
