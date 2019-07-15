// usage
// import ZipCodeInput from 'my-app/components/ZipCodeInput';
// <ZipCodeInput />

import React, { Component } from 'react';

class ZipCodeInput extends Component {
  
  state = { 
    zip: '',
    valid: false,
  }

  render() {
    return (
      <React.Fragment>
        Hello world
      </React.Fragment>
    );
  }

}

// ZipCodeInput.propTypes = {
//   classes: PropTypes.object, //.isRequired,
//   message: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]),  
//   rounded: PropTypes.bool,
//   size: PropTypes.number,
//   type: PropTypes.oneOf(['avatar', 'image']),
//   variant: PropTypes.oneOf([
//     'adorable' , 'wavatar'   , 'monsterid' , 'retro'     ,
//     'robohash' , 'robohash1' , 'robohash2' , 'robohash3' , 'robohash4' , 'robohashx' ,
//     'mp'       , 'identicon' , 'ui'        , 'uic'       , // 'random' (deprecated),
//   ]),
// };

// ZipCodeInput.defaultProps = {
//   message: '205e460b479e2e5b48aec07710c08d50',
//   type: 'avatar',
//   variant: 'wavatar',
//   random: false,
//   rounded: true,
//   size: 50,
// };
 
export default ZipCodeInput;
// export default withStyles(styles)(ZipCodeInput);