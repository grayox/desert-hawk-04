import React from 'react';
import _ from '@lodash';

import {
  Chip, Badge, Avatar, Divider,
  List, ListItem, ListItemText, ListItemSecondaryAction, ListSubheader, // ListItemIcon,
} from '@material-ui/core';

// import IndyBadge from "react-shields-badge";
import ShieldsIo from 'my-app/components/ShieldsIo';

import { componentsNavConfig, } from 'my-app/config/AppConfig';
import { DashboardGridConfig, } from 'my-app/config/DashboardGridConfig';

export const Demo = (
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
)

// https://codereview.stackexchange.com/a/178787/78788
// https://lodash.com/docs/4.17.11#includes
// const a = [{j: 'b', c: 'd'},{j: 'e', c: 'f'},{j: 'g', c: 'h'},];
// const b = [ 'b', 'g', ];
//  _.filter(a, v => _.includes(b, v.j));
// => [Object {c: "d", j: "b"}, Object {c: "h", j: "g"}]
const picker = [ 'net', 'deposits', 'withdrawals', ];

const getMicro = ( key, value, ) =>
  <span className="ml-8"><ShieldsIo label={key} message={value} color="informational" /></span>

const getMini = ( key, value, ) =>
  <React.Fragment>
    <ListItem key={key} divider /*light*/>
      <ListItemText primary={key} />
      <ListItemSecondaryAction className="pr-32">{value}</ListItemSecondaryAction>
    </ListItem>
  </React.Fragment>

const MiniDashboard = ({ data, micro, }) => {  
  const ready1 = data;
  if(!ready1) return;

  const getSubheader = () => micro ? undefined : <ListSubheader component="div">Dashboard</ListSubheader>
  
  // data => { net: 1, deposits: 3, withdrawals: 2, }
  // dataAsArray => [ {key: 'net', value: 1,} , ... ]
  // ref: https://stackoverflow.com/a/37595559/1640892
  // test: https://lodash.com/docs/4.17.11#map
  const dataAsArray = _.map( data, (value, key) => ({ key, value, }));
  const pickedData = _.filter(dataAsArray, item => _.includes(picker, item.key));
  // console.log('pickedData\n', pickedData,);

  const getMiniDashboard = () => (
    pickedData && pickedData.length &&
    <List dense subheader={getSubheader()}>
      <Divider/>
      {pickedData.map(item => ( micro ? getMicro(item.key, item.value,) : getMini(item.key, item.value,)))}
    </List>
  )
  
  return getMiniDashboard();
}

export default MiniDashboard;