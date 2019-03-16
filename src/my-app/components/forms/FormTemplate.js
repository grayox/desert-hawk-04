// inspired by src/my-app/apps/contacts/UserMultiForm.js

// import React, { Component } from 'react';
import React from 'react';
import {
  TextField, Icon,
  // Button, Dialog, DialogActions, DialogContent, IconButton, Typography, Toolbar, AppBar, Avatar
} from '@material-ui/core';
// import { withStyles } from '@material-ui/core/styles/index';
// import { bindActionCreators } from 'redux';
// import * as Actions from './store/actions';
// import { connect } from 'react-redux';
// import _ from '@lodash';

// const styles = theme => ({
//   root: {},
//   formControl: {
//     marginBottom: 24
//   }
// });

// const INITIAL_STATE = {
//   id       : null ,
//   name     : null ,
//   lastName : null ,
//   avatar   : 'assets/images/avatars/profile.jpg',
//   nickname : null ,
//   company  : null ,
//   jobTitle : null ,
//   email    : null ,
//   phone    : null ,
//   address  : null ,
//   birthday : null ,
//   notes    : null ,
// };

// state = { ...INITIAL_STATE };

// handleChange = event => {
//   this.setState(
//     _.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
//     , () => this.props.onChange(this.state)
//   );
// };

// canBeSubmitted() {
//   const { name } = this.state;
//   return (
//     name.length > 0
//   );
// }

const FormTemplate = ({ fields, onChange, }) => {
  console.log('fields\n', fields);
  return (
    <div className="p-24px">
      {
        fields.map(field => (
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">{field.icon}</Icon>
            </div>
            <TextField
              // className={classes.formControl}
              className="mb-24"
              label={field.label}
              autoFocus={field.autoFocus}
              id={field.id}
              name={field.id}
              type={field.type}
              // value={this.state.name}
              onChange={onChange}
              variant="outlined"
              required={field.required}
              fullWidth
              multiline={field.multiline}
              rows={field.rows}
              InputLabelProps={field.InputLabelProps}
            />
          </div>
        ))
      }
    </div>
  );
}


// export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(FormTemplate));
// export default withStyles(styles, { withTheme: true })(FormTemplate);
export default FormTemplate;