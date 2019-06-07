import React, { useState, } from 'react';
import { Route, } from 'react-router-dom'; // BrowserRouter as Router, Link 
import _ from '@lodash';

import {
  Chip, Badge, Avatar, Divider,
  List, ListItem, ListItemText, ListItemSecondaryAction, ListSubheader, // ListItemIcon,
} from '@material-ui/core';

// import IndyBadge from "react-shields-badge";
import ShieldsIo from 'my-app/components/ShieldsIo';

import { componentsNavConfig, } from 'my-app/config/AppConfig';
import { DashboardGridConfig, } from 'my-app/config/DashboardGridConfig';

export const Demo =
  // test shield badges for transmission of "data nuggets"
  <React.Fragment>
    {
    // <span className="ml-8">
    //   <IndyBadge data={['Net', 57,]} />
    // </span>
    }
    <span className="ml-8">
      <ShieldsIo label="Net" message="57" color="violetblue"/>
    </span>
    <span className="ml-8">
      <ShieldsIo label="Net" message="5,277" color="blueviolet"/>
    </span>
    {/* * * * * * WINNER BELOW! * * * * * */}
    <span className="ml-8">
      <ShieldsIo label="Net" message="5,277" color="informational"/>
    </span>
    {/* * * * * * WINNER ABOVE! * * * * * */}
    <Badge color="primary" badgeContent={57}>
      <Chip label="Net" className="ml-8" />
    </Badge>
    <Badge color="primary" badgeContent={5287}>
      <Chip label="Net" className="ml-8" />
    </Badge>
    <Badge color="primary" badgeContent="5,287">
      <Chip label="Net" className="ml-8" />
    </Badge>
    <Chip label="Net" className="ml-8" avatar={<Avatar>57</Avatar>} />
    <Chip label="57" className="ml-8" avatar={<Avatar>Net</Avatar>} />
    <Chip label="Net" className="ml-8" avatar={<Avatar>5,287</Avatar>} />
    <Chip label="5,287" className="ml-8" avatar={<Avatar>Net</Avatar>} />
  </React.Fragment>

// https://codereview.stackexchange.com/a/178787/78788
// https://lodash.com/docs/4.17.11#includes
// const a = [{j: 'b', c: 'd'},{j: 'e', c: 'f'},{j: 'g', c: 'h'},];
// const b = [ 'b', 'g', ];
//  _.filter(a, v => _.includes(b, v.j));
// => [Object {c: "d", j: "b"}, Object {c: "h", j: "g"}]

const getPickedData = ( values, selectors, definitions, ) => {
  const ready1 = (selectors && selectors.length);
  if(!ready1) return null;

  let out = [];
  selectors.forEach( selector => {
    // selector => 'net'
    // get label from definitions
    const filteredCells = _.filter(definitions, { id: selector, },); // => cell[n] => object
    const cell = filteredCells[0]; // gets first in array
    // console.log('cell\n', cell,);
    const { label, } = cell; // => 'Net'
    const value = values[selector]; // get value from values
    const item = { key: label, value, }; // attach item key-value pair
    out.push(item); // add item to out
  })
  // console.log('out\n', out,);
  return out;
}

const getMicro = ( key, value, ) =>
  <span key={key} className="ml-8"><ShieldsIo label={key} message={value} color="informational" /></span>

const getMini = ( key, value, ) =>
  <ListItem key={key} divider /*light*/>
    <ListItemText primary={key} />
    <ListItemSecondaryAction className="pr-32">{value}</ListItemSecondaryAction>
  </ListItem>

const MiniDashboard = ({ data, micro, }) => {
  const ready1 = data;
  if(!ready1) return;

  const [ browserPath , setBrowserPath , ] = useState( null );
  const [ showMini    , setShowMini    , ] = useState( true );

  const toggleShowMini = () => setShowMini(!showMini)
  
  const handleRouter = ({ match, }) => {
    // ref: https://reacttraining.com/react-router/web/example/url-params
    // console.log('match\n', match,);
    setBrowserPath(match.params.path);
    return null;
  }

  const getPicker = () => {
    // console.log('browserPath\n', browserPath,); // 'inbox'
    // componentsNavConfig[1].crudConfig.miniDashboard;
    const navItems = _.filter(componentsNavConfig, { id: browserPath, },);
    const navItem = navItems[0];
    // console.log('navItem\n', navItem,);
    const out = navItem && navItem.crudConfig && navItem.crudConfig.miniDashboard;
    // console.log('out\n', out,);
    // return [ 'net', 'deposits', 'withdrawals', ];
    return out;
  };

  const picker = getPicker();

  const getSubheader = () =>
    micro ? undefined :
    <div onClick={toggleShowMini}>
      <ListSubheader component="div">{'Dashboard'.toUpperCase()}</ListSubheader>
    </div>
  
  // data => { net: 1, deposits: 3, withdrawals: 2, }
  // dataAsArray => [ {key: 'net', value: 1,} , ... ]
  // ref: https://stackoverflow.com/a/37595559/1640892
  // test: https://lodash.com/docs/4.17.11#map
  // const dataAsArray = _.map( data, (value, key,) => ({ key, value, }));
  const { cells, } = DashboardGridConfig;
  // const pickedData = _.filter(dataAsArray, item => _.includes(picker, item.key)); // does nor sort or return labels // 
  const pickedData = getPickedData(data, picker, cells,);
  // console.log('pickedData\n', pickedData,);

  const getMiniDashboard = () =>
    <React.Fragment>
      <Route path="/:path" component={handleRouter} />
      {
        pickedData && pickedData.length &&
        <List className="p-0 mb-12" dense subheader={getSubheader()}>
          <Divider/>
            {
              pickedData.map( item =>
                ( 
                  micro
                  ?
                  getMicro(item.key, item.value,)
                  :
                  ( showMini && getMini(item.key, item.value,) )
                )
              )
            }
        </List>
      }
    </React.Fragment>
  
  return getMiniDashboard();
}

export default MiniDashboard;