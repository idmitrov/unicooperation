import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Feed from '../feed/Feed.view';

export const Routes = () => {
    return (
        <Switch>
            <Route path="/"  component={Feed} exact={true} />
            <Route path="*" render={() => <div>The page was not found</div>} />
        </Switch>
    );
};

export default Router;
