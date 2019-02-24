import React from 'react';
import { Route, Redirect, } from "react-router-dom";
import { componentsNavConfig, } from 'my-app/config/AppConfig.js';

const pageTitle = ({ location }) => { // model // 
  // console.log('model\n', model); // {"history":{"length":50,"action":"POP","location":{"pathname":"/archive","search":"","hash":"","key":"1pelhl"}},"location":{"pathname":"/archive","search":"","hash":"","key":"1pelhl"},"match":{"path":"/","url":"/","isExact":false,"params":{}}}
  const { pathname } = location;
  const items = componentsNavConfig.filter(r => (r.path === pathname));
  // console.log('items\n', items);
  const out = items && items[0] && items[0].title;
  return out || <Redirect to='/error404' />;
}

const RoutePageTitle = () => <Route path="/" component={pageTitle} />
 
export default RoutePageTitle;