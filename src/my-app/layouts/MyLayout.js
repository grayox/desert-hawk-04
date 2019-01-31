import React from 'react';

import MediaWidth from './MediaWidth';
import MobileDrawer from './Drawers/MobileDrawer';
import TabletDrawer from './Drawers/TabletDrawer';
import LaptopDrawer from './Drawers/LaptopDrawer';
// import ResponsiveDrawer from './Drawers/ResponsiveDrawer';

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