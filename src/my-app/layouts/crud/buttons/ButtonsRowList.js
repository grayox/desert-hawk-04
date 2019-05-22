import React, { Component, } from 'react';
import {
  Paper, Tooltip, Zoom, InputAdornment,
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
  // searchFieldIsOpen     : false     ,
  searchString          : ''        ,
  filterBy              : undefined ,
  sortBy                : undefined ,
  sortOrderIsDescending : true      ,
}

class ButtonsRowList extends Component {
// const ButtonsRowList = ({ creatable, searchable, filterable, sortable, onClickCreate, onClickSearch, onClickFilter, onClickSort, onResetExpansionPanel, }) => (
  state = INITIAL_STATE;

  // handleToggleSearchField = () => {
  //   this.setState({searchFieldIsOpen: !this.state.searchFieldIsOpen});
  // }

  handleClickSearch = () => {
    const { searchField, } = this.state;
    console.log('searchField\n', searchField,);
  }
  
  handleToggleSortOrder = () => {
    this.setState({sortOrderIsDescending: !this.state.sortOrderIsDescending});
  }

  handleChangeSearchString = event => {
    const searchString = event && event.target && event.target.value;
    this.setState({ searchString, });
  }

  handleResetSearchField = () => {
    this.setState({ searchString: '', });
  }

  handleResetRow = () => {
    this.setState(INITIAL_STATE);
  }

  render() {
    const {
      creatable, searchable, filterable, sortable,
      onClickCreate, onClickFilter, onClickSort, onResetExpansionPanel, // onClickSearch,
    } = this.props;
    const { searchString, filterBy, sortBy, sortOrderIsDescending, } = this.state; // searchFieldIsOpen, 
    const {
      handleChangeSearchString, handleToggleSortOrder,
      handleResetRow, handleResetSearchField, handleClickSearch,
    } = this; // handleToggleSearchField, 

    return (
      <Paper className="w-full">
        <div className="w-full flex">
          { creatable &&
            <span className="ml-4 mt-4">{CreateButton(onClickCreate)}</span>
          }
          { // searchable &&
          <Tooltip TransitionComponent={Zoom} placement="bottom" title="Search">
            <span className="ml-6">
              <IconButton color="inherit" aria-label="Search"
                onClick={handleClickSearch} // onClickSearch handleToggleSearchField
              >
                <Icon>search</Icon>
              </IconButton>
            </span>
          </Tooltip>
          }
          { // searchFieldIsOpen &&
            <span className="w-full flex-1">
              <TextField
                // // id="standard-name"
                // // label="Search"
                // // className={classes.textField}
                // // margin="normal"
                // placeholder="Search"
                value={searchString}
                onChange={handleChangeSearchString}
                // InputProps={{
                  // startAdornment: (
                  //   <InputAdornment position="start">
                  //     <Icon>search</Icon>
                  //   </InputAdornment>
                  // ),
                  // endAdornment: (
                  //   <InputAdornment position="end">
                  // //    <Icon className="mr-32">search</Icon>
                  //     <IconButton title="Clear" onClick={handleResetSearchField}>
                  //       <Icon>clear</Icon>
                  //     </IconButton>
                  //   </InputAdornment>
                  // ),
                // }} 
              />
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
          <span className="ml-4" title="Filter">
            <SortFilterMenu variant="filter" />
          </span>
          <span className="ml-4" title="Sort">
            <SortFilterMenu variant="sort"   />
          </span>
          <span className="ml-4" title={`Sort ${sortOrderIsDescending ? 'descending' : 'ascending'}`}>
            <IconButton
              onClick={handleToggleSortOrder}
            >
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
          {
            // !searchFieldIsOpen && <span className="flex-1"/>
          }
          {
          <Tooltip TransitionComponent={Zoom} placement="bottom" title="Clear and reset">
            <span className="mx-4">
              <IconButton color="inherit" aria-label="Clear and reset"
                // onClick={onResetExpansionPanel}
                onClick={handleResetRow}
              >
                <Icon>clear</Icon>
              </IconButton>
            </span>
          </Tooltip>
          }
        </div>
        <div className="w-full">
          {/* <img src={`https://img.shields.io/badge/sort-${}-informational.svg`} /> */}
          <span className="ml-4"><img alt='label-message' src="https://img.shields.io/badge/sort-starred-informational.svg" /></span>
          <span className="ml-4"><img alt='label-message' src="https://img.shields.io/badge/sort-field1-informational.svg"  /></span>
          <span className="ml-4"><img alt='label-message' src="https://img.shields.io/badge/sort-field2-informational.svg"  /></span>
        </div>
      </Paper>
    );
  }
}

export default ButtonsRowList;