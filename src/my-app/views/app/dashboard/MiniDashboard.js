import React from 'react';

import {
  Chip, Badge, Avatar,
} from '@material-ui/core';

// import IndyBadge from "react-shields-badge";
import ShieldsIo from 'my-app/components/ShieldsIo';

const MiniDashboard = () => {getMiniDashboard()}

const getMiniDashboard = () =>
  <span className="ml-8">
    <ShieldsIo label="Net" message="5,277" color="informational"/>
  </span>
  // test shield badges for transmission of data nuggets
  // <span className="ml-8">
  //   <IndyBadge data={['Net', 57,]} />
  // </span>
  // <span className="ml-8">
  //   <ShieldsIo label="Net" message="57" color="violetblue"/>
  // </span>
  // <span className="ml-8">
  //   <ShieldsIo label="Net" message="5,277" color="blueviolet"/>
  // </span>
  // * * * * * WINNER BELOW! * * * * *
  // <span className="ml-8">
  //   <ShieldsIo label="Net" message="5,277" color="informational"/>
  // </span>
  // * * * * * WINNER ABOVE! * * * * *
  // <Badge color="primary" badgeContent={57} className={classes.margin}>
  //   <Chip label="Net" className="ml-8" />
  // </Badge>
  // <Badge color="primary" badgeContent={5287} className={classes.margin}>
  //   <Chip label="Net" className="ml-8" />
  // </Badge>
  // <Badge color="primary" badgeContent="5,287" className={classes.margin}>
  //   <Chip label="Net" className="ml-8" />
  // </Badge>
  // <Chip label="Net" className="ml-8" avatar={<Avatar>57</Avatar>} />
  // <Chip label="57" className="ml-8" avatar={<Avatar>Net</Avatar>} />
  // <Chip label="Net" className="ml-8" avatar={<Avatar>5,287</Avatar>} />
  // <Chip label="5,287" className="ml-8" avatar={<Avatar>Net</Avatar>} />

export default getMiniDashboard;