import React from 'react';

import {
  Zoom, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';

import FormTemplate from 'my-app/components/forms/FormTemplate';
import DialogAppBar from './DialogAppBar';

// https://material-ui.com/demos/dialogs/#alerts
const Transition = props => (<Zoom in {...props} />); // (<Slide direction="up" {...props} />);

const findFormField = ( formName, fieldName, ) => formName && formName.find(x => x.id === fieldName).value;

// getCreateDialog = () => {
const CreateDialog = ({
  creatable, createDialogIsOpen, crudForm, crudFormTimestamp,
  onEnterDialog, onChangeForm, onCloseDialog, onCreateItem, // findFormField,
}) => {
  // console.log('props\n', this.props);
  // const { getFormFields, } = this;
  const ready1 = createDialogIsOpen && creatable;
  if(!ready1) return;
  
  const { title, fields, } = creatable; // form,

  const ready2 = title && fields;
  if(!ready2) return;
  const ready3 = onChangeForm && onCloseDialog && onCreateItem;
  if(!ready3) return;

  const name = findFormField( crudForm, 'name', );
  // console.log('name\n', name,);

  return (
    creatable &&
    <Dialog
      open={createDialogIsOpen}
      onEnter={() => onEnterDialog('loadNewData')}
      onClose={onCloseDialog}
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

      {/* { getAppBar(title, name, crudFormTimestamp,) } */}
      <DialogAppBar title={title} name={name} message={crudFormTimestamp} />

      <div className="ml-8 mr-16">
        {
        // <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        }
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
            onChange={onChangeForm}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={onCreateItem} color="primary">
            Save
          </Button>
        </DialogActions>
      </div>
    </Dialog>
)}

// getUpdateDialog = () => {
const UpdateDialog = ({
  updatable, updateDialogIsOpen, detail, crudForm, 
  onChangeForm, onCloseDialog, onUpdateItem, onEnterDialog,
}) => {
  // console.log('props\n', this.props);
  // console.log('state\n', this.state);
  const { title, fields, } = updatable;
  const ready1 = updateDialogIsOpen && updatable && detail;
  if(!ready1) return;
  const ready2 = title && fields;
  if(!ready2) return;
  const ready3 = onChangeForm && onCloseDialog && onUpdateItem;
  if(!ready3) return;

  // const updateFormFields = getFormFields( 'loadSavedData', fields, );
  // console.log('crudForm\n', crudForm); // undefined on load, then array of objects // debugger;

  const name = (crudForm && findFormField(crudForm, 'name',)) || (detail && detail.name) || null;
  const createdAt = (detail && detail.createdAt) || null;
  
  return (
    updatable &&
    <Dialog
      open={updateDialogIsOpen}
      onEnter={() => onEnterDialog('loadSavedData')}
      onClose={onCloseDialog}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition} // https://material-ui.com/demos/dialogs/#alerts
      // keepMounted
      // aria-labelledby="alert-dialog-slide-title"
      // aria-describedby="alert-dialog-slide-description"
    >

      {/* { getAppBar(title, name, createdAt,) } */}
      <DialogAppBar title={title} name={name} message={createdAt} />

      <div className="ml-8 mr-16">
        {
        // <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        }
        <DialogContent className="pt-4">
          <FormTemplate
            fields={crudForm}
            onChange={onChangeForm}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={onUpdateItem} color="primary">
            Save
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}

// getDeleteDialog = () => (
const DeleteDialog = () => (
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

export { CreateDialog, UpdateDialog, DeleteDialog, }