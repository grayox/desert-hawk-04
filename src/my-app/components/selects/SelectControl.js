import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, InputLabel, MenuItem, ListItemText, FormControl, Select, Button, Icon,
} from '@material-ui/core';

const styles = theme => ({
  formControl: {
    minWidth: 150,
    margin: theme.spacing.unit,
  },
  hiddenControl: {
    width: 0,
    height: 0,
    marginTop: '-4px',
    visibility: 'hidden',
  },
});

const SelectControl = props => <div autoComplete="off">{getFormContent(props)}</div>

const getFormContent = props => {
  const { classes, label, size, control, } = props; // icon,
  let out;
  switch(control) {
    case 'none':
      out = (
        <div className={classes.hiddenControl}>
          {getSelect(props)}
        </div>
      );
      break;
    case 'select':
      out = (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="geo">{label}</InputLabel>
          {getSelect(props)}
        </FormControl>
      );
      break;
    case 'button':
      out = (
        <React.Fragment>
          <Button
            className={classes.button}
            onClick={props.onClick}
            size={size}
          >{label}</Button>
          <div className={classes.hiddenControl}>
            {getSelect(props)}
          </div>
        </React.Fragment>
      );
      break;
    default:
      console.warn('default called');
  }
  return out;
}

const getSelect = props => {
  const { open, value, items, onOpen, onClose, onChange, } = props;
  return (
    <Select
      open={open}
      value={value}
      onOpen={onOpen}
      onClose={onClose}
      onChange={ e => onChange(e) }
      inputProps={{
        name: 'value',
        id: 'select',
      }}
    >
      {getMenuItems(items, props,)}
    </Select>
  );
}

const getMenuItems = ( items, props, ) => {
  const out = items.map(item =>
    item.icon
    ?
    (
      <MenuItem key={item.value} value={item.value}>
        {props && props.icon && <Icon>{item.icon}</Icon>}
        <ListItemText primary={item.label} />
      </MenuItem>
    )
    :
    (
      <MenuItem key={item} value={item}>
        <ListItemText primary={item} />
      </MenuItem>
    )
  );
  return out;
}

SelectControl.defaultProps = {
  size: 'medium',
  control: 'select',
  icon: false,
};

SelectControl.propTypes = {
  // classes: PropTypes.object.isRequired,
  // button size
  size: PropTypes.oneOf([ 'small', 'medium', 'large', ]).isRequired, // default: 'medium'
  // 'none' requires an external button to control open and closing
  // 'button' provides its own button
  // 'select' provides standard dropdown interface
  control: PropTypes.oneOf([ 'none', 'select', 'button', ]).isRequired, // default: 'select'
  label: PropTypes.string,
  open: PropTypes.bool.isRequired,
  icon: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

SelectControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectControl);