import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from 'my-app/layouts/views/app/dashboard/Dashboard';
import Inbox from 'my-app/layouts/views/app/inbox/Inbox';
import Archive from 'my-app/layouts/views/app/archive/Archive';
import Outbox from 'my-app/layouts/views/app/outbox/Outbox';
import Contacts from 'my-app/layouts/views/app/contacts/Contacts';

import Settings from 'my-app/layouts/views/overhead/settings/Settings';
import Feedback from 'my-app/layouts/views/overhead/Feedback';
import Help from 'my-app/layouts/views/overhead/Help';
import Logout from 'my-app/layouts/views/overhead/Logout';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {
          // <Route exact path='/'component={Dashboard} />
          // <Route path='/project/:id' component={ProjectDetails} />
          }
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/inbox' component={Inbox} />
          <Route path='/archive' component={Archive} />
          <Route path='/outbox' component={Outbox} />
          <Route path='/contacts' component={Contacts} />

          <Route path='/settings' component={Settings} />
          <Route path='/feedback' component={Feedback} />
          <Route path='/help' component={Help} />
          <Route path='/logout' component={Logout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;