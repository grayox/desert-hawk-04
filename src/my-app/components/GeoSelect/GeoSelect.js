import React from 'react';
import PropTypes from 'prop-types';
import geoData from './geolocations-backpage';
import SelectControl from '../selects/SelectControl'

function GeoSelect(props) {
  const { size, control, variant, open, value, onOpen, onClose, onChange, } = props;
  const items = getListItems(props);
  return (
    <SelectControl
      size={size}
      label={'Select ' + variant}
      items={items}
      control={control}
      open={open}
      value={value}
      onOpen={onOpen}
      onClose={onClose}
      onChange={onChange}
    />
  );
}

function getListItems(props) {
  const { variant, country, region } = props;
  let out, ready;
  // console.log('props\n', this.props);
  switch(variant) {
    case 'country':
      out = Object.keys(geoData);
      break;
    case 'region':
      ready = !!country;
      if(!ready) {
        console.error('Missing country');
        return;
      }
      out = Object.keys(geoData[country]);
      break;
    case 'local':
      ready = !!(country && region);
      if(!ready) {
        console.error('Missing country or region');
        return;
      }
      out = geoData[country][region];
      break;
    default:
      console.error('We do not recognize that variant: ', variant);
  }
  return out;
}

GeoSelect.defaultProps = {
  size: 'medium',
  control: 'select',
};

GeoSelect.propTypes = {
  // classes: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['country', 'region', 'local']),
  control: PropTypes.oneOf(['none', 'select', 'button']).isRequired, // default: 'select'
  country: PropTypes.string,
  region: PropTypes.string,
  size: PropTypes.string,
  open: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  // onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GeoSelect;