// usage
// import ZipCodeInput from 'my-app/components/ZipCodeInput';
// <ZipCodeInput />

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, Icon, } from '@material-ui/core';
import zipCodeData from 'my-app/components/GeoSelect/zip-code-data';
import _ from '@lodash';

class ZipCodeInput extends Component {
  
  state = { 
    valid  : false ,
    zip    : ''    ,
    lat    : ''    ,
    lon    : ''    ,
    city   : ''    ,
    state  : ''    ,
    county : ''    ,
  }

  setValid = () => {
    const { zip, } = this.state;
    const zipData = zipCodeData[zip];
    // console.log('zipData\n', zipData,);

    const valid = zipData && !_.isEmpty(zipData);
    const ready1 = valid;
    if(!ready1) return null;

    // const { lat, lon, city, state, county, } = zipData;
    this.setState({
      valid, ...zipData, // lat, lon, city, state, county,
    });
  }

  handleChange = event => {
    // console.log('target\n', event.target);
    const { value, } = event.target; // id,

    const ready1 = ( value && value.length ) < 6;
    if(!ready1) return null;

    this.setState({ zip: value, }, () => this.setValid());
  }

  render() {
    const { icon, } = this.props;
    const { handleChange, } = this;
    const { valid, zip, city, state, county, } = this.state; // lat, lon,

    return (
      <div className="flex">
        <div className="min-w-48 pt-20">
          <Icon color="action">{icon}</Icon>
        </div>
        <TextField
          // className={classes.formControl}
          className="mb-24"
          label="Zip code" // {label}
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

          helperText={valid ? `${city}, ${county} County, ${state}` : ''} // ${lat} ${lon} ${valid} // "Some important text"
          margin="normal"
        />
      </div>
    );
  }
}

ZipCodeInput.propTypes = {
  icon: PropTypes.string,
};

ZipCodeInput.defaultProps = {
  icon: 'place',
};
 
export default ZipCodeInput;
// export default withStyles(styles)(ZipCodeInput);