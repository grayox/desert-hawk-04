// inspired by src/app/apps/contacts/UserMultiForm.js

// import React, { Component } from 'react';
import React from 'react';
import {
  TextField, Icon,
  // Button, Dialog, DialogActions, DialogContent, IconButton, Typography, Toolbar, AppBar, Avatar
} from '@material-ui/core';

import MenuField from '../CustomFormFields/MenuField';
import SelectField from '../CustomFormFields/SelectField';

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
  onChange, id, { value, label, autoFocus, type, required, multiline, rows, InputLabelProps, },
) =>
    <TextField
      // className={classes.formControl}
      className="mb-24"
      fullWidth
      // margin="normal"
      label={label}
      autoFocus={autoFocus}
      id={id}
      name={id}
      type={type}
      // value={this.state.name}
      // value={"hello"}
      value={value && value.length && value} // solves error when passed empty string
      // defaultValue={'hi'}//{id && values && values[id]}//
      onChange={onChange}
      variant="outlined"
      required={required}
      multiline={multiline}
      rows={rows}
      InputLabelProps={InputLabelProps}
    />

// note: add value field to: populate non-text fields including menu, select and zipInput

const getComponent = ( onChange, component, key, { required, value, }, ) =>
  component && React.cloneElement( component, { key, onChange, required, value, }, )

const getMenuField = ( onChange, id, { label, options, required, value, }, ) =>
  <MenuField key={id} onChange={onChange} id={id} label={label} options={options} required={required} value={value} />

const getSelectField = ( onChange, id, { label, options, required, value, }, ) =>
  <SelectField key={id} onChange={onChange} id={id} label={label} options={options} required={required} value={value} />

const FormTemplate = ({ fields, onChange, }) => {
  // console.log('fields\n', fields);
  // debugger;
  const ready1 = fields;
  if(!ready1) return null;

  const getConfig = ( id, type, rest, component, ) => {
    // Add new component types to the below config object
    // (from src/app/config/AppConfig.js)
    // console.log('id\n', id,);
    // console.log('type\n', type,);
    // console.log('rest\n', rest,);
    const config = {
      text: getTextField(onChange, id, rest,),
      menu: getMenuField(onChange, id, rest,),
      select: getSelectField(onChange, id, rest,),
      component: getComponent(onChange, component, id, rest,), // includes: zipInput
    };
    const out = config[type];
    return out;
  }

  const getField = ( icon, id, type, rest, component, ) =>
    <div key={id} className="flex">
      <div className="min-w-48 pt-20">
        <Icon color="action">{icon}</Icon>
      </div>
      { getConfig(id, type, rest, component,) }
    </div>

  const getFormTemplate = () =>
    <div className="p-24px">
      {
        fields.map(({ icon, id, type, component, ...rest, }) =>
          getField( icon, id, type, rest, component, )
        )
      }          
    </div>

  return getFormTemplate();
}

// export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(FormTemplate));
// export default withStyles(styles, { withTheme: true })(FormTemplate);
export default FormTemplate;