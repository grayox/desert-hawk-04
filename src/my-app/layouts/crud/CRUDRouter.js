import React from 'react';
import { Route, } from 'react-router-dom'; // BrowserRouter as Router, Link 
import { compose, } from 'redux';
import { connect, } from 'react-redux';

import _ from '@lodash';
import { getComponentsNavConfig, } from 'my-app/config/AppConfig';
import CRUDContainer from './CRUDContainer';

const Child = ({ match: { params: { id }}, profile, settings, dashboard, }) => {
  // const matches = componentsNavConfig.filter(r => (r.id === id));
  const args = { profile, settings, };
  // console.log('args\n', args,);
  const componentsNavConfig = getComponentsNavConfig(args);
  const matches = _.filter(componentsNavConfig, {id,},);
  const item = matches[0];
  const { crudConfig, } = item;
  // console.log('crudConfig\n', crudConfig,);
  const {
    condensed, actionable, creatable, readable, updatable, deletable,
    searchable, filterable, sortable, starrable, alertable, miniDashboard,
  } = crudConfig;
  return (
    // <div>{id}</div>
    <CRUDContainer
      profile={profile}
      settings={settings}
      dashboard={dashboard}
      navComponentId={item && item.id}
      // items={items} // these will be acquired as state, not props
      miniDashboard={miniDashboard}
      condensed={condensed}
      actionable={actionable}
      creatable={creatable}
      readable={readable}
      updatable={updatable}
      deletable={deletable}
      searchable={searchable}
      filterable={filterable}
      sortable={sortable}
      starrable={starrable}
      alertable={alertable}
    />
  )
};

const getCRUDRouter = props => {
  const { profile, settings, dashboard, } = props;
  const ready1 = !_.isEmpty(profile) && !_.isEmpty(settings) && !_.isEmpty(dashboard);
  // console.log('ready1\n', ready1,);
  if(!ready1) return null;
  return (
    <Route
      path="/:id"
      // component={Child} // ref: https://tylermcginnis.com/react-router-pass-props-to-components/
      render={ nativeProps => Child({ ...props, ...nativeProps, })}
    />
  );
}

// ref: https://reacttraining.com/react-router/web/example/url-params
const CRUDRouter = props => getCRUDRouter(props)

// begin add

const mapStateToProps = state => {
  const profile = state
    && state.firebase
    && state.firebase.profile;
  const settings = state
    && state.myApp
    && state.myApp.reducers
    && state.myApp.reducers.userDataReducer
    && state.myApp.reducers.userDataReducer.settings;
  const dashboard = state
    && state.myApp
    && state.myApp.reducers
    && state.myApp.reducers.userDataReducer
    && state.myApp.reducers.userDataReducer.dashboard;
  // console.log('profile\n', profile,);
  // console.log('settings\n', settings,);
  // console.log('dashboard\n', dashboard,); 
  return { profile, settings, dashboard, };
}

// export default CRUDRouter;
export default compose(
  // withStyles(styles, { withTheme: true }),  
  connect( mapStateToProps, ), // mapDispatchToProps,
)(CRUDRouter)
