import React from 'react';
import { Router, Route, Switch, Link as _Link } from 'react-router-dom';

import { accountType } from '../account/account.constants';

import AccountView from '../account/Account.view';
import FeedView from '../feed/Feed.view';

import AdminProfileView from '../profile/AdminProfile.view';
import CompanyProfileView from '../profile/CompanyProfile.view';
import StudentProfileView from '../profile/StudentProfile.view';
import UniversityProfileView from '../profile/UniversityProfile.view';

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

export const Routes = ({ account }) => {
    return (
        <Switch>
            <PrivateRoute
                path="/"
                component={FeedView}
                fallbackComponent={AccountView}
                authenticated={account.authenticated}
                exact={true}
            />

            <PrivateRoute
                path="/profile"
                component={
                    account.type === accountType.admin
                        ? AdminProfileView
                        : account.type === accountType.university
                            ? UniversityProfileView
                            : account.type === accountType.partner
                                ? CompanyProfileView
                                : StudentProfileView
                }
                fallbackComponent={AccountView}
                authenticated={account.authenticated}
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
