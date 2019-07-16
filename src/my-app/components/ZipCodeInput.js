// usage
// import ZipCodeInput from 'my-app/components/ZipCodeInput';
// <ZipCodeInput />

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, Icon, InputAdornment, } from '@material-ui/core';
import zipCodeData from 'my-app/components/GeoSelect/zip-code-data';
import _ from '@lodash';

class ZipCodeInput extends Component {
  
  state = { 
    isValid : false ,
    zip     : ''    ,
    lat     : ''    ,
    lon     : ''    ,
    city    : ''    ,
    state   : ''    ,
    county  : ''    ,
  }

  setValid = () => {
    const { zip, } = this.state;
    const { onValid, } = this.props;
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
        if(isValid) onValid(this.state);
      }
    );
  }

  handleChange = event => {
    const TARGET_LENGTH = 5; // nominal length of zip code string, e.g., 10118
    
    // console.log('target\n', event.target);
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
    const { icon, isRequired, } = this.props; // onValid,
    const { handleChange, } = this;
    const { isValid, zip, city, state, county, } = this.state; // lat, lon,

    return (
      <div className="flex">
        <div className="min-w-48 pt-20">
          <Icon color="action">{icon}</Icon>
        </div>
        <TextField
          // className={classes.formControl}
          className="mb-24"
          label={`Zip code${isRequired ? ' *' : ''}`} //"Zip code" // {label}
          // autoFocus={autoFocus}
          // id="zip-code-input"
          // name={id}
          type="text" // {type}
          // value={this.state.name}
          // value={"hello"}
          value={zip}//{value}
          // defaultValue={'hi'}//{id && values && values[id]}//
          onChange={handleChange}
          variant="outlined"
          // required={required}
          fullWidth
          // multiline={multiline}
          // rows={rows}
          // InputLabelProps={InputLabelProps}

          helperText={isValid ? `${city}, ${county} County, ${state}` : ''} // ${lat} ${lon} ${isValid} // "Some important text"
          margin="normal"

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
      </div>
    );
  }
}

ZipCodeInput.propTypes = {
  icon: PropTypes.string,
  isRequired: PropTypes.bool,
  onValid: PropTypes.func,
};

ZipCodeInput.defaultProps = {
  icon: 'place',
  isRequired: true,
  onValid: () => console.log('is valid'),
};
 
export default ZipCodeInput;
// export default withStyles(styles)(ZipCodeInput);