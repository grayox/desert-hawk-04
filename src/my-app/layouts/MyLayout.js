import React from 'react';

import MediaWidth from './MediaWidth';
import MobileDrawer from './drawers/MobileDrawer';
import TabletDrawer from './drawers/TabletDrawer';
import LaptopDrawer from './drawers/LaptopDrawer';
// import ResponsiveDrawer from './drawers/ResponsiveDrawer';

const MyLayout = props => {
  return (
    <MediaWidth
      mobile={<MobileDrawer/>}
      tablet={<TabletDrawer/>}
      laptop={<LaptopDrawer/>}
      // <ResponsiveDrawer/>
    />
  );
}

export default MyLayout;