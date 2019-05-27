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
  const creatableOnly = creatable && (!sfs);
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

  const getCreateButton = () => getCreateButtonConfig[createButtonType];
  const CreateButton = () => <Tooltip TransitionComponent={Zoom} title="Add new item">{getCreateButton()}</Tooltip>
  const getCreateButtonMeta = () => (creatable && <span className="ml-4"><CreateButton/></span>)

  const getClearButton = () => (
    ( createButtonType === 'fab' ) &&
    <Tooltip TransitionComponent={Zoom} placement="bottom" title="Clear and reset">
      <span className="mx-4">
        <IconButton aria-label="Clear and reset" onClick={onResetButtonsTierList}
          // color="inherit" // makes it darker shade of black
        >
          <Icon>clear</Icon>
        </IconButton>
      </span>
    </Tooltip>
  )

  const getSortOrderButton = () => (
    sortable &&
    <Tooltip TransitionComponent={Zoom} placement="bottom" title={`Sort ${sortOrderIsDescending ? 'descending' : 'ascending'}`}>
      <span className="ml-0">
        <IconButton
          onClick={onToggleSortOrder}
        >
          <Icon>{sortOrderIsDescending ? 'arrow_upward' : 'arrow_downward'}</Icon>
        </IconButton>
      </span>
    </Tooltip>
  )

  const getSortMenu = () => (
    sortable &&
    <span className="ml-0" title="Sort">
      <SortFilterMenu variant="sort" sortOptions={sortOptions} onMenuItemClick={onMenuItemClick} />
    </span>
  )

  const getFilterMenu = () => (
    filterable &&
    <span className="ml-0" title="Filter">
      <SortFilterMenu variant="filter" filterOptions={filterOptions} onMenuItemClick={onMenuItemClick} />
    </span>
  )

  const getSearchButton = () => (
    searchable &&
    <Tooltip TransitionComponent={Zoom} placement="bottom" title="Search">
      <span>
        <IconButton aria-label="Search" // color="inherit" // makes it darker shade of black
          onClick={onClickSearchButton}
        >
          <Icon>search</Icon>
        </IconButton>
      </span>
    </Tooltip>
  )

  const getSearchField = () => (
    searchable &&
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
  )

  const getTopTier = () =>
    <div className="w-full flex mt-4">
      {getCreateButtonMeta()} {getSearchField()} {getSearchButton()}
      {getFilterMenu()} {getSortMenu()} {getSortOrderButton()} {getClearButton()}
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

  const getCreatableOnlyTier = () => <CreateButton />
  const getStandardTier = () => (csfs ? <Paper className="w-full p-4">{getTopTier()}{getBottomTier()}</Paper> : null)
  const getButtonsTierList = () => ( creatableOnly ? getCreatableOnlyTier() : getStandardTier() )

  return getButtonsTierList();
}

export default ButtonsTierList;