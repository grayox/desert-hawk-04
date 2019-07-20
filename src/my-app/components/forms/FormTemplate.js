// inspired by src/my-app/apps/contacts/UserMultiForm.js

// import React, { Component } from 'react';
import React from 'react';
import {
  TextField, Icon,
  // Button, Dialog, DialogActions, DialogContent, IconButton, Typography, Toolbar, AppBar, Avatar
} from '@material-ui/core';

import MenuField from '../MenuField';

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

const getTextField = (
  onChange, { value, id, label, autoFocus, type, required, multiline, rows, InputLabelProps, },
) =>
    <TextField
      // className={classes.formControl}
      className="mb-24"
      label={label}
      autoFocus={autoFocus}
      id={id}
      name={id}
      type={type}
      // value={this.state.name}
      // value={"hello"}
      value={value}
      // defaultValue={'hi'}//{id && values && values[id]}//
      onChange={onChange}
      variant="outlined"
      required={required}
      fullWidth
      multiline={multiline}
      rows={rows}
      InputLabelProps={InputLabelProps}
    />

const getComponent = ( onChange, component, key,) => component && React.cloneElement( component, { key, onChange, }, )

const getMenuField = (onChange, id, icon, label, options,) =>
  <MenuField key={id} onChange={onChange} id={id} icon={icon} label={label} options={options} />

const FormTemplate = ({ fields, onChange, }) => {
  // console.log('fields\n', fields);
  // debugger;
  const ready1 = fields;
  if(!ready1) return null;

  const getConfig = ( id, icon, type, rest, component, ) => {
    // console.log('id\n', id,);
    // console.log('type\n', type,);
    // console.log('rest\n', rest,);
    const config = {
      component: getComponent(onChange, component, id,),
      text: getTextField(onChange, rest,),
      menu: getMenuField(onChange, id, icon, rest.label, rest.options,),
    }
    const out = config[type];
    return out;
  }

  return (
    <div className="p-24px">
      { 
        fields.map(({ id, icon, type, component, ...rest, }) =>
          <div key={id} className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">{icon}</Icon>
            </div>
            { getConfig(id, icon, type, rest, component,) }
          </div>
        )}
    </div>
  );

}

// export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(FormTemplate));
// export default withStyles(styles, { withTheme: true })(FormTemplate);
export default FormTemplate;