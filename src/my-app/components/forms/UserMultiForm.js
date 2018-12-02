import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";

// untilities
import _ from 'lodash';
import * as EmailValidator from 'email-validator';
import NumberFormat from 'react-number-format';

import {
  Typography, Button, Icon, TextField, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel,
  // MenuItem, FormHelperText,
} from '@material-ui/core';

import Paper from '@material-ui/core/Paper';

import { bizCategoryItems } from 'my-app/config/AppConfig';
import GeoStepper from 'my-app/components/steppers/GeoStepper'

// import classNames from 'classnames';

// firebase
import firebase from '@firebase/app';
import '@firebase/firestore';
const db = firebase.firestore();

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  // leftIcon: {
  //   marginRight: theme.spacing.unit,
  // },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  // iconSmall: {
  //   fontSize: 20,
  // },

  // container: {
  //   // display: 'flex',
  //   // flexWrap: 'wrap',
  //   marginLeft: 2 * theme.spacing.unit,
  // },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: '100%',
    display: 'block',
  },
  // dense: {
  //   marginTop: 19,
  // },
  // menu: {
  //   width: 200,
  // },
  formControl: {
    display: 'block',
    marginTop: 5 * theme.spacing.unit,
    marginBottom: 5 * theme.spacing.unit,
  }
});

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  bizCategory: '',
  geoNation: '',
  geoRegion: '',
  geoLocal: '',
  geoKey: Date.now(), // necessary to re-render GeoSelect component after reset
  
  isValidName: false,
  isValidEmail: false,
  isValidPhone: false,
  isValidBizCategory: false,
  isValidGeo: false,
  isValidForm: false,

  isErrorName: false,
  isErrorEmail: false,
  helperTextName: '',
  helperTextEmail: '',
};

class UserMultiForm extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  saveToFirebase = data => {
    const collectionRef = db.collection(this.props.savePath);
    // console.info('submitting...', model);  
    collectionRef.add(data)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
    // console.info('submitted: ', model);
  }

  resetForm = () => {
    this.setState(INITIAL_STATE);
    this.setState({
      geoKey: Date.now(), // resets geoStepper
    });
  }

  handleValidFormSubmit = model => {
    const picked = _.pick(model, [ 'name', 'email', 'phone', 'bizCategory', 'geoNation', 'geoRegion', 'geoLocal', ]);
    const newData = {
      ...picked,
      timestamp: Date.now(),
    };
    this.saveToFirebase(newData);
    this.resetForm();
  };

  handleValidGeoStepper = model => {
    // handleSaveGeoStepper = model => {
    const picked = _.pick(model, [ 'geoNation', 'geoRegion', 'geoLocal', ]);
    const newState = {
      ...picked,
      isValidGeo: true,
    };
    this.setState(newState, () => {
      this.handleChangeForm();
    });
  };

  handleChangeText = FieldLabel => event => {
    const newState = { [FieldLabel]: event.target.value, };
    this.setState(newState, () => {
      this.handleChangeForm();
    });
  };

  handleChangePhone = (values, e) => {
    // console.log('values\n', values);
    // console.log('e\n', e);
    const newState = { phone: values.value, }
    this.setState(newState, () => {
      this.handleChangeForm();
    });
  }

  handleChangeRadio = event => {
    const newState = { bizCategory: event.target.value };
    this.setState(newState, () => {
      this.handleChangeForm();
    });
  };

  getNameIsValid = () => {
    const HELP_TEXT = 'Min character length is 4';
    const { name } = this.state;
    const isValid = name.length > 3;
    const isError = !!name.length && !isValid;
    const helperText = isError ? HELP_TEXT : '';
    const newState = {
      isValidName: isValid,
      isErrorName: isError,
      helperTextName: helperText,
    };
    this.setState(newState);
    return isValid;
  };

  getEmailIsValid = () => {
    const HELP_TEXT = 'This is not a valid email';
    const { email } = this.state;
    const isValid = EmailValidator.validate(email);
    const isError = !!email.length && !isValid;
    const helperText = isError ? HELP_TEXT : '';
    const newState = {
      isValidEmail: isValid,
      isErrorEmail: isError,
      helperTextEmail: helperText,
    };
    this.setState(newState);
    return isValid;
  };

  getPhoneIsValid = () => {
    const MIN_LENGTH = 10;
    const { phone } = this.state;
    const len = phone.length;
    const helpText = [len, MIN_LENGTH].join('/');
    const isValid = phone.length === MIN_LENGTH;
    const isError = !!phone.length && !isValid;
    const helperText = isError ? helpText : '';
    const newState = {
      isValidPhone: isValid,
      isErrorPhone: isError,
      helperTextPhone: helperText,
    };
    this.setState(newState);
    return isValid;
  };

  getBizCategoryIsValid = () => {
    const { bizCategory } = this.state;
    const isValid = !!bizCategory;
    const newState = {
      isValidBizCategory: isValid,
    };
    this.setState(newState);
    return isValid;
  }

  // getGeoIsValid = () => {
  //   const { isValidGeo } = this.state;
  //   const isValid = isValidGeo;
  //   this.setState({
  //     isValidGeo: isValid,
  //   });
  //   return isValid;
  // }
  
  handleChangeForm = () => {
    // console.log('state\n', this.state);
    const { isValidGeo, } = this.state;
    const valid1  = this.getNameIsValid();
    const valid2  = this.getEmailIsValid();
    /*const valid2a =*/ this.getPhoneIsValid();
    const valid3  = this.getBizCategoryIsValid(); //!!bizCategory;
    const valid4  = isValidGeo; //this.getGeoIsValid(); // redundant; already set by handleValidGeoStepper()
    // console.log('valid-1', valid1);
    // console.log('valid-2', valid2);
    // console.log('valid-3', valid3);
    // console.log('valid-4', valid4);
    const isValidForm = valid1 && valid2 && valid3 && valid4;
    // console.log('isValidForm', isValidForm);
    this.setState({ isValidForm: isValidForm });
  };

  render() {
    const { classes, heading, geoStepperLabel, withPhone, } = this.props;
    const {
      name, isErrorName, helperTextName,
      email, isErrorEmail, helperTextEmail,
      phone, isErrorPhone, helperTextPhone,
      bizCategory, isValidForm, geoKey, // for reset purposes
      // for transparent state display
      // geoNation, geoRegion, geoLocal,
      // isValidName, isValidEmail, isValidGeo, isValidBizCategory, 
    } = this.state;
    const {
      handleChangeText,
      handleChangePhone,
      handleChangeRadio,
      // handleSaveGeoStepper,
      handleValidGeoStepper,
      handleValidFormSubmit,
      resetForm,
    } = this;
    const items = bizCategoryItems;

    return (
      <Paper className="max-w-sm m-32 p-32">
        <Typography className="h1 mb-24">{heading}</Typography>
        {/* <div>Name: {name}</div>
        <div>Email: {email}</div>
        <div>Phone: {phone}</div>
        <div>Category: {bizCategory}</div>
        <div>Country: {geoNation}</div>
        <div>Region: {geoRegion}</div>
        <div>Local: {geoLocal}</div>
        <div>geoKey: {geoKey}</div>
        <div>isValidName: {isValidName.toString()}</div>
        <div>isValidEmail: {isValidEmail.toString()}</div>
        <div>isValidBizCategory: {isValidBizCategory.toString()}</div>
        <div>isValidGeo: {isValidGeo.toString()}</div>
        <div>isValidForm: {isValidForm.toString()}</div> */}

        <form className={classes.container} noValidate autoComplete="on">
          <TextField
            // id="standard-name"
            required
            fullWidth
            label="Name"
            className={classes.textField}
            // className="mb-24"
            value={name}
            onChange={handleChangeText('name')}
            margin="normal"
            error={isErrorName}
            helperText={helperTextName}
          // type="text"
          // name="name"
          // value={this.state.name}
          // validations={{
          //   minLength: 4
          // }}
          // validationErrors={{
          //   minLength: 'Min character length is 4'
          // }}
          // required
          />
          <TextField
            // id="standard-name"
            required
            fullWidth
            label="Email"
            className={classes.textField}
            // className="my-24"
            value={email}
            onChange={handleChangeText('email')}
            margin="normal"
            error={isErrorEmail}
            helperText={helperTextEmail}
          // validations="isEmail"
          // validationError="This is not a valid email"
          />

          {
            withPhone ?
              // <PhoneInput
              //   placeholder="Enter phone number"
              //   country="US"
              //   value={phone}
              //   onChange={phone => this.setState({ phone })}
              // />
              <NumberFormat
                // required
                fullWidth
                customInput={TextField}
                format="+1 (###) ###-####"
                mask="_"
                label="Phone"
                className={classes.textField}
                value={phone} // needed to reset
                error={isErrorPhone}
                helperText={helperTextPhone}
                onValueChange={handleChangePhone}
                margin="normal"
              />
              : null
          }

          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Business Category</FormLabel>
            <RadioGroup
              required
              aria-label="Business Category"
              name="bizCategory"
              className={classes.group}
              value={bizCategory}
              onChange={handleChangeRadio}
            >
              {items.map(item =>
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  label={item.label}
                  control={<Radio color="primary" />}
                // labelPlacement="start"
                />
              )}
            </RadioGroup>
            {/* <FormHelperText>Select one</FormHelperText> */}
          </FormControl>
         
          <GeoStepper
            key={geoKey} // reset with unique new key
            heading={geoStepperLabel}
            showSaveButton={false}
            // onSave={handleSaveGeoStepper}
            onValid={handleValidGeoStepper}
          />

          <Button className={[classes.button, "mr-32"].join(" ")}>Cancel</Button>
          <Button 
            className={classes.button}
            onClick={resetForm}
          >Reset</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!isValidForm}
            // onClick={() => onSave(this.state)}
            onClick={() => handleValidFormSubmit(this.state)}
          >
            Send
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </form>

      </Paper >
    );
  }
}

UserMultiForm.propTypes = {
  classes: PropTypes.object.isRequired,
  heading: PropTypes.string,
  savePath: PropTypes.string,
  geoStepperLabel: PropTypes.string,
  withPhone: PropTypes.bool,
};

export default withStyles(styles)(UserMultiForm);