import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import withStyles from "@material-ui/core/styles/withStyles";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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

function getFormContent(props) {
  const { classes, label, size, control, } = props;
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
        <div>
          <Button
            className={classes.button}
            onClick={props.onClick}
            size={size}
          >{label}</Button>
          <div className={classes.hiddenControl}>
            {getSelect(props)}
          </div>
        </div>
      );
      break;
    default:
      console.log('default called');
  }
  return out;
}

function getSelect(props) {
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
      {getMenuItems(items)}
    </Select>
  );
}

function getMenuItems(items) {
  const out = items.map(item =>
    item.icon
      ?
        (
          <MenuItem key={item.value} value={item.value}>
            {React.createElement(item.icon)}
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
};

SelectControl.propTypes = {
  // classes: PropTypes.object.isRequired,
  // button size
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired, // default: 'medium'
  // 'none' requires an external button to control open and closing
  // 'button' provides its own button
  // 'select' provides standard dropdown interface
  control: PropTypes.oneOf(['none', 'select', 'button']).isRequired, // default: 'select'
  label: PropTypes.string,
  open: PropTypes.bool.isRequired,
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