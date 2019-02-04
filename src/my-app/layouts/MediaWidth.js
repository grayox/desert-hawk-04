import React from 'react';
import { Hidden, } from '@material-ui/core';

// import { useMediaPredicate } from 'react-media-hook'; // <20 downloads
// import MediaQuery from 'react-responsive'; // 122k downloads
// react-media // 67k downloads

// <MediaQuery minDeviceWidth={1280}>
//   { matches => {
//     if (matches) this.setState({device: 'laptop'});
//     return null;
//   }}
// </MediaQuery>

// <--- mobile ---| 600px |--- tablet ---| 1280px |--- laptop --->

// import MediaWidth from 'my-app/layouts/MediaWidth';

const MediaWidth = props => {
  const { mobile, tablet, laptop, } = props;
  return (
    <React.Fragment>
      <Hidden mdDown>{laptop}</Hidden>
      <Hidden xsDown lgUp>{tablet}</Hidden>
      <Hidden smUp>{mobile}</Hidden>
    </React.Fragment>
  );
}

export default MediaWidth;