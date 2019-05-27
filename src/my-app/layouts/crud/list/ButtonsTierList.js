import React from 'react';
import {
  Paper, Tooltip, Zoom, Chip, Button, Fab, Icon, IconButton, TextField,
} from '@material-ui/core'; // withStyles,

import hash from 'object-hash'; // https://www.npmjs.com/package/object-hash
import SortFilterMenu from './SortFilterMenu';
// import ShieldsIo from 'my-app/components/ShieldsIo';

// const configShields = [
//   { key: 0 , icon: 'filter_list' , label : 'filter' , message : 'starred' , color : 'informational' , } ,
//   { key: 1 , icon: 'sort'        , label : 'sort'   , message : 'age'     , color : 'blueviolet'    , } ,
//   { key: 2 , icon: 'star'        , label : 'rating' , message : '3/5'     , color : 'brightgreen'   , } ,
// ]

const ButtonsTierList = ({
  // props
  creatable, searchable, filterable, sortable,
  // state
  filterOptions, sortOptions, searchString, filterBy, sortBy, sortOrderIsDescending,
  // events
  onClickCreateButton, onChangeSearchString, onClickSearchButton, // onClickFilterButton, onClickSortButton, 
  onMenuItemClick, onToggleSortOrder, onDeleteShield, onResetButtonsTierList,
}) => {
  
  const handleDeleteShield = (item, index,) => {
    // console.log('item\n', item,);
    // console.log('index\n', index,);
    onDeleteShield(item, index,);
  }

  const sfs = ( searchable || filterable || sortable );
  const csfs = creatable || sfs;
  const createButtonType = sfs ? 'fab' : 'full';

  // const getChips = () => configShields;
  const getChips = () => {
    let out = [];
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

  const getCreateButton = () => {
    const getCreateButtonConfig = {
      fab: (
        <Fab
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
    return getCreateButtonConfig[createButtonType];
  }
  
  const CreateButton = () => <Tooltip TransitionComponent={Zoom} title="Add new item">{getCreateButton()}</Tooltip>

  const getClearButton = () => (
    ( createButtonType === 'fab' ) &&
    <Tooltip TransitionComponent={Zoom} placement="bottom" title="Clear and reset">
      <span className="mx-4">
        <IconButton color="inherit" aria-label="Clear and reset" onClick={onResetButtonsTierList}>
          <Icon>clear</Icon>
        </IconButton>
      </span>
    </Tooltip>
  )

  const getTopTier = () =>
    <div className="w-full flex mt-4">
      { creatable && <span className="ml-4"><CreateButton/></span> }

      { searchable &&
        <span className="w-full flex-1 ml-12" title="Search">
          <TextField
            // // id="standard-name"
            // // label="Search"
            // // className={classes.textField}
            // // margin="normal"
            // placeholder="Search"
            value={searchString}
            onChange={onChangeSearchString}
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
      { searchable &&
        <Tooltip TransitionComponent={Zoom} placement="bottom" title="Search">
          <span>
            <IconButton color="inherit" aria-label="Search"
              onClick={onClickSearchButton}
            >
              <Icon>search</Icon>
            </IconButton>
          </span>
        </Tooltip>
      }
      {
      // filterable &&
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
      { filterable &&
        <span className="ml-0" title="Filter">
          <SortFilterMenu variant="filter" filterOptions={filterOptions} onMenuItemClick={onMenuItemClick} />
        </span>
      }
      { sortable &&
        <span className="ml-0" title="Sort">
          <SortFilterMenu variant="sort" sortOptions={sortOptions} onMenuItemClick={onMenuItemClick} />
        </span>
      }
      { sortable &&
        <span className="ml-0" title={`Sort ${sortOrderIsDescending ? 'descending' : 'ascending'}`}>
          <IconButton
            onClick={onToggleSortOrder}
          >
            <Icon>{sortOrderIsDescending ? 'arrow_upward' : 'arrow_downward'}</Icon>
          </IconButton>
        </span>
      }
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
      {getClearButton()}
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
                <Icon>{sortOrderIsDescending ? 'arrow_upward' : 'arrow_downward'}</Icon>
                :
                undefined
              }
            />
          </span>
        ))
      }
    </div>

  return ( csfs ? <Paper className="w-full p-4">{getTopTier()}{getBottomTier()}</Paper> : null );

}

export default ButtonsTierList;