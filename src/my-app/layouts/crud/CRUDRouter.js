import React from 'react';
import { Route, } from 'react-router-dom'; // BrowserRouter as Router, Link 

import { componentsNavConfig } from 'my-app/config/AppConfig';
// import CRUDLoadData from './CRUDLoadData';

const Child = ({ match: { params: { id }}}) => {
  const matches = componentsNavConfig.filter(r => (r.id === id));
  const item = matches[0];
  const config = item.crudConfig;
  const { condensed, actionable, creatable, readable, updatable, deletable, } = config;
  return (
    <div>{id}</div>
    // <CRUDLoadData
    //   // items={items}
    //   condensed={condensed}
    //   actionable={actionable}
    //   creatable={creatable}
    //   readable={readable}
    //   updatable={updatable}
    //   deletable={deletable}
    // />
  )
};

const CRUDRouter = () => {
  return (
    // ref: https://reacttraining.com/react-router/web/example/url-params
    <Route path="/:id" component={Child} />
  );
}

export default CRUDRouter;
