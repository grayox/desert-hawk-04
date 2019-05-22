import React, { Component, } from 'react';
import {
  Paper, Tooltip, Zoom,
  Fab, Icon, IconButton, TextField,
} from '@material-ui/core'; // withStyles, Button,

import SortFilterMenu from './SortFilterMenu';

const ButtonsRowList = ({ creatable, searchable, filterable, sortable, onClickCreate, onClickSearch, onClickFilter, onClickSort, onResetExpansionPanel, }) => (
  <Paper className="w-full flex">
    { creatable && CreateButton(onClickCreate)}
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
    <TextField />
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
    <div className="flex-1">
      {/* <img src={`https://img.shields.io/badge/sort-${}-informational.svg`} /> */}
      <img src="https://img.shields.io/badge/sort-starred-informational.svg" />
    </div>
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
  </Paper>
);

const CreateButton = onClick => (
  <Tooltip TransitionComponent={Zoom} title="Add new item">
    <Fab
      // <Button
      // className="w-full"
      // // className={classNames(classes.margin, "w-full",)}
      // variant="contained"
      color="primary"
      onClick={onClick}
      size="small"
    >
      <Icon>add</Icon>
    </Fab>
  </Tooltip>
);

export default ButtonsRowList;