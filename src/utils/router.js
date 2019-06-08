import React from 'react';
import { Router, Route, Switch, Redirect, Link as _Link } from 'react-router-dom';

import { accountType } from '../account/Account.constants';

import AccountView from '../account/Account.view';
import FeedView from '../feed/Feed.view';

import PartnerSetupView from '../setup/PartnerSetup.view';
import StudentSetupView from '../setup/StudentSetup.view';
import UniversitySetupView from '../setup/UniversitySetup.view';

import AdminProfileView from '../profile/AdminProfile.view';
import PartnerProfileView from '../profile/PartnerProfile.view';
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
    const authenticated = account.authenticated && account.profileId;

    return (
        <Switch>
            <PrivateRoute
                path="/"
                component={
                    account.type === accountType.partner ? (PartnerProfileView) : (FeedView)
                }
                allowed={authenticated}
                fallbackComponent={
                    !account.authenticated ? (AccountView) : (
                        account.type === accountType.university ? UniversitySetupView :
                        account.type === accountType.student ? StudentSetupView :
                        account.type === accountType.partner ? PartnerSetupView : (null)
                    )
                }
                exact
                strict
            />

            <PrivateRoute
                path="/profile/me"
                allowed={authenticated}
                component={
                    account.type === accountType.admin
                        ? AdminProfileView
                        : account.type === accountType.university
                            ? UniversityProfileView
                            : account.type === accountType.partner
                                ? PartnerProfileView
                                : StudentProfileView
                }
                exact
                strict
            />

            <Route
                path="/profile/:type/:profileId"
                render={
                    (props) => {
                        if (authenticated) {
                            switch (props.match.params.type) {
                                case accountType.partner: return <PartnerProfileView />
                                case accountType.university: return <UniversityProfileView />
                                case accountType.student: return <StudentProfileView />
                                default: return <Redirect path="*" to="/" />;
                            }
                        } else {
                            return <Redirect path="*" to="/" />;
                        }
                    }
                }
            />

            <Route
                path="*"
                component={() => <div>Page not found!</div>}
            />
        </Switch>
    );
};

export default Router;
