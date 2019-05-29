import React from 'react';
import { Route, } from 'react-router-dom'; // BrowserRouter as Router, Link 
import _ from '@lodash';
import { componentsNavConfig } from 'my-app/config/AppConfig';
import CRUDContainer from './CRUDContainer';

const Child = ({ match: { params: { id }}}) => {
  // const matches = componentsNavConfig.filter(r => (r.id === id));
  const matches = _.filter(componentsNavConfig, {id: id,},);
  const item = matches[0];
  const config = item.crudConfig;
  const {
    condensed, actionable, creatable, readable, updatable, deletable,
    searchable, filterable, sortable, starrable, miniDashboard,
  } = config;
  return (
    // <div>{id}</div>
    <CRUDContainer
      // items={items}
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

// ref: https://reacttraining.com/react-router/web/example/url-params
const CRUDRouter = () => <Route path="/:id" component={Child} />

export default CRUDRouter;
