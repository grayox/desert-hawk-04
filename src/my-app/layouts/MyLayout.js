import React from 'react';

import MediaWidth from './MediaWidth';
import LaptopDrawer from './Drawers/LaptopDrawer';
import TabletDrawer from './Drawers/TabletDrawer';
import MobileDrawer from './Drawers/MobileDrawer';
// import ResponsiveDrawer from './Drawers/ResponsiveDrawer';

const MyLayout = props => {
  return (
    <MediaWidth
      laptop={<LaptopDrawer/>}
      tablet={<TabletDrawer/>}
      mobile={<MobileDrawer/>}
      // <ResponsiveDrawer/>
    />
  );
}

export default MyLayout;