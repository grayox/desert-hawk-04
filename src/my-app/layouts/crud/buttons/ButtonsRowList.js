import React, { Component, } from 'react';
import {
  Paper, Tooltip, Zoom,
  Fab, Icon, IconButton, TextField,
} from '@material-ui/core'; // withStyles, Button,

import SortFilterMenu from './SortFilterMenu';

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

const INITIAL_STATE = {
  searchFieldIsOpen     : false     ,
  filterBy              : undefined ,
  sortBy                : undefined ,
  sortOrderIsDescending : true      ,
}

class ButtonsRowList extends Component {
// const ButtonsRowList = ({ creatable, searchable, filterable, sortable, onClickCreate, onClickSearch, onClickFilter, onClickSort, onResetExpansionPanel, }) => (
  state = INITIAL_STATE;

  handleToggleSearchField = () => {
    this.setState({searchFieldIsOpen: !this.state.searchFieldIsOpen});
  }
  
  handleToggleSortOrder = () => {
    this.setState({sortOrderIsDescending: !this.state.sortOrderIsDescending});
  }

  render() {
    const {
      creatable, searchable, filterable, sortable,
      onClickCreate, onClickFilter, onClickSort, onResetExpansionPanel, // onClickSearch,
    } = this.props;
    const { searchFieldIsOpen, filterBy, sortBy, sortOrderIsDescending, } = this.state;
    const { handleToggleSearchField, handleToggleSortOrder, } = this;

    return (
      <Paper className="w-full">
        <div className="w-full flex">
          { creatable && CreateButton(onClickCreate)}
          { // searchable &&
          <Tooltip TransitionComponent={Zoom} placement="bottom" title="Search">
            <span className="ml-6 mr-3">
              <IconButton color="inherit" aria-label="Search"
                onClick={handleToggleSearchField} // {onClickSearch}
              >
                <Icon>search</Icon>
              </IconButton>
            </span>
          </Tooltip>
          }
          { searchFieldIsOpen &&
            <span className="w-full flex-1">
              <TextField />
            </span>
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
          <span className="mx-3">
            <IconButton onClick={handleToggleSortOrder}>
              <Icon>{sortOrderIsDescending ? 'arrow_upward' : 'arrow_downward'}</Icon>
            </IconButton>
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
          { !searchFieldIsOpen && <span className="flex-1 border border-black" /> }
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
        </div>
        <div className="w-full">
          {/* <img src={`https://img.shields.io/badge/sort-${}-informational.svg`} /> */}
          <span className="mx-3"><img src="https://img.shields.io/badge/sort-starred-informational.svg" /></span>
          <span className="mx-3"><img src="https://img.shields.io/badge/sort-field1-informational.svg"  /></span>
          <span className="mx-3"><img src="https://img.shields.io/badge/sort-field2-informational.svg"  /></span>
        </div>
      </Paper>
    );
  }
}

export default ButtonsRowList;