import React from 'react';
import _ from '@lodash';

import {
  Chip, Badge, Avatar, Divider,
  List, ListItem, ListItemText, ListItemSecondaryAction // ListSubheader, ListItemIcon,
} from '@material-ui/core';

// import IndyBadge from "react-shields-badge";
import ShieldsIo from 'my-app/components/ShieldsIo';

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

const MiniDashboard = ({ data, micro, }) => {  
  const ready1 = data;
  if(!ready1) return;
  
  // data => { net: 1, deposits: 3, withdrawals: 2, }
  // dataAsArray => [ {key: 'net', value: 1,} , ... ]
  // ref: https://stackoverflow.com/a/37595559/1640892
  // test: https://lodash.com/docs/4.17.11#map
  const dataAsArray = _.map( data, (value, key) => ({ key, value, }));

  const getMini = () =>
    <List>
      {
        dataAsArray && dataAsArray.map( item => (
          <React.Fragment>
            <ListItem key={item.key}>
              <ListItemText primary={item.key} />
              <ListItemSecondaryAction className="pr-32">
                {item.value}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))
      }
    </List>
  
  const getMicro = () => (
    dataAsArray && dataAsArray.map( item => (
      <span className="ml-8">
        <ShieldsIo label={item.key} message={item.value} color="informational" />
      </span>
    ))
  )
    
  
  const getMiniDashboard = () => micro ? getMicro() : getMini()

  return getMiniDashboard();
}

export default MiniDashboard;