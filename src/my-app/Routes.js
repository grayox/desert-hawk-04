import React, { Component } from 'react';
import { Switch, Route, Redirect, } from 'react-router-dom';
import { FuseLoadable } from '@fuse';

import Error404 from 'my-app/views/overhead/Error404';
import Dashboard from 'my-app/views/app/dashboard/Dashboard';
// import Inbox from 'my-app/views/app/inbox/Inbox';
import Inbox from 'my-app/containers/Inbox';
import Archive from 'my-app/views/app/archive/Archive';
import Outbox from 'my-app/views/app/outbox/Outbox';
import Contacts from 'my-app/views/app/contacts/Contacts';

import Settings from 'my-app/views/overhead/settings/Settings';
import Feedback from 'my-app/views/overhead/Feedback';
import Help from 'my-app/views/overhead/Help';
import Logout from 'my-app/views/overhead/Logout';

class Routes extends Component {
  render() {
    return (
      <Switch>
        {
        // <Redirect from='/'       to='/dashboard' />
        // <Redirect from='/login'  to='/dashboard' />
        // <Route path='/project/:id' component={ProjectDetails} />
        }
        {
        // // success
        // <Route path='/'    exact component={Dashboard} />
        // <Route path='/login'     component={Dashboard} />
        // <Route path='/dashboard' component={Dashboard} />
        // <Route path='/inbox'     component={Inbox}     />
        // <Route path='/archive'   component={Archive}   />
        // <Route path='/outbox'    component={Outbox}    />
        // <Route path='/contacts'  component={Contacts}  />

        // <Route path='/settings'  component={Settings}  />
        // <Route path='/feedback'  component={Feedback}  />
        // <Route path='/help'      component={Help}      />
        // <Route path='/logout'    component={Logout}    />
        // <Route                   component={Error404}  />
        }
        {
        // // fail
        // <Route path='/'    exact component={FuseLoadable({loader: () => Dashboard})} />
        // <Route path='/login'     component={FuseLoadable({loader: () => Dashboard})} />
        // <Route path='/dashboard' component={FuseLoadable({loader: () => Dashboard})} />
        // <Route path='/inbox'     component={FuseLoadable({loader: () => Inbox}    )} />
        // <Route path='/archive'   component={FuseLoadable({loader: () => Archive}  )} />
        // <Route path='/outbox'    component={FuseLoadable({loader: () => Outbox}   )} />
        // <Route path='/contacts'  component={FuseLoadable({loader: () => Contacts} )} />

        // <Route path='/settings'  component={FuseLoadable({loader: () => Settings} )} />
        // <Route path='/feedback'  component={FuseLoadable({loader: () => Feedback} )} />
        // <Route path='/help'      component={FuseLoadable({loader: () => Help}     )} />
        // <Route path='/logout'    component={FuseLoadable({loader: () => Logout}   )} />
        // <Route                   component={FuseLoadable({loader: () => Error404} )} />
        }
        {
        // latest working
        }
        <Route path='/'    exact component={FuseLoadable({loader: () => import('my-app/views/app/dashboard/Dashboard'   )})} />
        <Route path='/login'     component={FuseLoadable({loader: () => import('my-app/views/app/dashboard/Dashboard'   )})} />
        <Route path='/dashboard' component={FuseLoadable({loader: () => import('my-app/views/app/dashboard/Dashboard'   )})} />
        <Route path='/inbox'     component={FuseLoadable({loader: () => import('my-app/containers/Inbox'                )})} />
        <Route path='/archive'   component={FuseLoadable({loader: () => import('my-app/views/app/archive/Archive'       )})} />
        <Route path='/outbox'    component={FuseLoadable({loader: () => import('my-app/views/app/outbox/Outbox'         )})} />
        <Route path='/contacts'  component={FuseLoadable({loader: () => import('my-app/views/app/contacts/Contacts'     )})} />

        <Route path='/settings'  component={FuseLoadable({loader: () => import('my-app/views/overhead/settings/Settings')})} />
        <Route path='/feedback'  component={FuseLoadable({loader: () => import('my-app/views/overhead/Feedback'         )})} />
        <Route path='/help'      component={FuseLoadable({loader: () => import('my-app/views/overhead/Help'             )})} />
        <Route path='/logout'    component={FuseLoadable({loader: () => import('my-app/views/overhead/Logout'           )})} />
        <Route                   component={FuseLoadable({loader: () => import('my-app/views/overhead/Error404'         )})} />
      </Switch>
    );
  }
}

export default Routes;