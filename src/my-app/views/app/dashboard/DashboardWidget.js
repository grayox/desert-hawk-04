// inspired by: https://github.com/withinpixels/fuse-react/blob/v2.2.3/src/app/main/apps/dashboards/project/widgets/Widget4.js

// import React, { Component } from 'react';
import React from 'react';
import { Slide, Paper, Tooltip, Zoom, } from '@material-ui/core'; // withStyles, Icon, IconButton, Typography,

import { DashboardGridConfig } from 'my-app/config/DashboardGridConfig';
import WidgetNugget from './WidgetNugget';
import WidgetMenu from './WidgetMenu';

// import { FuseAnimate, } from '@fuse';

// import ReactFitText from 'react-fittext';

const TARGET = 850; // target in milliseconds of entry animation duration
const SCALAR = 1.5; // compensation for random factor; when combined with index, makes higher indexes trend differently than lower indexes

const { groups, } = DashboardGridConfig;

const DashboardWidget = ({ widget, data, index, count, }) => { // data, classes,
  // count: number: total number of widgets on the dashboard (for purpose of calculating entry animation)
  // index: number: sequence number of this widget relative to all widgets on the dashboard (for purpose of calculating entry animation)
  // widget: object: data defining the widget content
  // console.log('widget\n', widget,);

  const { group, label, description, links, } = widget; // data, desc, rowDesc,rowName,

  // linear staggered sequencing
  // const timeout = TARGET * (index + 1) / count;

  // random staggered sequencing
  const forwardIndex = index + 1; // loads first index first
  const reverseIndex = count - forwardIndex; // loads first index last
  const timeout = Math.round(Math.random() * TARGET * SCALAR * reverseIndex / count);

  const chipDescription = groups[group].description;
  const chipLabel =  groups[group].label;
  return (
    // <FuseAnimate
    //   animation="transition.slideUpIn"
    //   duration={Math.round(Math.random() * 500)}
    //   delay={Math.round(Math.random() * 500)}
    // >
    <Slide in direction="up" timeout={timeout}>
      <Paper className="w-full rounded-16 shadow-none border-1 border-grey">
        <div className="flex items-center justify-between pr-4 pl-16 pt-12">
          {
          // <div className="text-16">{rowName}</div>
          // <IconButton aria-label="more"><Icon>more_vert</Icon></IconButton>
          // substitutions: desc > description, rowName > chipLabel, rowDesc > chipDescription, rowName > group,
          }
          <Tooltip TransitionComponent={Zoom} title={chipDescription}>
            <div>
              <WidgetNugget type="chip" label={chipLabel} message={chipDescription} />
            </div>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Action links">
            <div>
              <WidgetMenu links={links} />
            </div>
          </Tooltip>
        </div>
        <Tooltip TransitionComponent={Zoom} title={description}>
          <div className="mb-24">
            <WidgetNugget type="kernel" label={label} message={description} data={data} />
          </div>
        </Tooltip>
        {
        // // "room to grow"
        // <div className="flex items-center px-16 h-52 border-t-1 border-grey-light">
        //   <div className="text-15 flex w-full" color="textSecondary">
        //     <span className="truncate">{label}</span>
        //     :
        //     <b className="pl-8">{data}</b>
        //   </div>
        // </div>
        }
      </Paper>
    </Slide>
    // </FuseAnimate>
  )
}

export default DashboardWidget;
// export default withStyles(styles)(DashboardWidget);