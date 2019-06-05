import React, { Component, } from 'react';
import {
  Paper, Tooltip, Zoom, Chip, Button, Fab, Icon, IconButton, TextField,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  InputAdornment, // CssBaseline, Typography, // withStyles,
} from '@material-ui/core';

import { handleKeyPress, } from 'my-app/config/AppConfig';

import _ from '@lodash';
import hash from 'object-hash'; // https://www.npmjs.com/package/object-hash
import SortFilterMenu from './SortFilterMenu';
// import ShieldsIo from 'my-app/components/ShieldsIo';

// const configShields = [
//   { key: 0 , icon: 'filter_list' , label : 'filter' , message : 'starred' , color : 'informational' , } ,
//   { key: 1 , icon: 'sort'        , label : 'sort'   , message : 'age'     , color : 'blueviolet'    , } ,
//   { key: 2 , icon: 'star'        , label : 'rating' , message : '3/5'     , color : 'brightgreen'   , } ,
// ]

const INITIAL_STATE = {
  searchString              : ''    ,
  searchBy                  : ''    ,
  filterBy                  : []    ,
  sortBy                    : ''    ,
  sortDirectionIsDescending : true  ,
  searchStringDialogIsOpen  : false ,
}

class ButtonsTierList extends Component {

  state = INITIAL_STATE;

  handleOpenSearchStringDialog  = () => {
    this.setState({
      searchStringDialogIsOpen: true,
    });
  }
  
  handleCloseSearchStringDialog = () => {
    this.setState({
      searchStringDialogIsOpen: false,
      searchString: '',
    });
  }
  
  handleCancelSearchStringDialog = () => {
    this.handleCloseSearchStringDialog();
  }

  handleSubmitSearchStringDialog = () => {
    // send data to CRUDContainer
    this.handleCloseSearchStringDialog();
  }

  handleSearchMenuItemClick = event => {
    this.handleOpenSearchStringDialog();
    this.handleMenuItemClick(event);
  }

  handleResetButtons = () => this.setState({ ...INITIAL_STATE, });

  // begin refactor from CRUDContainer

  handleChangeSearchString = ({ target, }) => {
    const searchString = target && target.value;
    // console.log('searchString\n', searchString,);
    this.setState({ searchString, }
      // , () => this.handleFilterSearchItems()
    );
  }

  handleClickSearchButton = () => {
    // console.log('state\n', this.state,);
    const { searchString, } = this.state;
    const { searchMenuOptions, } = this.props;
    // const ready = searchMenuOptions.length;
    // if(!ready) return;
    const set = searchString.length;
    const messageNormal = `Your search string is:\n${searchString}\nNow I must fetch the data from:\n${searchMenuOptions}`
    const messageEmpty = 'Please enter a search string' // ❕
    const message = set ? messageNormal : messageEmpty;
    alert(message);
  }

  // handleClickFilterButton = () => {
  //   alert('You clicked the FILTER button');
  //   console.log('You clicked the FILTER button');
  // }

  // handleClickSortButton = () => {
  //   alert('You clicked the SORT button');
  //   console.log('You clicked the SORT button');
  // }

  handleMenuItemClick = ({ variant, selectedIndex, selectedString, }) => {
    switch(variant) {
      case 'filter':
        // fetch existing array
        let filterArray = [ ...this.state.filterBy, ];
        // push, but only if not duplicated
        if(filterArray.indexOf(selectedString) < 0) filterArray.push(selectedString);
        this.setState({ filterBy: filterArray, }
          // , () => // apply where filters, then re-fetch data
        );
        break;
      case 'sort':
        this.setState({ sortBy: selectedString, });
        break;
      case 'search':
        this.setState({
          searchBy: selectedString,
          // showSearchStringInput: true,
        });
        break;
      default:
        // code block
    }
  }
  
  handleToggleSortDirection = () => {
    this.setState({sortDirectionIsDescending: !this.state.sortDirectionIsDescending});
  }
  
  handleDeleteShield = ( item, selectedIndex, ) => {
    // get id of clicked shield
    // console.log('item\n', item,);
    // console.log('selectedIndex\n', selectedIndex,);
    const { type, value, } = item;
    switch(type) {
      case 'search':
        this.setState({
          searchBy: '',
          searchString: '',
        });
        break;
      case 'filter':
        // fetch existing array
        let filterArray = [ ...this.state.filterBy, ];
        _.pull( filterArray, value, );
        this.setState({ filterBy: filterArray, }
          // , () => // apply where filters, then re-fetch data
        );
        break;
      case 'sort':
        this.setState({ sortBy: '', });
        break;
      default:
        // code block
    }
  }

  // end refactor from CRUDContainer

  render() {
    const {
      searchStringDialogIsOpen,
      searchString, searchBy, filterBy, sortBy, sortDirectionIsDescending,
    } = this.state;
    const {
      onClickCreateButton,
      searchMenuOptions, filterMenuOptions, sortMenuOptions,
      creatable, searchable, filterable, sortable,
      // onChangeSearchString, onClickSearchButton, // onClickFilterButton, onClickSortButton, 
      // onMenuItemClick, onToggleSortDirection, onDeleteShield, onResetButtonsTierList,
    } = this.props;
    const {
      // refactored from CRUDContainer // list pane
      handleChangeSearchString, handleClickSearchButton, // handleClickFilterButton, handleClickSortButton, 
      handleMenuItemClick, handleToggleSortDirection, handleDeleteShield, handleResetButtonsTierList,
      handleSearchMenuItemClick, handleCloseSearchStringDialog,
      handleCancelSearchStringDialog, handleSubmitSearchStringDialog,
    } = this;

  
    const sfs = ( searchable || filterable || sortable );
    const csfs = creatable || sfs;
    const creatableOnly = creatable && (!sfs);
    const createButtonType = sfs ? 'fab' : 'full';

    // const getChips = () => configShields;
    const getChips = () => {
      let out = [];
      if(searchString) out.push({
        type: 'search',
        icon: 'search',
        value: searchString,
      })
      if(searchBy) out.push({
        type: 'search',
        icon: 'search',
        value: searchBy,
      })
      if(filterBy && filterBy.length) {
        for (const filterString of filterBy) {
          out.push({
            type: 'filter',
            icon: 'filter_list',
            value: filterString,
          });
        }
      }
      if(sortBy) out.push({
        type: 'sort',
        icon: 'sort',
        value: sortBy,
      })
      return out;
    } 

    const getCreateButtonConfig = {
      fab: (
        <Fab
          className="align-middle"
          color="primary"
          onClick={onClickCreateButton}
          size="small"
        >
          <Icon>add</Icon>
        </Fab>
      ),
      full: (
        <Button
          // className={classNames(classes.margin, "w-full",)}
          className="w-full"
          variant="contained"
          color="primary"
          onClick={onClickCreateButton}
          // size="small"
        >
          <Icon>add</Icon>
        </Button>
      ),
    };

    // create button
    const getCreateButton = () => getCreateButtonConfig[createButtonType];
    const CreateButton = () => <Tooltip TransitionComponent={Zoom} title="Add new item">{getCreateButton()}</Tooltip>
    const getCreateButtonMeta = () => (creatable && <span className="ml-8"><CreateButton/></span>)

    const getClearButton = () => (
      ( createButtonType === 'fab' ) &&
      <Tooltip TransitionComponent={Zoom} placement="bottom" title="Clear and reset">
        <span className="ml-8 mr-4">
          <IconButton aria-label="Clear and reset" onClick={handleResetButtonsTierList}
            // color="inherit" // makes it darker shade of black
          >
            <Icon>clear</Icon>
          </IconButton>
        </span>
      </Tooltip>
    )

    const getSortDirectionButton = () => (
      sortable &&
      <Tooltip
        TransitionComponent={Zoom} placement="bottom"
        title={`Sort ${sortDirectionIsDescending ? 'descending' : 'ascending'}`}
      >
        <span className="ml-4">
          <IconButton
            onClick={handleToggleSortDirection}
          >
            <Icon>{sortDirectionIsDescending ? 'arrow_upward' : 'arrow_downward'}</Icon>
          </IconButton>
        </span>
      </Tooltip>
    )

    const getSortMenu = () => (
      sortable &&
      <span className="ml-4" title="Sort">
        <SortFilterMenu variant="sort" sortMenuOptions={sortMenuOptions} onMenuItemClick={handleMenuItemClick} />
      </span>
    )

    const getFilterMenu = () => (
      filterable &&
      <span className="ml-4" title="Filter">
        <SortFilterMenu variant="filter" filterMenuOptions={filterMenuOptions} onMenuItemClick={handleMenuItemClick} />
      </span>
    )

    const getSearchMenu = () => (
      filterable &&
      <span className="ml-4" title="Filter">
        <SortFilterMenu variant="search" searchMenuOptions={searchMenuOptions} onMenuItemClick={handleSearchMenuItemClick} />
      </span>
    )

    // const getSearchButton = () => (
    //   searchable &&
    //   <Tooltip TransitionComponent={Zoom} placement="bottom" title="Search">
    //     <span>
    //       <IconButton aria-label="Search" // color="inherit" // makes it darker shade of black
    //         onClick={onClickSearchButton}
    //       >
    //         <Icon>search</Icon>
    //       </IconButton>
    //     </span>
    //   </Tooltip>
    // )

    const getSpacer = () => <span className="w-full flex-1" />

    const getSearchInput = () => (
      searchable &&
      <TextField
        // id="outlined-search"
        // placeholder="Search"
        label="Search"
        type="search"
        // className={classes.textField}
        margin="normal"
        variant="outlined"
        fullWidth
        value={searchString}
        // onChange={() => onChangeSearchString(this.state.x)}
        onChange={handleChangeSearchString}
        onKeyPress={(e) => handleKeyPress(e, 'Enter', handleClickSearchButton,)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon>search</Icon>
            </InputAdornment>
          ),
          // endAdornment: (
          //   <InputAdornment position="end">
          // //    <Icon className="mr-32">search</Icon>
          //     <IconButton title="Clear" onClick={handleResetSearchString}>
          //       <Icon>clear</Icon>
          //     </IconButton>
          //   </InputAdornment>
          // ),
        }} 
      />
    )
    
    const getSearchStringDialog = () =>
      <Dialog
        open={searchStringDialogIsOpen}
        onClose={handleCloseSearchStringDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter search string</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We will return matches in the field
            {/* <Typography className="mt-8 text-center" variant="subtitle2">{searchBy}</Typography> */}
            <div className="m-24 text-center"><Chip icon={<Icon>search</Icon>} label={searchBy} /></div>
          </DialogContentText>
          {getSearchInput()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSearchStringDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitSearchStringDialog} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>

    const getTopTier = () =>
      <div className="w-full flex my-4 px-12 items-center">
        {getCreateButtonMeta()} {getSpacer()} {getSearchStringDialog()} {getSearchMenu()} {/*getSearchButton()*/}
        {getFilterMenu()} {getSortMenu()} {getSortDirectionButton()} {getClearButton()}
      </div>

    const getBottomTier = () =>
      <div className="w-full">
        {
          getChips().map( (item, index,) => (
            <span
              className="ml-4"
              key={hash(item)} // item.key
            >
              {/* <ShieldsIo label={item.label} message={item.message} color={item.color}/> */}
              <Chip
                className="ml-4 my-4"
                title={`${item.type} by`}
                icon={<Icon>{item.icon}</Icon>}
                label={item.value} // item.message
                onDelete={() => handleDeleteShield(item, index,)}
                // onClick={handleClick}
                // color="secondary"
                deleteIcon={
                  ( item.type === 'sort' )
                  ?
                  <Icon>{sortDirectionIsDescending ? 'arrow_upward' : 'arrow_downward'}</Icon>
                  :
                  undefined
                }
              />
            </span>
          ))
        }
      </div>

    const getTiers = () =>
      <Paper className="w-full p-4 mb-8">
        {getTopTier()}{getBottomTier()}
      </Paper>

    const getCreatableOnlyTier = () => <CreateButton />
    const getStandardTier = () => (csfs ? getTiers() : null)
    const getButtonsTierList = () => ( creatableOnly ? getCreatableOnlyTier() : getStandardTier() )

    return getButtonsTierList();
  }

}

export default ButtonsTierList;