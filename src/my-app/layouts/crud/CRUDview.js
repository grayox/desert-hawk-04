// import React from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import compose from 'recompose/compose';
import { connect } from 'react-redux'
import { createItem, deleteItem, } from './store/actions'

import classNames from 'classnames';

// @material-ui/core
import {
  withStyles, withWidth, Slide, Zoom, Button, Fab, Paper,
  Typography, Grid, Hidden, CssBaseline, Divider, Icon, IconButton,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  // ListSubheader, Avatar, Grow,
  // AppBar, Toolbar, CssBaseline,
} from '@material-ui/core';

// import {FuseAnimateGroup, FuseHighlight, FusePageSimple} from '@fuse';
import { FuseAnimateGroup } from '@fuse'; // FuseScrollbars, FuseAnimate,
import moment from 'moment';

// import CreateButton from './CreateButton';
import { CreateButton, ButtonsRow, } from './CRUDButtons'; // UDButtons,
import { getForm, getCleanFieldnames, } from 'my-app/config/AppConfig';
import FormTemplate from 'my-app/components/forms/FormTemplate';

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
    // height: '100%',
    // temp-border
    // border: 'solid black 4px',
    boxSizing: 'border-box',
    display: 'flex',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  wrapper: {
    // temp-border
    // border: 'solid red 4px',
    flexGrow: 1,
    boxSizing: 'border-box',
    // overflow: 'auto',
  },
  paper: {
    // temp-border
    // border: 'solid blue 4px',
    color: theme.palette.text.secondary,
  },
  empty: {
    // temp-border
    // border: 'green solid 4px',
    height: '100%',
    textAlign: 'center',
    paddingTop: 16,
    // align middle // https://stackoverflow.com/a/25311805
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  }
});

// https://material-ui.com/demos/dialogs/#alerts
const Transition = props => (<Zoom in {...props} />); // (<Slide direction="up" {...props} />);

const INITIAL_STATE_DIALOG = {
  createDialogIsOpen: false,
  updateDialogIsOpen: false,
  deleteDialogIsOpen: false,
}

const INITIAL_STATE_DETAIL = {
  detail: undefined,
  selectedIndex: undefined,
}

const INITIAL_STATE = {
  ...INITIAL_STATE_DETAIL,
  ...INITIAL_STATE_DIALOG,
};

// function CRUDView(props) {
class CRUDView extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentWillMount() {
    this.setCreateFormInitialState(this.props.creatable.fields);
  }

  handleOpenCreateDialog = () => {
    this.setState({
      createDialogIsOpen: true,
      updateDialogIsOpen: false,
      deleteDialogIsOpen: false,
    });
  };

  handleOpenUpdateDialog = () => {
    this.setState({
      createDialogIsOpen: false,
      updateDialogIsOpen: true,
      deleteDialogIsOpen: false,
    });
  };

  handleOpenDeleteDialog = () => {
    this.setState({
      createDialogIsOpen: false,
      updateDialogIsOpen: false,
      deleteDialogIsOpen: true,
    });
  };

  handleChangeCreateForm = event => {
    // console.log('target\n', event.target);
    const { id, value, } = event.target;
    // console.log('id\n', id); // 'name'
    // console.log('value\n', value); // 'john doe'
    this.setState({
      createFormState: {
        ...this.state.createFormState,
        [id]: value,
      }}
      // ,() => console.log('state\n', this.state)
    )
  }

  handleDeleteItem = () => {
    // console.log('state\n', this.state);
    // console.log('props\n', this.props);
    const { selectedIndex, } = this.state;
    const { items, readable, } = this.props;
    // console.log('selectedIndex', selectedIndex,);
    // console.log('selectedItem', items[selectedIndex],);
    const item = items[selectedIndex];
    const docId = item.docId;
    // console.log('docId', docId,);
    this.props.deleteItem( readable, docId, );
    this.handleCloseDialog();
  }

  handleCloseDialog = () => {
    this.setState({
      ...INITIAL_STATE_DIALOG,
      createFormState: this.state.createFormInitialState,
    });
  };

  handleSaveCreateDialog = e => {
    // console.log('state\n', this.state);
    const { createFormState, } = this.state;
    const { path, } = this.props.creatable;
    
    // inspired by: src/my-app/components/forms/CreateLead.js
    e.preventDefault();
    // console.log(this.state);
    // this.props.createItem('leads', createFormState,);
    this.props.createItem(path, createFormState,);
    // this.props.history.push('/');

    this.handleCloseDialog();
  }
  
  handleSaveUpdateDialog = () => {
    console.log('state\n', this.state);
  }

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
    this.setState({
      ...INITIAL_STATE_DETAIL,
    }
      // promise completes animation effect
      ,() => {if(isList) this.setState({
        detail: model,
        selectedIndex: index,
      })}
    );
  }

  setCreateFormInitialState = fields => {
    const ready = this.props.creatable;
    if(!ready) return;

    // console.log('fields\n', fields); // some contain '*'
    const arrayOfFieldnames = getCleanFieldnames(fields);
    // const createFormState = { arrayOfFieldnames, };
    const createFormState = {};
    arrayOfFieldnames.forEach(field => createFormState[field] = '');
    // fields.forEach(field => createFormState[field] = '');
    this.setState({
      createFormState,
      createFormInitialState: createFormState,
    }
      // ,() => console.log('state\n', this.state)
    );
  }

  getFormFields = fields => {
    const formFields = getForm(fields);
    formFields.map(field => field.value = this.state.createFormState[field.id]);
    return formFields;
  }

  getCreateDialog = () => {
    // console.log('props\n', this.props);
    const { getFormFields, } = this;
    const { title, fields, } = this.props.creatable; // form,
    const {
      handleChangeCreateForm, handleCloseDialog, handleSaveCreateDialog,
    } = this;
    const ready1 = title && fields;
    const ready2 = handleChangeCreateForm && handleCloseDialog && handleSaveCreateDialog;
    if(!ready1) return;
    if(!ready2) return;

    return (
      <Dialog
        open={this.state.createDialogIsOpen}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition} // https://material-ui.com/demos/dialogs/#alerts
        keepMounted
      // aria-labelledby="alert-dialog-slide-title"
      // aria-describedby="alert-dialog-slide-description"
      >
        {
        // <AppBar position="static" elevation={1}>
        //   <Toolbar className="flex w-full">
        //     <Typography variant="subtitle1" color="inherit">
        //       {
        //         // {FormTemplate.type === 'new' ? 'New Contact' : 'Edit Contact'}
        //       }
        //       New Contact
        //     </Typography>
        //   </Toolbar>
        //   {
        //   // <div className="flex flex-col items-center justify-center pb-24">
        //   //   <Avatar className="w-96 h-96" alt="contact avatar" src={this.state.avatar} />
        //   //   {FormTemplate.type === 'edit' && (
        //   //     <Typography variant="h6" color="inherit" className="pt-8">
        //   //       {this.state.name}
        //   //     </Typography>
        //   //   )}
        //   // </div>
        //   }
        // </AppBar>
        }
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent className="pt-4">
          {
            // // dynamically populate element props
            // // https://stackoverflow.com/a/40196365/1640892
            // React.cloneElement(
            //   form,
            //   {
            //     fields,
            //     onChange: handleChangeCreateForm,
            //   },
            // )
          }
          <FormTemplate
            fields={getFormFields(fields)}
            onChange={handleChangeCreateForm}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveCreateDialog} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
  )}

  getUpdateDialog = () => (
    <Dialog
      open={this.state.updateDialogIsOpen}
      onClose={this.handleCloseDialog}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition} // https://material-ui.com/demos/dialogs/#alerts
      keepMounted
    // aria-labelledby="alert-dialog-slide-title"
    // aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="form-dialog-title">{this.props.creatable.title}</DialogTitle>
      <DialogContent className="pt-4">{this.props.creatable.form}</DialogContent>
      <DialogActions>
        <Button onClick={this.handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleSaveUpdateDialog} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )

  getDeleteDialog = () => (
    <Dialog
      open={this.state.deleteDialogIsOpen}
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
        <Button onClick={this.handleDeleteItem} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )

  // getEmpty = () => (<img src="https://via.placeholder.com/800x900.png/e91e63/fff?text=Detail+goes+here"/>)
  getEmpty = side => {
    const { classes, } = this.props;
    return (
      <div className={classes.empty}>
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
  }

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
    const { handleToggle, } = this; // handleOpenUpdateDialog, handleOpenDeleteDialog,
    const { selectedIndex, } = this.state; // detail
    const { classes, actionable, } = this.props; // updatable, deletable,
    const { created_at, } = item;
    return (
      <ListItem
        button
        // divider light // use <Divider /> instead
        key={created_at}
        onClick={() => handleToggle( item, isList, index, )}
        selected={selectedIndex === index}
      >
        {
        // <Avatar>
        //   <BeachAccessIcon />
        // </Avatar>
        }
        <HashAvatar
          message={created_at}
          // variant="uic" //"robohashx" //"robohash4" //"retro" //"monsterid" //"wavatar" //"adorable" //"identicon" //"mp" //"ui" //"random"(deprecated)
        />
        <ListItemText primary={item.geoLocal} secondary={moment(created_at).fromNow()} />
        <ListItemSecondaryAction>
          {
          isList
          ?
          <React.Fragment>
            {
            // Not using this for two reasons:
            // 1. Does not yet provide selectedIndex to state
            // 2. Horizontal space constraint on narrow screens
            // <UDButtons
            //   updatable={updatable}
            //   deletable={deletable}
            //   onUpdate={handleOpenUpdateDialog}
            //   onDelete={handleOpenDeleteDialog}
            // />
            }
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
                  // key={keyName.created_at}
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
    const { handleNavBack, handleNavNext, handleToggle, handleOpenUpdateDialog, handleOpenDeleteDialog, } = this; //  handleCloseDialog,
    const { selectedIndex, } = this.state;
    const { items, updatable, deletable, } = this.props; // actionable,
    const limit = items.length - 2;
    return (
      <ButtonsRow
        limit={limit}
        selectedIndex={selectedIndex}
        deletable={deletable}
        updatable={updatable}
        onToggle={handleToggle}
        onUpdate={handleOpenUpdateDialog}
        onDelete={handleOpenDeleteDialog}
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
    const { getSummary, handleOpenCreateDialog, } = this; // getHeader,
    return (
      <React.Fragment>
        {
        // getHeader()
        creatable && 
        <Zoom in mountOnEnter unmountOnExit>
          <CreateButton onClick={handleOpenCreateDialog} />
        </Zoom>
        }
        <Paper className={classNames(classes.paper, "z-10",)}>
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
                    key={item.created_at}
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
    const {
      getListPane, getDetailPane, getEmpty,
      getCreateDialog, getUpdateDialog, getDeleteDialog,
    } = this;

    return (
      // <FuseScrollbars className="overflow-auto">
      <div className={classes.root}>
      {
        items && items.length
        ?
        <React.Fragment>
          <CssBaseline/>
          {getCreateDialog()}
          {getUpdateDialog()}
          {getDeleteDialog()}
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
        getEmpty('list')
      }
      </div>
        
      // </FuseScrollbars>
    );

  }
}

CRUDView.propTypes = {
  createItem: PropTypes.func.isRequired,

  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,

  condensed: PropTypes.bool, // one-line per list item in detail pane
  actionable: PropTypes.func,
  creatable: PropTypes.oneOfType([ // create button in list pane
    PropTypes.object,
    PropTypes.bool,
  ]),
  readable: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  updatable: PropTypes.bool,
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

const mapDispatchToProps = dispatch => {
  return {
    createItem: ( path , item  , ) => dispatch(createItem( path , item  , )), // inspired by: src/my-app/components/forms/CreateLead.js
    deleteItem: ( path , docId , ) => dispatch(deleteItem( path , docId , )),
  }
}

// export default CRUDView;
// export default withStyles(styles)(CRUDView);
export default compose(
  withStyles(styles),
  withWidth(),
  connect(null, mapDispatchToProps),
)(CRUDView);