// inspired by
// https://material-ui.com/components/selects/#simple-select

import React from 'react';
import {
  // makeStyles, Input, FilledInput, FormHelperText,
  OutlinedInput, InputLabel, MenuItem, FormControl, Select,
} from '@material-ui/core';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

const SelectField = ({onChange, id, label, options,}) => {
  // const classes = useStyles();
  const [ values, setValues, ] = React.useState({
    age: '',
    name: 'hai',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <form
      // className={classes.root}
      className="w-full"
      autoComplete="off"
    >
      <FormControl
        variant="outlined"
        fullWidth
        // className={classes.formControl}
      >
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          {/* Age */}
          {label}
        </InputLabel>
        <Select
          fullWidth
          value={values.age}
          onChange={handleChange}
          input={<OutlinedInput labelWidth={labelWidth} name={label} id={id} />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          {
            // options.map(( option, index, ) => (
            options.map(( { value, label, }, index, ) => (
              <MenuItem
                // key={option}
                key={value}
                // disabled={index === 0}
                // selected={index === selectedIndex}
                // onClick={event => handleMenuItemClick(event, index,)}
                value={value}
              >
                {/* {option} */}
                {label}
              </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}

export default SelectField;
// makeStyles(styles, { withTheme: true })(FormTemplate);