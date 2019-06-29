import React from 'react';
import { Route, } from 'react-router-dom'; // BrowserRouter as Router, Link 
import { compose, } from 'redux';
import { connect, } from 'react-redux';

import _ from '@lodash';
import { getComponentsNavConfig, } from 'my-app/config/AppConfig';
import CRUDContainer from './CRUDContainer';

const Child = ({ match: { params: { id }}, profile, settings, }) => {
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
    searchable, filterable, sortable, starrable, miniDashboard,
  } = crudConfig;
  return (
    // <div>{id}</div>
    <CRUDContainer
      // items={items} // these will be acquired as state, not props
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
      miniDashboard={miniDashboard}
    />
  )
};

const getCRUDRouter = props =>
  <Route
    path="/:id"
    // component={Child} // ref: https://tylermcginnis.com/react-router-pass-props-to-components/
    render={ nativeProps => Child({ ...props, ...nativeProps, })}
  />

// ref: https://reacttraining.com/react-router/web/example/url-params
const CRUDRouter = props => getCRUDRouter(props)

// begin add

const mapStateToProps = state => {
  // console.log('state\n', state);
  const settings = state
                && state.myApp
                && state.myApp.reducers
                && state.myApp.reducers.userDataReducer
                && state.myApp.reducers.userDataReducer.settings;
  const profile = state
               && state.firebase
               && state.firebase.profile;
  return { profile, settings, }
}

// export default CRUDRouter;
export default compose(
  // withStyles(styles, { withTheme: true }),  
  connect( mapStateToProps, ), // mapDispatchToProps,
)(CRUDRouter)
