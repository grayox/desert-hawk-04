import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import hash from 'object-hash'; // https://www.npmjs.com/package/object-hash

const variants = [
  'wavatar', 'monsterid', 'retro', 'adorable', // 'random',
  'robohash', 'robohash1', 'robohash2', 'robohash3', 'robohash4',
]

const getRandom = a => a[Math.floor(Math.random() * a.length)] // getRandom(variants)
const getVariant = variant => (variant === 'random') ? getRandom(variants) : variant
const getDigest = message => hash(message)

const getSrcAdorable = ({ size, message, }) => ( `http://api.adorable.io/avatars/${size}/${getDigest(message)}.png` ) // src="http://api.adorable.io/avatars/50/loremipsum.png"
const getSrcGravatar = ({ size, message, variant, }) => ( `http://www.gravatar.com/avatar/${message}?f=y&s=${size}&d=${getVariant(variant)}` )
const getSrcRobohash = () => (``)

const getSrc = ({ message, type, variant, size, }) => {
  
}

class HashAvatar extends Component {
  
  state = { 
    digest: null,
  }

  render() {
    const { classes, message, type, variant, size, rounded, } = this.props;
    const { digest, } = this.state;
    const { props, getSrc, } = this;
    return ( 
      <img
        alt="avatar"
        // className="w-full rounded"
        className={classNames(rounded, 'w-full')}
        // src="http://api.adorable.io/avatars/50/loremipsum.png"
        // gravatars: https://en.gravatar.com/site/implement/images/
        // src="http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&s=50&d=wavatar"   
        
        //src={`http://www.gravatar.com/avatar/${message}?f=y&s=50&d=wavatar`}
        src={getSrcGravatar(props)}

        // src={`http://www.gravatar.com/avatar/${message}?f=y&s=50&d=monsterid`}
        // src={`http://www.gravatar.com/avatar/${message}?f=y&s=50&d=retro`}
        // src={`http://www.gravatar.com/avatar/${message}?f=y&s=50&d=robohash`}
        // robohash: https://robohash.org
        // src={`https://robohash.org/${message}.png`}
        // src={`https://robohash.org/${message}.png?set=set2`}
        // src={`https://robohash.org/${message}.png?set=set3`}
        // src={`https://robohash.org/${message}.png?set=set4`}
      />
     );
  }
}

HashAvatar.propTypes = {
  classes: PropTypes.object, //.isRequired,
  message: PropTypes.string,
  rounded: PropTypes.bool,
  size: PropTypes.number,
  type: PropTypes.oneOf(['avatar', 'image']),
  variant: PropTypes.oneOf([
    'wavatar', 'monsterid', 'retro', 'adorable', 'random',
    'robohash', 'robohash1', 'robohash2', 'robohash3', 'robohash4',
  ]),
};

HashAvatar.defaultProps = {
  message: '205e460b479e2e5b48aec07710c08d50',
  type: 'avatar',
  variant: 'wavatar',
  random: false,
  rounded: true,
  size: 50,
};
 
export default HashAvatar;