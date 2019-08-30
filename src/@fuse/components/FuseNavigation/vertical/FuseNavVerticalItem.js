import React from 'react';
import { Icon, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles/index';
import { NavLink, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import FuseNavBadge from './../FuseNavBadge';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from 'store/actions';
 
const propTypes = {
  item: PropTypes.shape(
    {
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      icon: PropTypes.string,
      url: PropTypes.string,
    })
};

const defaultProps = {};

const styles = theme => ({
  item: {
    height: 46, // 40 is original value; 46 is per spec: https://material.io/design/components/navigation-drawer.html#specs
    // color: 'white', //'inherit!important',
    textDecoration: 'none!important',

    // rounded right border
    width: 'calc(100% - 2px)', // -16px, right edge gap/gutter
    borderRadius: '0 23px 23px 0', // '0 20px 20px 0', // semicicular right edge
    
    paddingRight: 12,
    '&.active': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText + '!important',
      pointerEvents: 'none',
      transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
      '& .list-item-text-primary': {
        color: 'inherit'
      },
      '& .list-item-icon': {
        color: 'inherit',
      },
    },
    '&.square, &.active.square': {
      width: '100%',
      borderRadius: '0',
    },
    '& .list-item-icon': {
      color: theme.palette.secondary.contrastText + '!important',
    },
    '& .list-item-text': {
      color: theme.palette.secondary.contrastText + '!important',
    },
  },
});

const FuseNavVerticalItem = ({
  item: { id=false, exact=false, title='', icon=false, altIcon=false, badge=false, },
  classes: { item, },
  navbarCloseMobile, active,
}) => { // nestedLevel, userRole,
  // if (item.auth && (!item.auth.includes(userRole) || (userRole !== 'guest' && item.auth.length === 1 && item.auth.includes('guest')))) {
  //   return null;
  // }
  // console.log('item\n', item,);
  console.log('id\n', id,);
  console.log('icon\n', icon,);
  console.log('altIcon\n', altIcon,);

  // control indentation level based on nested hierarchy
  // note: original text sizes can be retrieved from original -orig version of this file: icons: text-16, text: text-14
  // let paddingValue = 40 + (nestedLevel * 16);
  // const listItemPadding = nestedLevel > 0 ? 'pl-' + (paddingValue > 80 ? 80 : paddingValue) : 'pl-24';
  const listItemPadding = 'pl-24';

  const getStandardIcon = () => (
    icon &&
    <Icon
      className="list-item-icon flex-no-shrink text-white"
      color="action"
    >{icon}</Icon>
  )

  const getAltIcon = () => (
    altIcon &&
    <span
      className="list-item-icon flex-no-shrink text-white mt-8 ml-4 mr-3"
      color="action"
    >{altIcon}</span>
  )

  const getIcon = () => 
    <React.Fragment>
      {getStandardIcon()}
      {getAltIcon()}
    </React.Fragment>

  const out = (
    <ListItem
      button
      component={NavLink}
      // to={item.path}
      to={`/${id}`}
      activeClassName="active"
      className={classNames(item, listItemPadding, 'list-item text-white', active,)} // md:rounded-full
      onClick={navbarCloseMobile}
      exact={exact}
      title={title}
    >
      {
        ( icon || altIcon )
        ?
        getIcon()
        :
        <span className="mr-32" />
      }
      <ListItemText
        classes={{ primary: 'list-item-text-primary text-white' }} // this 'text-white' is the one that works!
        className="list-item-text ml-16 text-white"
        color="action"
        primary={title}
      />
      {badge && (
        <FuseNavBadge badge={badge} />
      )}
    </ListItem>
  );

  return out;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    navbarCloseMobile: Actions.navbarCloseMobile
  }, dispatch);
}

function mapStateToProps({ auth, fuse }) {
  return {
  //   userRole: auth.user.role
  }
}

FuseNavVerticalItem.propTypes = propTypes;
FuseNavVerticalItem.defaultProps = defaultProps;

const NavVerticalItem = withStyles(styles, {withTheme: true })(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(FuseNavVerticalItem)));

export default NavVerticalItem;
