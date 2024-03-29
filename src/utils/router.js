import React from 'react';
import { Router, Route, Switch, Redirect, Link as _Link } from 'react-router-dom';

import { accountType } from '../account/Account.constants';

import AccountView from '../account/Account.view';
import AdsListView from '../ads/AdsList.view';
import AdminProfileView from '../profile/AdminProfile.view';
import FeedView from '../feed/Feed.view';
import PartnerSetupView from '../setup/PartnerSetup.view';
import PartnerProfileView from '../profile/PartnerProfile.view';
import PartnerMatcherView from '../matcher/PartnerMatcher.view';
import PartnerDashboardView from '../dashboard/PartnerDashboard.view';
import AdsInstanceView from '../ads/AdsInstance.view';
import StudentProfileView from '../profile/StudentProfile.view';
import StudentSetupView from '../setup/StudentSetup.view';
import UniversitySetupView from '../setup/UniversitySetup.view';
import UniversityProfileView from '../profile/UniversityProfile.view';
import InterviewView from '../interview/Interview.view';
import InterviewListView from '../interview/InterviewList.view';
import SettingsView from '../settings/Settings.view';

export const Link = _Link;

const PrivateRoute = ({
    component: Component,
    fallbackComponent: FallBackComponent,
    redirect = '/',
    allowed, ...rest
}) => {
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

// TODO: Extract switch case logic whiting SwitchRoute component
export const Routes = ({ account }) => {
    const authenticated = account.authenticated && account.profile;

    return (
        <Switch>
            <PrivateRoute
                path="/"
                component={
                    account.type === accountType.partner ? (PartnerDashboardView) : (FeedView)
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
                path="/matches"
                exact
                strict
                render={
                    () => {
                        if (authenticated) {
                            switch (account.type.toLowerCase()) {
                                case accountType.partner.toLocaleLowerCase(): return <PartnerMatcherView />
                                default: return <Redirect path="*" to="/" />;
                            }
                        } else {
                            return <Redirect path="*" to="/" />;
                        }
                    }
                }
            />

            <Route
                path="/profile/:type/:profile"
                exact
                strict
                render={
                    (props) => {
                        if (authenticated) {
                            switch (props.match.params.type.toLowerCase()) {
                                case accountType.partner.toLocaleLowerCase(): return <PartnerProfileView />
                                case accountType.university.toLocaleLowerCase(): return <UniversityProfileView />
                                case accountType.student.toLocaleLowerCase(): return <StudentProfileView />
                                default: return <Redirect path="*" to="/" />;
                            }
                        } else {
                            return <Redirect path="*" to="/" />;
                        }
                    }
                }
            />

            <PrivateRoute
                path="/ads/list"
                component={AdsListView}
                allowed={authenticated && [accountType.partner, accountType.student].includes(account.type)}
                strict
                exact
            />

            <PrivateRoute
                path="/ads/create"
                component={AdsInstanceView}
                allowed={authenticated && account.type === accountType.partner}
                exact
                strict
            />

            <PrivateRoute
                key="ad-edit"
                path="/ads/edit/:adId"
                component={AdsInstanceView}
                allowed={authenticated && account.type === accountType.partner}
                exact
                strict
            />

            <PrivateRoute
                key="ad-details"
                path="/ads/details/:adDetailId"
                component={AdsInstanceView}
                allowed={authenticated && [accountType.partner, accountType.student].includes(account.type)}
                exact
                strict
            />

            <PrivateRoute
                key="interview-request"
                path="/interview/request"
                component={InterviewView}
                allowed={authenticated && [accountType.partner].includes(account.type)}
                exact
                strict
            />

            <PrivateRoute
                key="interview-edit"
                path="/interview/edit/:interviewId"
                component={InterviewView}
                allowed={authenticated && [accountType.partner].includes(account.type)}
                exact
                strict
            />

            <PrivateRoute
                key="interview-details"
                path="/interview/details/:interviewDetailsId"
                component={InterviewView}
                allowed={authenticated && [accountType.student, accountType.partner].includes(account.type)}
                exact
                strict
            />

            <PrivateRoute
                path="/interview/list"
                component={InterviewListView}
                allowed={authenticated && [accountType.student, accountType.partner].includes(account.type)}
                exact
                strict
            />

            <PrivateRoute
                path="/settings"
                component={SettingsView}
                allowed={authenticated}
                exact
                strict
            />

            <Route
                path="*"
                component={() => <div>Page not found!</div>}
            />
        </Switch>
    );
};

export default Router;
