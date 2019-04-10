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

const handleClick = () => alert('You clicked the Chip.') // eslint-disable-line no-alert

// const WidgetChip = props => <Chip className={classes.chip} />
const WidgetChip = ({ label, }) => <Chip label={label} onClick={handleClick} />

// export default withStyles(WidgetChip);
export default WidgetChip;