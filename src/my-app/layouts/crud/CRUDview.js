// import React from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import compose from 'recompose/compose';
import { connect } from 'react-redux'
import { createItem, updateItem, deleteItem, } from './store/actions'

import classNames from 'classnames';

// @material-ui/core
import {
  withStyles, withWidth, Slide, Zoom, Button, Fab, Paper, Tooltip,
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
import { getForm, uiSpecs, } from 'my-app/config/AppConfig'; // getCleanFieldNames,
import FormTemplate from 'my-app/components/forms/FormTemplate';
import SimpleExpansionPanel from 'my-app/components/SimpleExpansionPanel';

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
    height: 'calc(100vh - 116px)',
    boxSizing: 'border-box',
    display: 'flex',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  wrapper: {
    // temp-border
    // border: 'solid red 4px',
    height: '100%',
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
    // border: 'solid green 4px',
    height: '100%',
    width: '100%',
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
  createDialogIsOpen : false     ,
  updateDialogIsOpen : false     ,
  deleteDialogIsOpen : false     ,
  crudForm           : undefined ,
}

const INITIAL_STATE_DETAIL = {
  detail        : undefined ,
  selectedIndex : undefined ,
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

  // componentWillMount() {
  //   // this.setCreateFormInitialState(this.props.creatable.fields);
  // }

  handleOpenCreateDialog = () => {
    this.setState({
      createDialogIsOpen: true,
      updateDialogIsOpen: false,
      deleteDialogIsOpen: false,
    });
  };

  handleOpenUpdateDialog = () => {
    // console.log('detail\n', this.state.detail);
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

  handleChangeForm = event => {
    // console.log('target\n', event.target);
    const { id, value, } = event.target;
    // console.log('id\n', id); // 'name'
    // console.log('value\n', value); // 'john doe'
    const { crudForm, } = { ...this.state, }; // use spread syntax to create and modify a copy only
    // console.log('crudForm\n', crudForm); // 'john doe'
    const targetFieldIndex = crudForm.findIndex(field => field.id === id);
    // console.log('targetFieldIndex\n', targetFieldIndex); // 'john doe'
    crudForm[targetFieldIndex].value = value;
    this.setState({ crudForm, }
      // ,() => console.log('state\n', this.state)
    );
  }

  handleEnterDialog = type =>
    // type: string: enum: 'loadNewData' | 'loadSavedData'
    this.setState(
      { crudForm : this.getFormFields(type, this.props.creatable.fields,) }
      // ,() => console.log('state\n', this.state)
    )

  handleCloseDialog = () => {
    this.setState({
      ...INITIAL_STATE_DIALOG,
      crudForm: this.state.createFormInitialState,
    });
  };

  handleRefresh = () => this.props.onRefresh();

  handleCreateItem = e => {
    // console.log('state\n', this.state);
    const { handleCloseDialog, handleRefresh, } = this;
    const { crudForm, } = this.state;
    const { createItem, creatable, } = this.props;
    const { path, } = creatable;
    
    // inspired by: src/my-app/components/forms/CreateLead.js
    e.preventDefault();
    // console.log(this.state);
    // this.props.createItem('leads', crudForm,);

    const newItem = {};
    crudForm.forEach(item => {
      let newVal = item.value;
      if(newVal === undefined || newVal === null) return; // newVal = null; //
      newItem[item.id] = newVal;
    });

    createItem(path, newItem,);
    // this.props.history.push('/');

    handleCloseDialog();
    handleRefresh();
  }
  
  handleUpdateItem = () => {
    // console.log('state\n', this.state);
    // console.log('props\n', this.props);
    const { handleCloseDialog, handleRefresh, } = this;
    const { detail, crudForm, } = this.state; // selectedIndex,
    const { readable, updateItem, } = this.props; // items,
    // console.log('selectedIndex', selectedIndex,);
    // console.log('selectedItem', items[selectedIndex],);
    // const item = items[selectedIndex];
    // const docId = item.docId;
    const docId = detail.docId;
    // console.log('docId', docId,);

    const newItem = {};
    crudForm.forEach(item => {
      let newVal = item.value;
      if(newVal === undefined || newVal === null) return; // newVal = null; //
      newItem[item.id] = newVal;
    });

    updateItem( readable, docId, newItem, detail, );
    handleCloseDialog();
    handleRefresh();
  }

  handleDeleteItem = () => {
    // console.log('state\n', this.state);
    // console.log('props\n', this.props);
    const { handleCloseDialog, handleRefresh, } = this;
    const { selectedIndex, } = this.state;
    const { items, readable, deleteItem, } = this.props;
    // console.log('selectedIndex', selectedIndex,);
    // console.log('selectedItem', items[selectedIndex],);
    const item = items[selectedIndex];
    const docId = item.docId;
    // console.log('docId', docId,);
    deleteItem( readable, docId, );
    handleCloseDialog();
    handleRefresh();
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

  // setCreateFormInitialState = fields => {
  //   const detail = this.state;

  //   const ready = this.props.creatable;
  //   if(!ready) return;

  //   // console.log('fields\n', fields); // some contain '*'
  //   // console.log('detail\n', detail); // some contain '*'
    
  //   const arrayOfFieldNames = getCleanFieldNames(fields);
  //   // const crudForm = { arrayOfFieldNames, };
  //   const crudForm = {};
  //   arrayOfFieldNames.forEach(field => crudForm[field] = (detail && detail[field]) || '');
  //   // fields.forEach(field => crudForm[field] = '');
  //   this.setState({
  //     crudForm,
  //     createFormInitialState: crudForm,
  //   }
  //     // ,() => console.log('state\n', this.state)
  //   );
  // }

  getFormFields = ( type, fields, ) => {
    // type: string: enum: 'loadSavedData' | 'loadNewData'
    // fields: arrayOFStrings: example: ['name*', 'phone*', 'email*', 'zip*', 'notes', ]
    // console.log('type\n', type);
    // console.log('fields\n', fields);
    // console.log('state\n', this.state);

    const ready = fields && typeof fields === 'object';
    if(!ready) return;

    const { detail, } = this.state;
    // console.log('updateDialogIsOpen\n', updateDialogIsOpen);
    // console.log('detail\n', detail);
    const formFields = getForm(fields);
    // console.log('formFields\n', formFields); // debugger;
    formFields.forEach(field => {
      switch(type) {
        case 'loadNewData':
          field.value = '';
          break;
        case 'loadSavedData':
          field.value = detail && detail[field.id];
          break;
        default:
          // throw new Error('Type must be one of: "loadSavedData" or "loadNewData"');
          console.error('Type must be one of: "loadSavedData" or "loadNewData"');
      }
      // console.log(`field: ${field.id}\n`, field);
    });
    // console.log('formFields\n', formFields);
    // console.log('state\n', this.state);
    return formFields;
  }

  getCreateDialog = () => {
    // console.log('props\n', this.props);
    // const { getFormFields, } = this;
    const { createDialogIsOpen, crudForm, } = this.state;
    const { creatable, } = this.props;
    const { title, fields, } = creatable; // form,
    const {
      handleEnterDialog, handleChangeForm, handleCloseDialog, handleCreateItem,
    } = this;
    const ready1 = createDialogIsOpen && creatable;
    if(!ready1) return;
    const ready2 = title && fields;
    if(!ready2) return;
    const ready3 = handleChangeForm && handleCloseDialog && handleCreateItem;
    if(!ready3) return;

    return (
      creatable &&
      <Dialog
        open={createDialogIsOpen}
        onEnter={() => handleEnterDialog('loadNewData')}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition} // https://material-ui.com/demos/dialogs/#alerts
        // keepMounted
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
        <div className="ml-12 mr-16">
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent className="pt-4">
            {
              // // dynamically populate element props
              // // https://stackoverflow.com/a/40196365/1640892
              // React.cloneElement(
              //   form,
              //   {
              //     fields,
              //     onChange: handleChangeForm,
              //   },
              // )
            }
            <FormTemplate
              fields={crudForm}
              onChange={handleChangeForm}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateItem} color="primary">
              Save
            </Button>
          </DialogActions>
        </div>
      </Dialog>
  )}

  getUpdateDialog = () => {
    // console.log('props\n', this.props);
    const { 
      handleChangeForm, handleCloseDialog, handleUpdateItem, handleEnterDialog,
    } = this; // getFormFields, handleExitedUpdateDialog,
    const { updateDialogIsOpen, detail, crudForm, } = this.state;
    const { updatable, } = this.props;
    const { title, fields, } = updatable;
    const ready1 = updateDialogIsOpen && updatable && detail;
    if(!ready1) return;
    const ready2 = title && fields;
    if(!ready2) return;
    const ready3 = handleChangeForm && handleCloseDialog && handleUpdateItem;
    if(!ready3) return;

    // const updateFormFields = getFormFields( 'loadSavedData', fields, );
    // console.log('crudForm\n', crudForm);
    // debugger;

    return (
      updatable &&
      <Dialog
        open={updateDialogIsOpen}
        onEnter={() => handleEnterDialog('loadSavedData')}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition} // https://material-ui.com/demos/dialogs/#alerts
        // keepMounted
        // aria-labelledby="alert-dialog-slide-title"
        // aria-describedby="alert-dialog-slide-description"
      >
        <div className="ml-12 mr-16">
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent className="pt-4">
            <FormTemplate
              fields={crudForm}
              onChange={handleChangeForm}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdateItem} color="primary">
              Save
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    )
  }

  getDeleteDialog = () => (
    this.props.deletable &&
    <Dialog
      open={this.state.deleteDialogIsOpen}
      onClose={this.handleCloseDialog}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition} // https://material-ui.com/demos/dialogs/#alerts
      // keepMounted
      // aria-describedby="alert-dialog-slide-description"
      // aria-labelledby="alert-dialog-slide-title"
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
    const { handleOpenCreateDialog, } = this;
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
          <div className="h-full w-full flex flex-col justify-center content-center">
            <Icon className="opacity-25 self-center" fontSize="large">add_circle_outline</Icon>
            <Typography variant="h6" color="textSecondary">
              There are no items in this list yet
            </Typography>
            {
              this && this.props && this.props.creatable &&
              <Button
                className="mt-32 max-w-lg self-center"
                color="secondary"
                variant="contained"
                size="large"
                onClick={handleOpenCreateDialog}
              >
                Add item
              </Button>
            }
          </div>
          :
          <Tooltip TransitionComponent={Zoom} placement="top" title="Detail shows here after clicking a list item">
            <div>
              <Icon className="mt-32 opacity-25" fontSize="large">library_books</Icon>
              <Typography variant="body1" color="textSecondary">
                Select an item to view
              </Typography>
            </div>
          </Tooltip>
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
    const { createdAt, } = item;
    // console.log('createdAt\n', createdAt);
    return (
        <ListItem
          button
          // divider light // use <Divider /> instead
          key={createdAt}
          onClick={() => handleToggle( item, isList, index, )}
          selected={selectedIndex === index}
        >
          {
          // <Avatar>
          //   <BeachAccessIcon />
          // </Avatar>
          }
          <HashAvatar
            message={createdAt}
            // variant="uic" //"robohashx" //"robohash4" //"retro" //"monsterid" //"wavatar" //"adorable" //"identicon" //"mp" //"ui" //"random"(deprecated)
          />
          <ListItemText primary={item.geoLocal} secondary={moment(createdAt).fromNow()} />
          <ListItemSecondaryAction>
            {
            isList
            ?
            <Tooltip TransitionComponent={Zoom} placement="left" title="See detail">
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
              <IconButton color="inherit" aria-label="More detail"
                onClick={() => handleToggle( item, isList, index, )}
              >
                <Icon>more_horiz</Icon>
              </IconButton>
            </Tooltip>
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

  // getDetailListItem = ( keyName, keyIndex, item, condensed, ) =>
    
  //   // Prevent React from throwing an error if the 'update' field is an object
  //   (
  //     // keyName === 'update'
  //     // // because 'update' is constructed as object in src/my-app/layouts/crud/store/actions/item.actions.js
  //     // ||
  //     // Error guards against returning objects as fields
  //     typeof item[keyName] === 'string'
  //     ||
  //     typeof item[keyName] === 'number'
  //   )

  //   &&

  //   // skip empty fields
  //   item[keyName].length
    
  //   &&

  //   // keyName // success
  //   // `${keyName}: ${item[keyName]}` // success
  //   // // success
  //   // <Typography className="text-left">
  //   //   {keyName}: {item[keyName]}
  //   // </Typography>
  //   // attempt
  //   <ListItem
  //     // key={keyName.createdAt}
  //     key={keyIndex}
  //     divider
  //     // light
  //     // button
  //     // onClick={() => handleToggle(item)}
  //   >
  //     {
  //     // <Avatar>
  //     //   <BeachAccessIcon />
  //     // </Avatar>
  //     }
  //     <ListItemText
  //       primary={keyName}
  //       secondary={ condensed ? null : item[keyName] }
  //     />
  //     {
  //       condensed
  //       ?
  //       <ListItemSecondaryAction>
  //         <Typography className="mr-16">{item[keyName]}</Typography>
  //       </ListItemSecondaryAction>
  //       :
  //       null
  //     }
  //   </ListItem>

  getDetailListItem = ( label, value, condensed, ) =>
    
    // Prevent React from throwing an error if the 'update' field is an object
    (
      // field.id === 'update'
      // // because 'update' is constructed as object in src/my-app/layouts/crud/store/actions/item.actions.js
      // ||
      // Error guards against returning objects as fields
      typeof value === 'string'
      ||
      typeof value === 'number'
    )

    &&

    // skip empty fields
    value.length
    
    &&

    // keyName // success
    // `${keyName}: ${item[keyName]}` // success
    // // success
    // <Typography className="text-left">
    //   {keyName}: {item[keyName]}
    // </Typography>
    // attempt
    <ListItem
      // key={keyName.createdAt}
      key={label}
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
        primary={label}
        secondary={ condensed ? null : value }
      />
      {
        condensed
        ?
        <ListItemSecondaryAction>
          <Typography className="mr-16">{value}</Typography>
        </ListItemSecondaryAction>
        :
        null
      }
    </ListItem>

  getDetail = item => {
    // const MAX_LENGTH = 40;
    const { classes, condensed, creatable, } = this.props;
    const { getDetailListItem, } = this;
    // console.log('condensed\n', condensed);
    
    // const keys = Object.keys(item);

    // const dataFields = getForm(keys);
    // console.log('dataFields\n', dataFields);

    const ready = creatable && creatable.fields;
    if(!ready) return;

    const formFields = this.getFormFields('loadSavedData', creatable.fields,);
    // console.log('formFields\n', formFields);
    
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
              // keys.map((keyName, keyIndex,) =>
              //   item[keyName].length > uiSpecs.maxCharsForDetailItemField // MAX_LENGTH
              //   ?
              //   <SimpleExpansionPanel key={keyIndex} heading={keyName} content={item[keyName]} />
              //   :
              //   getDetailListItem( keyName, keyIndex, item, condensed, )
              // )
              formFields.map( field =>
                field.value.length > uiSpecs.maxCharsForDetailItemField // MAX_LENGTH
                ?
                <SimpleExpansionPanel key={field.label} heading={field.label} content={field.value} />
                :
                getDetailListItem( field.label, field.value, condensed, )
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
    // console.log('limit\n', limit);
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
    // console.log('detail\n', detail);
    // console.log('state\n', this.state);
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
    // console.log('items\n', items);
    return (
      <React.Fragment>
        {(
        // getHeader()
        creatable &&
          (
          <Zoom in mountOnEnter unmountOnExit>
            <CreateButton onClick={handleOpenCreateDialog} />
          </Zoom>
          )
        )}
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
                  <Tooltip TransitionComponent={Zoom} placement="top" title="Click for detail">
                    <div
                      key={item.createdAt}
                      // className="border-b" // use divider instead
                    >
                      { getSummary( item, true, index, ) }
                      <Divider />
                    </div>
                  </Tooltip>
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
        { getCreateDialog() }
        { 
          (items && items.length)
          ?
          <React.Fragment>
            <CssBaseline/>
            { getUpdateDialog() }
            { getDeleteDialog() }
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
  onRefresh: PropTypes.func.isRequired,

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
  updatable: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
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

const mapDispatchToProps = dispatch => ({
  createItem: ( path , item  ,                    ) => dispatch(createItem( path , item  ,                    )), // inspired by: src/my-app/components/forms/CreateLead.js
  updateItem: ( path , docId , newItem , oldItem, ) => dispatch(updateItem( path , docId , newItem , oldItem, )),
  deleteItem: ( path , docId ,                    ) => dispatch(deleteItem( path , docId ,                    )),
})

// export default CRUDView;
// export default withStyles(styles)(CRUDView);
export default compose(
  withStyles(styles),
  withWidth(),
  connect(null, mapDispatchToProps),
)(CRUDView);