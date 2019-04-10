// inspired by // https://material-ui.com/demos/chips/#chip

import React from 'react';

import {
  Chip, // withStyles
} from '@material-ui/core';

// const styles = theme => ({
//   // root: {
//   //   display: 'flex',
//   //   justifyContent: 'center',
//   //   flexWrap: 'wrap',
//   // },
//   chip: {
//     // margin: theme.spacing.unit,
//   },
// });

// const WidgetChip = props => <Chip label={rowName} className={classes.chip} onClick={handleClick} />
const WidgetChip = ({label, }) => <Chip label={label} />

// export default withStyles(WidgetChip);
export default WidgetChip;