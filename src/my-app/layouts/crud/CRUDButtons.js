// inspired by https://material-ui.com/demos/buttons/#icon-buttons

import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles, Button, Icon, IconButton, Tooltip, Zoom, } from '@material-ui/core';

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

// const ButtonsRowDetail = ({ limit, selectedIndex, deletable, updatable, onToggle, onDelete, onUpdate, onNavBack, onNavNext, }) => (
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

const ButtonsRowDetail = ({ limit, selectedIndex, deletable, updatable, onToggle, onDelete, onUpdate, onNavBack, onNavNext, }) => (
  <div className="flex mx-8">
    <Tooltip TransitionComponent={Zoom} title="Previous">
      <span className="flex-1 text-center mt-8">
        <IconButton onClick={onNavBack} disabled={selectedIndex === 0}>
          <Icon>arrow_back_ios</Icon>
        </IconButton>
      </span>
    </Tooltip>
    {
    deletable &&
    <Tooltip TransitionComponent={Zoom} title="Delete...">
      <span className="flex-1 text-center mt-8">
        <IconButton onClick={onDelete}>
          <Icon>delete</Icon>
        </IconButton>
      </span>
    </Tooltip>
    }
    <Tooltip TransitionComponent={Zoom} title="Clear">
      <span className="flex-1 text-center mt-8">
        <IconButton onClick={onToggle}>
          <Icon>clear</Icon>
        </IconButton>
      </span>
    </Tooltip>
    {
    updatable &&
    <Tooltip TransitionComponent={Zoom} title="Edit">
      <span className="flex-1 text-center mt-8">
        <IconButton onClick={onUpdate}>
          <Icon>edit</Icon>
        </IconButton>
      </span>
    </Tooltip>
    }
    <Tooltip TransitionComponent={Zoom} title="Next">
      <span className="flex-1 text-center mt-8">
        <IconButton onClick={onNavNext} disabled={selectedIndex > limit}>
          <Icon>arrow_forward_ios</Icon>
        </IconButton>
      </span>
    </Tooltip>
  </div>
);
 
const ButtonsRowList = ({ creatable, searchable, filterable, sortable, onClickCreate, onClickSearch, onClickFilter, onClickSort, }) => (
  <div className="w-full flex">
    { creatable && CreateButton(onClickCreate) }
    { // searchable &&
    <Tooltip TransitionComponent={Zoom} placement="bottom" title="Search">
      <IconButton color="inherit" aria-label="Search"
        onClick={() => {}}
      >
        <Icon>search</Icon>
      </IconButton>
    </Tooltip>
    }
    { // filterable &&
    <Tooltip TransitionComponent={Zoom} placement="bottom" title="Filter">
      <IconButton color="inherit" aria-label="Filter"
        onClick={() => {}}
      >
        <Icon>filter_list</Icon>
      </IconButton>
    </Tooltip>
    }
    { // sortable &&
    <Tooltip TransitionComponent={Zoom} placement="bottom" title="Sort">
      <IconButton color="inherit" aria-label="Sort"
        onClick={() => {}}
      >
        <Icon>sort</Icon>
      </IconButton>
    </Tooltip>
    }
  </div>
);

const CreateButton = onClick => (
  <Tooltip TransitionComponent={Zoom} title="Add new item">
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      // className={classNames(classes.margin, "w-full",)}
      // className="w-full"
    >
      {
        // <Icon className={classes.leftIcon}>add</Icon>
      }
      <Icon>add</Icon>
    </Button>
  </Tooltip>
);

const UDButtonsUnstyled = ({ classes, deletable, updatable, onUpdate, onDelete, }) => (
  <React.Fragment>
  {
    deletable && (
      <IconButton
        aria-label="Delete" 
        className={classes.margin}
        onClick={onDelete}
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
        onClick={onUpdate}
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

export { CreateButton, UDButtons, ButtonsRowList, ButtonsRowDetail, }