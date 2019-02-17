import React from 'react';

import MediaWidth from './MediaWidth';
import MobileDrawer from './drawers/MobileDrawer';
import TabletDrawer from './drawers/TabletDrawer';
import LaptopDrawer from './drawers/LaptopDrawer';
// import ResponsiveDrawer from './drawers/ResponsiveDrawer';
// import { CssBaseline, } from '@material-ui/core';

const MyLayout = props => {
  return (
    <div className="w-full overflow-auto">
      {
    // <div className="border-8 border-blue w-full overflow-auto">
      // <CssBaseline />
      }
      <MediaWidth
        mobile={<MobileDrawer/>}
        tablet={<TabletDrawer/>}
        laptop={<LaptopDrawer/>}
        // <ResponsiveDrawer/>
      />
    </div>
  );
}

export default MyLayout;