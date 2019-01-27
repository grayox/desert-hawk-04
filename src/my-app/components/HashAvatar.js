// usage
// import HashAvatar from 'my-app/components/HashAvatar';
// <HashAvatar
// message={item.timestamp}
// // variant="uic" //"robohashx" //"robohash4" //"retro" //"monsterid" //"wavatar" //"adorable" //"identicon" //"mp" //"ui" //"random"(deprecated)
// />

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import hash from 'object-hash'; // https://www.npmjs.com/package/object-hash
import bgTextColors from 'my-app/components/bgTextColors';

// const variants = [
//   'wavatar', 'monsterid', 'retro', 'adorable', // 'random',
//   'robohash', 'robohash1', 'robohash2', 'robohash3', 'robohash4',
// ]

// const getRandom = a => a[Math.floor(Math.random() * a.length)] // getRandom(variants)
// const getVariant = variant => (variant === 'random') ? getRandom(variants) : variant // getVariant(variant)
const getDigest = message => hash(message)
const getRoboExt = variant => {
  const ref = {
    robohash  : ''          ,
    robohash1 : '?set=set1' ,
    robohash2 : '?set=set2' ,
    robohash3 : '?set=set3' ,
    robohash4 : '?set=set4' ,
    robohashx : '?set=any'  ,
  };
  const out = ref[variant];
  return out ? out : null;
}
const getColors = hex => bgTextColors(hex);
const getInitials = message => {
  const digest = getDigest(message);
  const out = `${digest.charAt(0)}+${digest.charAt(1)}+${digest.charAt(2)}`;
  // console.log('initials\n', out);
  return out;
}

const getSrcMp = 'assets/images/avatars/profile.jpg'
const getSrcAdorable = ({ size, message, }) => (`//api.adorable.io/avatars/${size}/${getDigest(message)}.png`) // src="//api.adorable.io/avatars/50/loremipsum.png"
const getSrcUiAvatarGrey = ({ size, message, }) => (`//ui-avatars.com/api/?name=${getInitials(message)}&size=${size}&length=3`) // src="//ui-avatars.com/api/?name=F+7&background=FF0000&color=FFFFFF&size=50"
const getSrcUiAvatarColor = props => {
  const hex = getDigest(props.message).slice(-6);
  const colors = getColors(hex);
  const prefix = getSrcUiAvatarGrey(props);
  const suffix = (`&background=${colors.bgHex}&color=${colors.textHex}`);
  const out = (`${prefix}${suffix}`);
  // console.log('out\n', out);
  return out;
}
// const getSrcGravatar = ({ size, message, variant, }) => (`//www.gravatar.com/avatar/${getDigest(message)}?f=y&s=${size}&d=${getVariant(variant)}`)
const getSrcGravatar = ({ size, message, variant, }) => (`//www.gravatar.com/avatar/${getDigest(message)}?f=y&s=${size}&d=${variant}`)
const getSrcRobohash = ({ message, variant, }) => (`//robohash.org/${getDigest(message)}.png${getRoboExt(variant)}`)
const getSrc = props => {
  const { variant } = props;
  const ref = {
    wavatar   : getSrcGravatar      (props) ,
    monsterid : getSrcGravatar      (props) ,
    // monster   : getSrcGravatar      (props) ,
    // random    : getSrcGravatar      (props) ,
    robohash  : getSrcRobohash      (props) ,
    robohash1 : getSrcRobohash      (props) ,
    robohash2 : getSrcRobohash      (props) ,
    robohash3 : getSrcRobohash      (props) ,
    robohash4 : getSrcRobohash      (props) ,
    robohashx : getSrcRobohash      (props) ,
    retro     : getSrcGravatar      (props) ,
    adorable  : getSrcAdorable      (props) ,
    identicon : getSrcGravatar      (props) ,
    uic       : getSrcUiAvatarColor (props) , // user initials with color
    ui        : getSrcUiAvatarGrey  (props) , // user initials greyscale
 // mp        : getSrcGravatar      (props) , // user icon (mystery person)
    mp        : getSrcMp                    , // user icon (mystery person)
  };
  const out = ref[variant];
  // console.log('src\n', out);
  return out ? out : null;
}

class HashAvatar extends Component {
  
  // state = { 
  //   digest: null,
  // }

  image = props => (
    <img
      alt="avatar"

      // className="w-full rounded"
      className={classNames(props.rounded, 'w-full')}

      // initials:
      // src="//ui-avatars.com/api/?name=F+7&background=FF0000&color=FFFFFF&size=50"

      // adorable:
      // src="//api.adorable.io/avatars/50/loremipsum.png"
      
      // gravatars: https://en.gravatar.com/site/implement/images/
      // src="//www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&s=50&d=wavatar"   
      // src={`//www.gravatar.com/avatar/${message}?f=y&s=50&d=wavatar`}
      // src={`//www.gravatar.com/avatar/${message}?f=y&s=50&d=monsterid`}
      // src={`//www.gravatar.com/avatar/${message}?f=y&s=50&d=retro`}
      // src={`//www.gravatar.com/avatar/${message}?f=y&s=50&d=robohash`}

      // robohash: https://robohash.org
      // src={`//robohash.org/${message}.png`}
      // src={`//robohash.org/${message}.png?set=set2`}
      // src={`//robohash.org/${message}.png?set=set3`}
      // src={`//robohash.org/${message}.png?set=set4`}

      // implementation
      // src={getSrcGravatar(props)}
      // src={getSrcAdorable(props)}
      // src={getSrcRobohash(props)}
      src={getSrc(props)}

      // handle errors
      // src="assets/images/avatars/profile.jpg"
      // src={getSrcMp}
      alt="Image not found"
      // onerror="this.onerror=null;this.src='assets/images/avatars/profile.jpg';"
      onerror={`this.onerror=null;this.src='${getSrcMp}';`}
    />

  )

  render() {
    const {
      // classes, message, variant, size, rounded,
      type,
    } = this.props;
    // const { digest, } = this.state;
    const { props, image, } = this;
    const img = image(props);
    return (
      <React.Fragment>
        { type==='image' ? img : <Avatar>{img}</Avatar> }
      </React.Fragment>
    );
  }
}

HashAvatar.propTypes = {
  classes: PropTypes.object, //.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),  
  rounded: PropTypes.bool,
  size: PropTypes.number,
  type: PropTypes.oneOf(['avatar', 'image']),
  variant: PropTypes.oneOf([
    'adorable' , 'wavatar'   , 'monsterid' , 'retro'     ,
    'robohash' , 'robohash1' , 'robohash2' , 'robohash3' , 'robohash4' , 'robohashx' ,
    'mp'       , 'identicon' , 'ui'        , 'uic'       , // 'random' (deprecated),
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