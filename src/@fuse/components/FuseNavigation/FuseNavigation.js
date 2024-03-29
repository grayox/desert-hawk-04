import React, { Component } from 'react';
// import FuseNavVerticalGroup from './vertical/FuseNavVerticalGroup';
// import FuseNavVerticalCollapse from './vertical/FuseNavVerticalCollapse';
import FuseNavVerticalItem from './vertical/FuseNavVerticalItem';
import FuseNavHorizontalGroup from './horizontal/FuseNavHorizontalGroup';
import FuseNavHorizontalCollapse from './horizontal/FuseNavHorizontalCollapse';
import FuseNavHorizontalItem from './horizontal/FuseNavHorizontalItem';
import { Divider, List, Hidden } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  navigation: PropTypes.array.isRequired
};

const defaultProps = {
  layout: "vertical",
};

class FuseNavigation extends Component {
  render() {
    const { navigation, layout, active, } = this.props; // onPress,
    // console.log('item\n', item,);
    // console.log('navigation\n', navigation,);

    // const handleClick = () => alert('clicked')

    const verticalNav = (
      <List className="whitespace-no-wrap">
        {
          navigation.map( item => (
            
            // item.type is defined at src/app/config/AppConfig.js > getComponentsNavConfig.out[n].type

            <React.Fragment key={item.id}>
          
              {
              // // deprecated: use dashboards to achieve nesting; recursively if necessary
              // {item.type === 'group' && (
              //   <FuseNavVerticalGroup item={item} nestedLevel={0} active={active} />
              // )}

              // // deprecated: use dashboards to achieve nesting; recursively if necessary
              // {item.type === 'collapse' && (
              //   <FuseNavVerticalCollapse item={item} nestedLevel={0} active={active} />
              // )}

              // add new type subcategory: navList
              }

              {item.type && item.type.navList && (item.type.navList === 'item') && (
                <FuseNavVerticalItem item={item} nestedLevel={0} active={active}
                // onPress={() => alert('clicked')}
                // onPress={handleClick}
                />
              )}

              {item.type && (item.type === 'divider') && (
                <Divider className="my-24 opacity-25 border border-white color-white bg-white" />
              )}
          
              {
                // () => {
                //   switch(item.type) {
                //     case 'group':
                //       return <FuseNavVerticalGroup item={item} nestedLevel={0} active={active} />
                //     case 'collapse':
                //       return <FuseNavVerticalCollapse item={item} nestedLevel={0} active={active} />
                //     case 'item':
                //       return <FuseNavVerticalItem item={item} nestedLevel={0} active={active} />
                //     case 'divider':
                //       return <Divider className="my-24 opacity-25 border border-white color-white bg-white" />
                //     default:
                //       return null;
                // }}
              }

            </React.Fragment>
          ))
        }
      </List>
    );

    const horizontalNav = (
      <List className="whitespace-no-wrap flex p-0">
        {
          navigation.map((item) => (

            <React.Fragment key={item.id}>

              {item.type === 'group' && (
                <FuseNavHorizontalGroup item={item} nestedLevel={0} />
              )}

              {item.type === 'collapse' && (
                <FuseNavHorizontalCollapse item={item} nestedLevel={0} />
              )}

              {item.type === 'item' && (
                <FuseNavHorizontalItem item={item} nestedLevel={0}
                  // onPress={onPress}
                />
              )}

              {item.type === 'divider' && (
                <Divider className="my-16" />
              )}
            </React.Fragment>
          ))
        }
      </List>
    );


    if (navigation.length > 0) {
      switch (layout) {
        case 'horizontal':
          {
            return (
              <React.Fragment>
                <Hidden lgUp>
                  {verticalNav}
                </Hidden>
                <Hidden mdDown>
                  {horizontalNav}
                </Hidden>
              </React.Fragment>
            )
          }
        case 'vertical':
        default:
          {
            return verticalNav;
          }
      }
    }
    else {
      return '';
    }
  }
}

FuseNavigation.propTypes = propTypes;
FuseNavigation.defaultProps = defaultProps;

export default withRouter(FuseNavigation);
