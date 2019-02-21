// inspired by https://material-ui.com/demos/buttons/#icon-buttons

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Icon, IconButton, } from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  // leftIcon: {
  //   marginRight: theme.spacing.unit,
  // },
  // rightIcon: {
  //   marginLeft: theme.spacing.unit,
  // },
  // iconSmall: {
  //   fontSize: 20,
  // },
});


const ButtonsRow = ({ limit, selectedIndex, onToggle, onDelete, onUpdate, onNavBack, onNavNext, }) => (
  <div className="flex">
    <Button className="flex-1" variant="outlined" onClick={onNavBack} disabled={selectedIndex === 0}><Icon>chevron_left</Icon></Button> 
    <Button className="flex-1" variant="outlined" onClick={onDelete}><Icon>delete</Icon></Button>
    <Button className="flex-1" variant="outlined" onClick={onToggle}><Icon>clear</Icon></Button>
    <Button className="flex-1" variant="outlined" onClick={onUpdate}><Icon>edit</Icon></Button>
    <Button className="flex-1" variant="outlined" onClick={onNavNext} disabled={selectedIndex > limit}><Icon>chevron_right</Icon></Button>
  </div>
 );
 
 const CreateButton = ({ onClick, }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    // className={classNames(classes.button, "w-full",)}
    className="w-full"
  >
    {
      // <Icon className={classes.leftIcon}>add</Icon>
    }
    <Icon>add</Icon>
  </Button>
);

const UDButtonsUnstyled = ({ classes, deletable, updatable, onClickOpen, }) => (
  <React.Fragment>
  {
    deletable && (
      <IconButton
        aria-label="Delete" 
        className={classes.button}
        onClick={() => onClickOpen('isBeingDeleted')}
      >
        <Icon>delete</Icon>
      </IconButton>
    )
  }    
  {
    updatable && (
      <IconButton
        aria-label="Edit" 
        className={classes.button}
        onClick={() => onClickOpen('isBeingUpdated')}
      >
        <Icon>edit</Icon>
      </IconButton>
    )
  }
  </React.Fragment>
);

UDButtonsUnstyled.propTypes = {
  classes: PropTypes.object.isRequired,
  deletable: PropTypes.bool,
  updatable: PropTypes.bool,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

UDButtonsUnstyled.defaultProps = {
  deletable: true,
  updatable: true,
};
 
const UDButtons = withStyles(styles, { withTheme: true })(UDButtonsUnstyled);                                                       

export { CreateButton, UDButtons, ButtonsRow, }