import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import hash from 'object-hash'; // https://www.npmjs.com/package/object-hash

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
  };
  const out = ref[variant];
  return out ? out : null;
}

const getSrcAdorable = ({ size, message, }) => (`http://api.adorable.io/avatars/${size}/${getDigest(message)}.png`) // src="http://api.adorable.io/avatars/50/loremipsum.png"
// const getSrcGravatar = ({ size, message, variant, }) => (`http://www.gravatar.com/avatar/${getDigest(message)}?f=y&s=${size}&d=${getVariant(variant)}`)
const getSrcGravatar = ({ size, message, variant, }) => (`http://www.gravatar.com/avatar/${getDigest(message)}?f=y&s=${size}&d=${variant}`)
const getSrcRobohash = ({ message, variant, }) => (`https://robohash.org/${getDigest(message)}.png${getRoboExt(variant)}`)
const getSrc = props => {
  const { variant } = props;
  const ref = {
    adorable  : getSrcAdorable(props) ,
    wavatar   : getSrcGravatar(props) ,
    monsterid : getSrcGravatar(props) ,
    monster   : getSrcGravatar(props) ,
    retro     : getSrcGravatar(props) ,
    random    : getSrcGravatar(props) ,
    robohash  : getSrcRobohash(props) ,
    robohash1 : getSrcRobohash(props) ,
    robohash2 : getSrcRobohash(props) ,
    robohash3 : getSrcRobohash(props) ,
    robohash4 : getSrcRobohash(props) ,
  };
  const out = ref[variant];
  return out ? out : null;
}

class HashAvatar extends Component {
  
  state = { 
    digest: null,
  }

  image = props => (
    <img
      alt="avatar"
      // className="w-full rounded"
      className={classNames(props.rounded, 'w-full')}
      // src="http://api.adorable.io/avatars/50/loremipsum.png"
      // gravatars: https://en.gravatar.com/site/implement/images/
      // src="http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&s=50&d=wavatar"   
      
      //src={`http://www.gravatar.com/avatar/${message}?f=y&s=50&d=wavatar`}
      // src={getSrcGravatar(props)}
      // src={getSrcAdorable(props)}
      // src={getSrcRobohash(props)}
      src={getSrc(props)}

      // src={`http://www.gravatar.com/avatar/${message}?f=y&s=50&d=monsterid`}
      // src={`http://www.gravatar.com/avatar/${message}?f=y&s=50&d=retro`}
      // src={`http://www.gravatar.com/avatar/${message}?f=y&s=50&d=robohash`}
      // robohash: https://robohash.org
      // src={`https://robohash.org/${message}.png`}
      // src={`https://robohash.org/${message}.png?set=set2`}
      // src={`https://robohash.org/${message}.png?set=set3`}
      // src={`https://robohash.org/${message}.png?set=set4`}
    />
  )

  render() {
    const { classes, message, type, variant, size, rounded, } = this.props;
    const { digest, } = this.state;
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
    'adorable' , 'wavatar'   , 'monsterid' , 'retro'     , // 'random' (deprecated),
    'robohash' , 'robohash1' , 'robohash2' , 'robohash3' , 'robohash4' ,
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