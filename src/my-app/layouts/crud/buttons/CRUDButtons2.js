// inspired by https://material-ui.com/demos/buttons/#icon-buttons

import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles, Paper, Button, Icon, IconButton, Tooltip, Zoom, } from '@material-ui/core';
import SortFilterMenu from './SortFilterMenu';

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
 
const ButtonsRowList = ({ creatable, searchable, filterable, sortable, onClickCreate, onClickSearch, onClickFilter, onClickSort, onResetExpansionPanel, }) => (
  <Paper className="w-full flex">
    { // searchable &&
    <Tooltip TransitionComponent={Zoom} placement="bottom" title="Search">
      <span className="ml-6 mr-3">
        <IconButton color="inherit" aria-label="Search"
          onClick={onClickSearch}
        >
          <Icon>search</Icon>
        </IconButton>
      </span>
    </Tooltip>
    }
    { // filterable &&
    // <Tooltip TransitionComponent={Zoom} placement="bottom" title="Filter">
    //   <span className="mx-3">
    //     <IconButton color="inherit" aria-label="Filter"
    //       onClick={onClickFilter}
    //     >
    //       <Icon>filter_list</Icon>
    //     </IconButton>
    //   </span>
    // </Tooltip>
    }
    <span className="mx-3">
      <SortFilterMenu variant="filter" />
    </span>
    <span className="mx-3">
      <SortFilterMenu variant="sort"   />
    </span>
    { // sortable &&
    // <Tooltip TransitionComponent={Zoom} placement="bottom" title="Sort">
    //   <span className="mx-3">
    //     <IconButton color="inherit" aria-label="Sort"
    //       onClick={onClickSort}
    //     >
    //       <Icon>sort</Icon>
    //     </IconButton>
    //   </span>
    // </Tooltip>
    }
    {
    <Tooltip TransitionComponent={Zoom} placement="bottom" title="Clear and reset">
      <span className="ml-3 mr-6">
        <IconButton color="inherit" aria-label="Clear and reset"
          onClick={onResetExpansionPanel}
        >
          <Icon>clear</Icon>
        </IconButton>
      </span>
    </Tooltip>
    }
    { creatable && <div className="flex-1">{CreateButton(onClickCreate)}</div> }
  </Paper>
);

const CreateButton = onClick => (
  <Tooltip TransitionComponent={Zoom} title="Add new item">
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
  </Tooltip>
);

const CRUDButtonsUnstyled = ({ classes, deletable, updatable, onUpdate, onDelete, }) => (
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

CRUDButtonsUnstyled.propTypes = {
  classes: PropTypes.object.isRequired,
  updatable: PropTypes.bool,
  deletable: PropTypes.bool,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  // creatable, searchable, filterable, sortable, onClickCreate, onClickSearch, onClickFilter, onClickSort,
  // limit, selectedIndex, deletable, updatable, onToggle, onNavBack, onNavNext,
};

CRUDButtonsUnstyled.defaultProps = {
  deletable: false,
  updatable: false,
};
 
const CRUDButtons = withStyles(styles, { withTheme: true })(CRUDButtonsUnstyled);                                                       

export { CreateButton, CRUDButtons, ButtonsRowList, ButtonsRowDetail, }