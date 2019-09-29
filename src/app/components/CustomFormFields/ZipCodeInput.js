// usage
// import ZipCodeInput from 'app/components/ZipCodeInput';
// <ZipCodeInput />

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, } from '@material-ui/core'; // withStyles, InputAdornment,
import zipCodeData from 'app/components/GeoSelect/zip-code-data';
import _ from '@lodash';

// maps to key in app/config/AppConfig.formFieldConfig
// must be customized for custom components
const FORM_FIELD_ID = 'zipInput';

const INITIAL_STATE = {
  zip       : ''    ,
  lat       : ''    ,
  lon       : ''    ,
  city      : ''    ,
  state     : ''    ,
  county    : ''    ,
  isValid   : false ,
  showError : false ,
  // errors  : {}    ,
}

class ZipCodeInput extends Component {
  
  // state = { 
  //   isValid : false ,
  //   zip     : ''    ,
  //   lat     : ''    ,
  //   lon     : ''    ,
  //   city    : ''    ,
  //   state   : ''    ,
  //   county  : ''    ,
  // }

  // state = {
  //   zip     : this.props.value.zip     || ''    ,
  //   lat     : this.props.value.lat     || ''    ,
  //   lon     : this.props.value.lon     || ''    ,
  //   city    : this.props.value.city    || ''    ,
  //   state   : this.props.value.state   || ''    ,
  //   county  : this.props.value.county  || ''    ,
  //   isValid : this.props.value.isValid || false ,
  //   // errors  : this.props.errors        || {}    ,
  // }

  // ref: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
  state = INITIAL_STATE;

  componentDidMount = () => {
    this.handleLoad();
  }

  handleLoad = () => {
    const ready1 = this.props && this.props.value && this.props.value.isValid;
    if(!ready1) return null;
    const { zip, lat, lon, city, state, county, isValid, } = this.props.value;
    this.setState({ zip, lat, lon, city, state, county, isValid, });
  }

  handleIsValid = data => {
    // console.log('data\n', data,);
    // const { onChange, } = this.props;
    // this.setState({ showError: true, }, () =>
    //   this.props.onChange(data)
    // );
    this.setState({ showError: true, });
  }

  handleOnChange = () => {
    // make arg conform to canonical structure of event.target
    const data = {
      target: {
        id: FORM_FIELD_ID,
        value: {
          ...this.state,
          formFieldConfigKey: FORM_FIELD_ID,
        }
      },
    };
    this.props.onChange(data);
  } 

  setValid = () => {
    const { zip, } = this.state;
    const { handleIsValid, } = this;
    const zipData = zipCodeData[zip];
    // console.log('zipData\n', zipData,);

    const isValid = zipData && !_.isEmpty(zipData);
    const ready1 = isValid;
    if(!ready1) return null;

    // const { lat, lon, city, state, county, } = zipData;
    this.setState({
      isValid, ...zipData, // lat, lon, city, state, county,
    },
      () => {
        if(isValid) this.handleIsValid();
      }
    );
  }

  handleChange = event => {
    const TARGET_LENGTH = 5; // nominal length of zip code string, e.g., 10118
    
    // console.log( 'target\n', event.target, );
    const { value, } = event.target; // id,
    const length = value && value.length;

    const ready1 = ( length <= TARGET_LENGTH ); // 5
    if(!ready1) return null;

    if ( length < TARGET_LENGTH ) this.setState({
      // isValid: false,
      ...INITIAL_STATE,
    });
    
    this.setState({ zip: value, }, () => {
      this.handleOnChange();
      if( length === TARGET_LENGTH ) this.setValid();
    });
  }

  render() {
    const { required: isRequired, } = this.props; // onChange, onValid,
    const { handleChange, } = this;
    const { zip, city, state, county, isValid, showError, } = this.state; // lat, lon,
    console.log('state\n', this.state);

    const getZipCodeInput = () =>
      <TextField
        // className={classes.formControl}
        className="mb-24"
        fullWidth
        // margin="normal"
        // label={`Zip code${isRequired ? ' *' : ''}`} //"Zip code" // {label}
        label="Zip code" // {label}
        // autoFocus={autoFocus}
        // id="zip-code-input"
        // id="zip"
        // name={id}
        type="text" // {type}
        // value={this.state.name}
        // value={"hello"}
        value={zip} // {value}
        // defaultValue={'hi'}//{id && values && values[id]}//
        onChange={handleChange}
        variant="outlined"
        required={isRequired}
        error={isRequired && showError && !isValid}
        // multiline={multiline}
        // rows={rows}
        // InputLabelProps={InputLabelProps}
    
        helperText={
          isValid
          ?
          `${city}, ${county} County, ${state}` // ${lat} ${lon} ${isValid} // "Some important text"
          :
          '' // 'Zip code not recognized'
        }
        
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       {
        //       // <IconButton
        //       //   edge="end"
        //       //   aria-label="Toggle password visibility"
        //       //   onClick={handleClickShowPassword}
        //       // >
        //       //   {values.showPassword ? <VisibilityOff /> : <Visibility />}
        //       // </IconButton>
        //       }
        //       <Icon>{ isValid ? 'done' : 'clear' }</Icon>
        //     </InputAdornment>
        //   ),
        // }}
      />

    return getZipCodeInput();
  }
}

ZipCodeInput.propTypes = {
  icon: PropTypes.string,
  required: PropTypes.bool,
  // onValid: PropTypes.func,
  onChange: PropTypes.func,
};

ZipCodeInput.defaultProps = {
  icon: 'place',
  required: false, //true,
  // onValid: () => console.log('is valid. I am default.'),
  onChange: () => console.log('I changed. I am default.'),
};
 
export default ZipCodeInput;
// export default withStyles(styles)(ZipCodeInput);