// inspired by https://material-ui.com/demos/buttons/#icon-buttons

import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles, Button, Icon, IconButton, } from '@material-ui/core';

const styles = theme => ({
  margin: {
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

// const ButtonsRow = ({ limit, selectedIndex, deletable, updatable, onToggle, onDelete, onUpdate, onNavBack, onNavNext, }) => (
//   <div className="flex">
//     <Button className="flex-1" variant="outlined" onClick={onNavBack} disabled={selectedIndex === 0}><Icon>chevron_left</Icon></Button> 
//     {
//     deletable &&
//     <Button className="flex-1" variant="outlined" onClick={onDelete}><Icon>delete</Icon></Button>
//     }
//     <Button className="flex-1" variant="outlined" onClick={onToggle}><Icon>clear</Icon></Button>
//     {
//     updatable &&
//     <Button className="flex-1" variant="outlined" onClick={onUpdate}><Icon>edit</Icon></Button>
//     }
//     <Button className="flex-1" variant="outlined" onClick={onNavNext} disabled={selectedIndex > limit}><Icon>chevron_right</Icon></Button>
//   </div>
//  );

const ButtonsRow = ({ limit, selectedIndex, deletable, updatable, onToggle, onDelete, onUpdate, onNavBack, onNavNext, }) => (
  <div className="flex mx-8">
    <span className="flex-1 text-center mt-8">
      <IconButton onClick={onNavBack} disabled={selectedIndex === 0}>
        <Icon>arrow_back_ios</Icon>
      </IconButton>
    </span> 
    {
    deletable &&
    <span className="flex-1 text-center mt-8">
      <IconButton onClick={onDelete}>
        <Icon>delete</Icon>
      </IconButton>
    </span>
    }
    <span className="flex-1 text-center mt-8">
      <IconButton onClick={onToggle}>
        <Icon>clear</Icon>
      </IconButton>
    </span>
    {
    updatable &&
    <span className="flex-1 text-center mt-8">
      <IconButton onClick={onUpdate}>
        <Icon>edit</Icon>
      </IconButton>
    </span>
    }
    <span className="flex-1 text-center mt-8">
      <IconButton onClick={onNavNext} disabled={selectedIndex > limit}>
        <Icon>arrow_forward_ios</Icon>
      </IconButton>
    </span>
  </div>
 );
 
 const CreateButton = ({ onClick, }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    // className={classNames(classes.margin, "w-full",)}
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
        className={classes.margin}
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
        className={classes.margin}
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
  deletable: false,
  updatable: false,
};
 
const UDButtons = withStyles(styles, { withTheme: true })(UDButtonsUnstyled);                                                       

export { CreateButton, UDButtons, ButtonsRow, }