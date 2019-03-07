// import React from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

// @material-ui/core
import {
  Slide, Zoom, Button, Fab, Icon, IconButton, Paper,
  Typography, Grid, Hidden, CssBaseline, Divider,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  // ListSubheader, Avatar, Grow,
  // AppBar, Toolbar, CssBaseline,
} from '@material-ui/core';

// import {FuseAnimateGroup, FuseHighlight, FusePageSimple} from '@fuse';
import { FuseAnimateGroup } from '@fuse'; // FuseScrollbars, FuseAnimate,
import moment from 'moment';

// import CreateButton from './CreateButton';
import { CreateButton, ButtonsRow, UDButtons, } from './CRUDButtons';

// import from '@material-ui/core/Avatar';
// import ImageIcon from '@material-ui/icons/Image';
// import WorkIcon from '@material-ui/icons/Work';
// import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import HashAvatar from 'my-app/components/HashAvatar';
// import { componentsNavConfig, } from 'my-app/config/AppConfig';

// 4 Ways to Style React Components: https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
// const CRUDViewStyle = {
//   display: 'grid', // https://css-tricks.com/snippets/css/complete-guide-grid/ | http://grid.malven.co/
//   gridTemplateColumns: '1fr 1fr',
// };

const styles = theme => ({
  root: {
    // temp-border
    // border: 'solid black',
    boxSizing: 'border-box',
    display: 'flex',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  wrapper: {
    // temp-border
    // border: 'solid red',
    flexGrow: 1,
    boxSizing: 'border-box',
    // overflow: 'auto',
  },
  paper: {
    // temp-border
    // border: 'solid blue',
    color: theme.palette.text.secondary,
  },
});

// https://material-ui.com/demos/dialogs/#alerts
const Transition = props => (<Zoom in {...props} />); // (<Slide direction="up" {...props} />);

const INITIAL_STATE_DIALOG = {
  dialogIsOpen: false,
  dialogIsBeingUpdated: false,
  dialogIsBeingDeleted: false,
}

const INITIAL_STATE = {
  detail: null,
  selectedIndex: null,
  ...INITIAL_STATE_DIALOG,
};

// function CRUDView(props) {
class CRUDView extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleOpenDialog = () => {
    this.setState({ dialogIsOpen: true, });
  };

  handleCloseDialog = () => {
    this.setState({ ...INITIAL_STATE_DIALOG, });
  };

  handleListItemClick = ( event, index, ) => {
    this.setState({ selectedIndex: index });
  };

  handleNavBack = () => {
    const { items, } = this.props;
    const { selectedIndex, } = this.state;
    const newSelectedIndex = selectedIndex - 1;
    this.setState({
      selectedIndex: Math.max(0, newSelectedIndex),
      detail: items[newSelectedIndex],
    });
  };
  
  handleNavNext = () => {
    const { items, } = this.props;
    const { selectedIndex, } = this.state;
    const limit = items.length - 1;
    const newSelectedIndex = selectedIndex + 1;
    this.setState({
      selectedIndex: Math.min(limit, newSelectedIndex),
      detail: items[newSelectedIndex],
    });
  };

  handleToggle = ( model, isList, index, ) => {
    // console.log('model\n', model);
    // const { detail } = this.state;
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

  getDialog = () => (
    <Dialog
      open={this.state.dialogIsOpen}
      onClose={this.handleCloseDialog}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition} // https://material-ui.com/demos/dialogs/#alerts
      keepMounted
    // aria-labelledby="alert-dialog-slide-title"
    // aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="form-dialog-title">Permanently delete item?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          It&rsquo;s permanent and cannot be undone.
        {
          // Are you sure you want to delete this record?
          // After deleted, this record will not be recoverable.
        }
        </DialogContentText>
        {
          // <TextField autoFocus margin="dense" id="dialog" label="dialog" type="email" fullWidth />
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleCloseDialog} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )

  // getEmpty = () => (<img src="https://via.placeholder.com/800x900.png/e91e63/fff?text=Detail+goes+here"/>)
  getEmpty = side => (
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
      {
        ( side === 'list' )
        ?
        <React.Fragment>
          <Icon className="mt-32 opacity-25" fontSize="large">add_circle_outline</Icon>
          <Typography variant="h4" color="textSecondary">
            There are no items in this list yet
          </Typography>
          {
            this && this.props && this.props.creatable &&
            <Button className="mt-32" color="secondary" variant="contained" size="large">Add item</Button>
          }
        </React.Fragment>
        :
        <React.Fragment>
          <Icon className="mt-32 opacity-25" fontSize="large">library_books</Icon>
          <Typography variant="body1" color="textSecondary">
          Select an item to view
          </Typography>
        </React.Fragment>
      }
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
    const { handleToggle, handleClickOpen, } = this;
    const { selectedIndex, } = this.state; // detail
    const { classes, actionable, updatable, deletable, } = this.props;
    const { timestamp, } = item;
    return (
      <ListItem
        button
        // divider light // use <Divider /> instead
        key={timestamp}
        onClick={() => handleToggle( item, isList, index, )}
        selected={selectedIndex === index}
      >
        {
        // <Avatar>
        //   <BeachAccessIcon />
        // </Avatar>
        }
        <HashAvatar
          message={timestamp}
          // variant="uic" //"robohashx" //"robohash4" //"retro" //"monsterid" //"wavatar" //"adorable" //"identicon" //"mp" //"ui" //"random"(deprecated)
        />
        <ListItemText primary={item.geoLocal} secondary={moment(timestamp).fromNow()} />
        <ListItemSecondaryAction>
          {
          isList
          ?
          <React.Fragment>
            <UDButtons updatable={updatable} deletable={deletable} onClickOpen={handleClickOpen}/>
            <IconButton color="inherit" aria-label="Update and delete"
              onClick={() => handleToggle( item, isList, index, )}
            >
              <Icon>more_horiz</Icon>
            </IconButton>
          </React.Fragment>
          :
            (
              actionable &&
              <Zoom in mountOnEnter unmountOnExit>
                <Fab size="small" color="primary" className={classes.margin}><Icon>send</Icon></Fab>
              </Zoom>
            )
          }
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  getDetail = item => {
    const { classes, condensed, } = this.props;
    return (
      // <FuseAnimate
      //   // className="px-0"
      //   // key={row.name}
      //   delay={200}
      //   // animation="transition.slideLeftIn"
      //   // enter={{ animation: 'transition.perspectiveLeft' }}
      //   // leave={{ animation: 'transition.perspectiveRight' }}
      //   enter={{ animation: 'transition.slideLeftIn' }}
      //   leave={{ animation: 'transition.slideLeftOut' }}
      // >
        <Paper className={classNames(classes.paper, "z-0")}>
          <List className="m-0 p-0" component="nav"> {/* subheader={<ListSubheader className="text-left">Detail</ListSubheader>} */}
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
                  // key={keyName.timestamp}
                  key={keyIndex}
                  divider
                  // light
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
      // </FuseAnimate>
    )
  }

  getNavButtons = () => {
    const { handleNavBack, handleNavNext, handleToggle, handleOpenDialog, } = this; //  handleCloseDialog,
    const { selectedIndex, } = this.state;
    const { items, } = this.props;
    const limit = items.length - 2;
    return (
      <ButtonsRow
        deletable updatable
        limit={limit}
        selectedIndex={selectedIndex}
        onToggle={handleToggle}
        onUpdate={handleOpenDialog}
        onDelete={handleOpenDialog}
        onNavBack={handleNavBack}
        onNavNext={handleNavNext}
      />
    );
  }

  getDetailPane = () => {
    const { getSummary, getDetail, getEmpty, getNavButtons, } = this; // getHeader,
    const { detail, } = this.state;
    const { classes, } = this.props;
    return (
      <Slide // <Zoom // <Grow 
        in //={detail}
        direction="right"
        mountOnEnter
        unmountOnExit
        // timeout={3000}
      >
        <React.Fragment>
          {
          detail
          ?
          <React.Fragment>
            <Paper className={classNames(classes.paper, "z-0")}>
              {
              // getHeader()
              getNavButtons()
              }
              <List component="nav">
                {getSummary(detail, false,)}
              </List>
            </Paper>
            {getDetail(detail)}
          </React.Fragment>
          :
          getEmpty('detail')
          }
        </React.Fragment>
      </Slide> //</Grow> // </Zoom> // 
    )
  }

  getListPane = () => {
    const { classes, items, creatable, } = this.props;
    const { getSummary, handleOpenDialog, } = this; // getHeader,
    return (
      <React.Fragment>
        {
        // getHeader()
        creatable && 
        <Zoom in mountOnEnter unmountOnExit>
          <CreateButton onClick={handleOpenDialog} />
        </Zoom>
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
                items && items.map( ( item, index, ) =>
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

      </React.Fragment>
    )
  }

  render() {
    const { classes, items, } = this.props;
    const { detail, } = this.state;
    const { getListPane, getDetailPane, getEmpty, getDialog, } = this;

    return (
      // <FuseScrollbars className="overflow-auto">
      <div className={classes.root}>
      {
        items && items.length
        ?
        <React.Fragment>
          <CssBaseline/>
          {getDialog()}
          <div className={classes.wrapper}>
            {/* mobile */}
            <Hidden smUp>{detail ? getDetailPane() : getListPane()}</Hidden>
            {/* laptop */}
            <Hidden xsDown>
              <div className={classNames(classes.root,)}>
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={6}>{getListPane()}</Grid>
                  <Grid item xs={6}>{getDetailPane()}</Grid>
                </Grid>
              </div>
            </Hidden>
          </div>
        </React.Fragment>
        :
        <div className="flex-1 mt-32 pt-32 text-center">
          {getEmpty('list')}
        </div>
      }
      </div>
        
      // </FuseScrollbars>
    );

  }
}

CRUDView.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  condensed: PropTypes.bool, // one-line per list item in detail pane
  actionable: PropTypes.func,
  creatable: PropTypes.bool, // create button in list pane
  readable: PropTypes.string,
  updatable: PropTypes.string,
  deletable: PropTypes.bool,
};

CRUDView.defaultProps = {
  condensed: false,
  // actionable: false,
  creatable: false,
  // readable: false,
  updatable: false,
  deletable: false,
};

// export default CRUDView;
// export default withStyles(styles)(CRUDView);
export default compose(
  withStyles(styles),
  withWidth(),
)(CRUDView);