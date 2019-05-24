import React from 'react';
import { Hidden, } from '@material-ui/core';

// <--- mobile ---| 600px |--- tablet ---| 1280px |--- laptop --->

// import MediaWidth from 'my-app/layouts/MediaWidth';
// <MediaWidth
//   mobile={<MobileDrawer/>}
//   tablet={<TabletDrawer/>}
//   laptop={<LaptopDrawer/>}
// />

const MediaWidth = ({ mobile, tablet, laptop, }) => (
  <React.Fragment>
    <Hidden mdDown>{laptop}</Hidden>
    <Hidden xsDown lgUp>{tablet}</Hidden>
    <Hidden smUp>{mobile}</Hidden>
  </React.Fragment>
)

export default MediaWidth;