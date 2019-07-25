// usage
// import ZipCodeInput from 'my-app/components/ZipCodeInput';
// <ZipCodeInput />

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, } from '@material-ui/core'; // withStyles, InputAdornment,
import zipCodeData from 'my-app/components/GeoSelect/zip-code-data';
import _ from '@lodash';

// maps to key in my-app/config/AppConfig.formFieldConfig
// must be customized for custom components
const FORM_FIELD_ID = 'zipInput';

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

  // ref: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
  state = { 
    isValid : this.props.value.isValid || false ,
    zip     : this.props.value.zip     || ''    ,
    lat     : this.props.value.lat     || ''    ,
    lon     : this.props.value.lon     || ''    ,
    city    : this.props.value.city    || ''    ,
    state   : this.props.value.state   || ''    ,
    county  : this.props.value.county  || ''    ,
  }

  onValid = data => {
    // console.log('data\n', data,);
    // const { onChange, } = this.props;
    this.props.onChange(data);
  }

  setValid = () => {
    const { zip, } = this.state;
    const { onValid, } = this;
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
        if(isValid) {
          // make arg conform to canonical structure of event.target
          const arg = {
            target: {
              id: FORM_FIELD_ID,
              value: {
                ...this.state,
                formFieldConfigKey: FORM_FIELD_ID,
              }
            },
          };
          onValid(arg);
        }
      }
    );
  }

  handleChange = event => {
    const TARGET_LENGTH = 5; // nominal length of zip code string, e.g., 10118
    
    // console.log( 'target\n', event.target, );
    const { value, } = event.target; // id,
    const length = value && value.length;

    const ready1 = length < ( TARGET_LENGTH + 1 ); // 6
    if(!ready1) return null;

    if ( length < TARGET_LENGTH ) this.setState({ isValid: false, });
    
    this.setState({ zip: value, }, () => {
      if( length === TARGET_LENGTH ) this.setValid();
    });
  }

  render() {
    const { required, } = this.props; // onChange, onValid,
    const { handleChange, } = this;
    const { isValid, zip, city, state, county, } = this.state; // lat, lon,

    return (
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
        value={zip}//{value}
        // defaultValue={'hi'}//{id && values && values[id]}//
        onChange={handleChange}
        variant="outlined"
        required={required}
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
    );
  }
}

ZipCodeInput.propTypes = {
  icon: PropTypes.string,
  required: PropTypes.bool,
  onValid: PropTypes.func,
  onChange: PropTypes.func,
};

ZipCodeInput.defaultProps = {
  icon: 'place',
  required: false, //true,
  onValid: () => console.log('is valid. I am default.'),
  onChange: () => console.log('I changed. I am default.'),
};
 
export default ZipCodeInput;
// export default withStyles(styles)(ZipCodeInput);