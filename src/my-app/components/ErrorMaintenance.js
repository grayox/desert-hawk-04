import React from 'react';

import { Typography, Icon, } from '@material-ui/core';

const ErrorMaintenance = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Icon>build</Icon>
      <Typography className="text-20 mb-16" color="textSecondary">Temporarily down for maintenance</Typography>
    </div>
  );
}
 
export default ErrorMaintenance;