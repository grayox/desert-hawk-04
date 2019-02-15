// import React from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

// @material-ui/core
import {
  Grow, Icon, IconButton, Divider,
  Typography, Grid, Hidden, Paper,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  // ListSubheader, Avatar, Slide, Zoom,
  // AppBar, Toolbar, CssBaseline, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';

// import {FuseAnimateGroup, FuseHighlight, FusePageSimple} from '@fuse';
import { FuseScrollbars, FuseAnimate, FuseAnimateGroup } from '@fuse';

import CreateDialog from './CreateDialog';
import UDButtons from './UDButtons';

// import  from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import HashAvatar from 'my-app/components/HashAvatar';
// import { componentsNavConfig, } from 'my-app/config/AppConfig';

// 4 Ways to Style React Components: https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
// const MasterDetailStyle = {
//   display: 'grid', // https://css-tricks.com/snippets/css/complete-guide-grid/ | http://grid.malven.co/
//   gridTemplateColumns: '1fr 1fr',
// };

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  wrapper: {
    minHeight: '100vh',
    verticalAlign: 'top', // overcomes default
    // paddingTop: '56px', // clears <AppBar />
  },
  paper: {
    // padding: theme.spacing.unit * 2,
    width: '100vw',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // maxWidth: '360px',
  },
});

const INITIAL_STATE = {
  detail: null,
  selectedIndex: null,
};

// function MasterDetail(props) {
class MasterDetail extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleListItemClick = ( event, index, ) => {
    this.setState({ selectedIndex: index });
  };

  handleToggle = ( model, isList, index, ) => {
    // console.log('model\n', model);
    const { detail } = this.state;
    this.setState(
      { 
        detail: null,
        selectedIndex: null,
      },
      // promise completes animation effect
      () => {if(isList) this.setState({
        detail: model,
        selectedIndex: index,
      })}
    );
  }

  // getEmpty = () => (<img src="https://via.placeholder.com/800x900.png/e91e63/fff?text=Detail+goes+here"/>)
  getEmpty = () => (
    <div className="text-center mt-16">
      {
      // <FuseAnimate animation="transition.expandIn" delay={100}>
      //   <Typography variant="h1" color="inherit" className="font-medium mb-16">
      //     Detail
      //   </Typography>
      //   <Avatar>
      //     <BeachAccessIcon />
      //   </Avatar>
      // </FuseAnimate>
      }
      <FuseAnimateGroup
        delay={500}
        enter={{ animation: "transition.expandIn" }}
        leave={{ animation: "transition.expandOut" }}
      // className="hidden md:flex md-flex-1"
      >
        <React.Fragment>
          <Icon className="mt-32 opacity-25" fontSize="large">library_books</Icon>
          <Typography variant="body1" color="textSecondary">
            See details here after selecting item
          </Typography>
        </React.Fragment>
      </FuseAnimateGroup>
    </div>
  )

  // getHeader = () => (
  //   <Hidden xsDown>
  //     <FuseAnimate
  //       // className="px-0"
  //       // key={row.name}
  //       delay={200}
  //       // animation="transition.slideLeftIn"
  //       // enter={{ animation: 'transition.perspectiveLeft' }}
  //       // leave={{ animation: 'transition.perspectiveRight' }}
  //       enter={{ animation: 'transition.slideDownBigIn' }}
  //       leave={{ animation: 'transition.slideLeftOut' }}
  //     >
  //       <AppBar
  //         className="m-0"
  //         position="static"
  //         elevation={0}
  //       >
  //         <Toolbar className="px-16">
  //           <Typography variant="subtitle1" color="inherit" className="flex-1">
  //             Items
  //           </Typography>
  //         </Toolbar>
  //       </AppBar>
  //     </FuseAnimate>
  //   </Hidden>
  // )

  getSummary = ( item, isList, index, ) => {
    const { handleToggle, } = this;
    const { selectedIndex, } = this.state; // detail
    return (
      <ListItem
        button
        // divider light // use <Divider /> instead
        key={item.timestamp}
        onClick={() => handleToggle( item, isList, index, )}
        selected={selectedIndex === index}
      >
        {
        // <Avatar>
        //   <BeachAccessIcon />
        // </Avatar>
        }
        <HashAvatar
          message={item.timestamp}
          // variant="uic" //"robohashx" //"robohash4" //"retro" //"monsterid" //"wavatar" //"adorable" //"identicon" //"mp" //"ui" //"random"(deprecated)
        />
        <ListItemText primary="Vacation" secondary={item.name} />
        <ListItemSecondaryAction>
          <UDButtons />
          <IconButton
            color="inherit"
            aria-label="Back"
            onClick={() => handleToggle( item, isList, index, )}
          >
            { 
              isList
              ?
              <Icon>more_horiz</Icon>
              :
              <Icon>close</Icon>
            }
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  getDetail = item => {
    const { classes, condensed, } = this.props;
    return (
      <FuseAnimate
        // className="px-0"
        // key={row.name}
        delay={200}
        // animation="transition.slideLeftIn"
        // enter={{ animation: 'transition.perspectiveLeft' }}
        // leave={{ animation: 'transition.perspectiveRight' }}
        enter={{ animation: 'transition.slideLeftIn' }}
        leave={{ animation: 'transition.slideLeftOut' }}
      >
        <Paper className={classNames(classes.paper, "z-0")}>
          <List component="nav"> {/* subheader={<ListSubheader className="text-left">Detail</ListSubheader>} */}
            <FuseAnimateGroup
              delay={500}
              enter={{ animation: "transition.slideDownBigIn" }}
              leave={{ animation: "transition.slideLeftOut" }}
            >
            {
              Object.keys(item).map((keyName, keyIndex,) =>
                // keyName // success
                // `${keyName}: ${item[keyName]}` // success
                // // success
                // <Typography className="text-left">
                //   {keyName}: {item[keyName]}
                // </Typography>
                // attempt
                <ListItem
                  key={keyName.timestamp}
                  divider light
                  // button
                  // onClick={() => handleToggle(item)}
                >
                  {
                  // <Avatar>
                  //   <BeachAccessIcon />
                  // </Avatar>
                  }
                  <ListItemText
                    primary={keyName}
                    secondary={ condensed ? null : item[keyName] }
                  />
                  {
                    condensed
                    ?
                    <ListItemSecondaryAction>
                      <Typography className="mr-16">{item[keyName]}</Typography>
                    </ListItemSecondaryAction>
                    :
                    null
                  }
                </ListItem>
              )
            }
            </FuseAnimateGroup>
          </List>
        </Paper>
      </FuseAnimate>
    )
  }

  getDetailPane = () => {
    const { getSummary, getDetail, getEmpty, } = this; // getHeader,
    const { detail, } = this.state;
    const { classes, } = this.props;
    return (
      <React.Fragment>
        {
          detail
          ?
          <Grow // <Zoom // <Slide
            // direction="right"
            // mountOnEnter
            // unmountOnExit
            in //={detail}
            timeout={3000}
          >
            <React.Fragment>
              {
                // {getHeader()}
              }
              <Paper className={classNames(classes.paper, "z-0")}>
                <List component="nav">
                  {getSummary(detail, false,)}
                </List>
              </Paper>
              {getDetail(detail)}
            </React.Fragment>
          </Grow> // </Zoom> // </Slide>
          :
          getEmpty()
        }
      </React.Fragment>
    )
  }

  getListPane = () => {
    const { classes, items, } = this.props;
    const { getSummary, } = this; // getHeader,
    return (
      <React.Fragment>
        {
        // getHeader()
        }
        <Paper className={classNames(classes.paper, "z-10")}>
          <List className="m-0 p-0" component="nav">
            {
              // subheader={<ListSubheader className="text-left">Items</ListSubheader>}
            }
            <FuseAnimateGroup
              delay={500}
              enter={{ animation: "transition.slideUpBigIn" }}
              leave={{ animation: "transition.slideLeftOut" }}
            >
              {
                items.map( ( item, index, ) =>
                  <div
                    key={item.timestamp}
                    // className="border-b" // use divider instead
                  >
                    { getSummary( item, true, index, ) }
                    <Divider />
                  </div>
                )
              }
            </FuseAnimateGroup>
          </List>
        </Paper>

        <CreateDialog className="mt-32" />

      </React.Fragment>
    )
  }

  render() {
    const { classes, create, } = this.props;
    const { detail, } = this.state;
    const { getListPane, getDetailPane, } = this;

    return (
      // <FuseScrollbars className="overflow-auto">
        // {create && <CreateDialog />}
        <div className="mt-32 width-50 overflow-auto">
          {/* mobile */}
          <Hidden smUp>{detail ? getDetailPane() : getListPane()}</Hidden>
          {/* laptop */}
          <Hidden xsDown>
            <div className={classNames(classes.root, "sm:p-8 md:p-16")}>
              <Grid container spacing={8}>
                <Grid item xs={12} sm={6}>{getListPane()}</Grid>
                <Grid item xs={6}>{getDetailPane()}</Grid>
              </Grid>
            </div>
          </Hidden>
        </div>
      // </FuseScrollbars>
    );

  }
}

MasterDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  condensed: PropTypes.bool,
};

// export default MasterDetail;
// export default withStyles(styles)(MasterDetail);
export default compose(
  withStyles(styles),
  withWidth(),
)(MasterDetail);