import React, { Component, } from 'react';
import { Paper, Button, Icon, IconButton, Tooltip, Zoom, } from '@material-ui/core'; // withStyles,

import SortFilterMenu from './SortFilterMenu';

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

export default ButtonsRowList;