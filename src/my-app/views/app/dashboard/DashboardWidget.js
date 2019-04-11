// inspired by: https://github.com/withinpixels/fuse-react/blob/v2.2.3/src/app/main/apps/dashboards/project/widgets/Widget4.js

// import React, { Component } from 'react';
import React from 'react';
import { Slide, Paper, } from '@material-ui/core'; // withStyles, Icon, IconButton, Typography,

import WidgetNugget from './WidgetNugget';
import WidgetMenu from './WidgetMenu';

// import { FuseAnimate, } from '@fuse';

// import ReactFitText from 'react-fittext';

const TARGET = 850; // target in milliseconds of entry animation duration
const SCALAR = 1.5; // compensation for random factor; when combined with index, makes higher indexes trend differently than lower indexes

const DashboardWidget = ({ widget, index, count, }) => { // classes,
  // count: number: total number of widgets on the dashboard (for purpose of calculating entry animation)
  // index: number: sequence number of this widget relative to all widgets on the dashboard (for purpose of calculating entry animation)
  // widget: object: data defining the widget content
  console.log('widget\n', widget,);

  const { rowName, data, label, rowDesc, desc, links, } = widget;

  // linear staggered sequencing
  // const timeout = TARGET * (index + 1) / count;

  // random staggered sequencing
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
          // <IconButton aria-label="more"><Icon>more_vert</Icon></IconButton>
          }
          <WidgetNugget type="chip" label={rowName} message={rowDesc} />
          <WidgetMenu links={links} />
        </div>
        <WidgetNugget type="kernel" label={label} message={desc} data={data} />
        {
        // // "room to grow"
        // <div className="flex items-center px-16 h-52 border-t-1 border-grey-light">
        //   <Typography className="text-15 flex w-full" color="textSecondary">
        //     <span className="truncate">{label}</span>
        //     :
        //     <b className="pl-8">{data}</b>
        //   </Typography>
        // </div>
        }
      </Paper>
    </Slide>
    // </FuseAnimate>
  )
}

export default DashboardWidget;
// export default withStyles(styles)(DashboardWidget);