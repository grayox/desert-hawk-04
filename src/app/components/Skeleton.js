import React from "react"
import ContentLoader from "react-content-loader"

// inspired by: http://danilowoz.com/create-content-loader/

const getCircle = ( radius, speed, primary, secondary, ) =>
  <ContentLoader
    height={2 * radius} width={2 * radius} speed={speed}
    primaryColor={primary} secondaryColor={secondary}
  >
    <circle cx={radius} cy={radius} r={radius} />
  </ContentLoader>

const getRect = ( height, width, speed, primary, secondary, ) =>
  <ContentLoader
    height={height} width={width} speed={speed}
    primaryColor={primary} secondaryColor={secondary}
  >
    <rect x="0" y="0" rx="0" ry="0" width={width} height={height} />
  </ContentLoader>

const getSkeleton = ( type, height, width, radius, speed, primary, secondary, ) => {
  const config = {
    rect   : getRect( height, width, speed, primary, secondary, ),
    circle : getCircle( radius, speed, primary, secondary, ),
  };
  return config[type];
}

const Skeleton = ({
  type='rect', height=98, width=156, radius=30, speed=2, primary='#f3f3f3', secondary='#ecebeb',
}) => getSkeleton( type, height, width, radius, speed, primary, secondary, )

export default Skeleton;