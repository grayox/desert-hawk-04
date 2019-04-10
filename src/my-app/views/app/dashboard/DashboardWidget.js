// inspired by: https://github.com/withinpixels/fuse-react/blob/v2.2.3/src/app/main/apps/dashboards/project/widgets/Widget4.js

import React, { Component } from 'react';
import {
  withStyles, Typography, Slide,
  Paper, Chip, // Icon, IconButton,
} from '@material-ui/core';

import WidgetMenu from './WidgetMenu';

// import { FuseAnimate, } from '@fuse';

// import ReactFitText from 'react-fittext';

const styles = theme => ({
  // root: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   flexWrap: 'wrap',
  // },
  chip: {
    // margin: theme.spacing.unit,
  },
});

class DashboardWidget extends Component {
  render() {
    const { classes, widget, index, count, } = this.props;
    const { rowName, data, label, } = widget;

    const TARGET = 850;

    // linear staggered sequencing
    // const timeout = TARGET * (index + 1) / count;

    // random staggered sequencing
    const SCALAR = 1.5; // compensation for random factor; when combined with index, makes higher indexes trend differently than lower indexes
    const forwardIndex = index + 1; // loads first index first
    const reverseIndex = count - forwardIndex; // loads first index last
    const timeout = Math.round(Math.random() * TARGET * SCALAR * reverseIndex / count);

    return (
      // <FuseAnimate
      //   animation="transition.slideUpIn"
      //   duration={Math.round(Math.random() * 500)}
      //   delay={Math.round(Math.random() * 500)}
      // >
      <Slide in direction="up" timeout={timeout}>
        <Paper className="w-full rounded-16 shadow-none border-1 border-grey">
          <div className="flex items-center justify-between pr-4 pl-16 pt-4">
            {
            // <Typography className="text-16">{rowName}</Typography>
            }
            <Chip label={rowName} className={classes.chip} />
            {
            // <IconButton aria-label="more"><Icon>more_vert</Icon></IconButton>
            }
            <WidgetMenu />
          </div>
          <div className="text-center pt-12 pb-28">
            <Typography className="text-72 leading-none text-blue">{data}</Typography>
            <Typography className="text-16" color="textSecondary">{label}</Typography>
          </div>
          <div className="flex items-center px-16 h-52 border-t-1 border-grey-light">
            <Typography className="text-15 flex w-full" color="textSecondary">
              <span className="truncate">{label}</span>
              :
              <b className="pl-8">{data}</b>
            </Typography>
          </div>
        </Paper>
      </Slide>
      // </FuseAnimate>
    );
  }
}

// export default DashboardWidget;
export default withStyles(styles)(DashboardWidget);