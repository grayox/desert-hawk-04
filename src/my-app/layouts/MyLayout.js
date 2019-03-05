import React from 'react';

import classNames from 'classnames';
import { withStyles, } from '@material-ui/core';

import MediaWidth from './MediaWidth';
import MobileDrawer from './drawers/MobileDrawer';
import TabletDrawer from './drawers/TabletDrawer';
import LaptopDrawer from './drawers/LaptopDrawer';
// import ResponsiveDrawer from './drawers/ResponsiveDrawer';
// import { CssBaseline, } from '@material-ui/core';

const styles = theme => ({
  wrapper: {
    height: '100vh',
  },
})

const MyLayout = props => {
  const { classes, } = props;
  return (
    <div
    // className="w-full"
    className={classNames( "w-full overflow-auto", classes.wrapper, )}
    >
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

// export default MyLayout;
export default withStyles(styles, { withTheme: true, })(MyLayout);