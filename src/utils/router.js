import React from 'react';
import { Router, Route, Switch, Redirect, Link as _Link } from 'react-router-dom';

import { accountType } from '../account/Account.constants';

import AccountView from '../account/Account.view';
import FeedView from '../feed/Feed.view';

import PartnerSetupView from '../setup/PartnerSetup.view';
import StudentSetupView from '../setup/StudentSetup.view';
import UniversitySetupView from '../setup/UniversitySetup.view';

import AdminProfileView from '../profile/AdminProfile.view';
import CompanyProfileView from '../profile/CompanyProfile.view';
import StudentProfileView from '../profile/StudentProfile.view';
import UniversityProfileView from '../profile/UniversityProfile.view';

export const Link = _Link;

const PrivateRoute = ({ component: Component, fallbackComponent: FallBackComponent, redirect = '/', allowed, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                (props) => allowed ? (
                    <Component {...rest} {...props} />
                ) : (
                        FallBackComponent ? (<FallBackComponent />) : (<Redirect path="*" to={redirect} />)
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
                allowed={account.authenticated}
                fallbackComponent={AccountView}
                exact
                strict
            />

            {
                account.authenticated && !account.profileId ? (
                    <PrivateRoute
                        path="*"
                        allowed={account.authenticated}
                        component={
                            account.type === accountType.university
                                ? UniversitySetupView
                                : account.type === accountType.partner
                                    ? PartnerSetupView
                                    : StudentSetupView
                        }
                    />
                ) : (
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
                        allowed={account.authenticated}
                        exact
                        strict
                    />
                )
            }

            <Route
                path="*"
                component={() => <div>Page not found!</div>}
            />
        </Switch>
    );
};

export default Router;
