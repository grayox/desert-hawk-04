import React from 'react';
import {
  Paper, Tooltip, Zoom, Chip, Button, Fab, Icon, IconButton, TextField,
} from '@material-ui/core'; // withStyles,

// import hash from 'object-hash'; // https://www.npmjs.com/package/object-hash
import SortFilterMenu from './SortFilterMenu';
// import ShieldsIo from 'my-app/components/ShieldsIo';

const configShields = [
  { key: 0 , icon: 'filter_list' , label : 'filter' , message : 'starred' , color : 'informational' , } ,
  { key: 1 , icon: 'sort'        , label : 'sort'   , message : 'age'     , color : 'blueviolet'    , } ,
  { key: 2 , icon: 'star'        , label : 'rating' , message : '3/5'     , color : 'brightgreen'   , } ,
]

const ButtonsTierList = ({
  // props
  creatable, searchable, filterable, sortable,
  // state
  filterOptions, sortOptions, searchString, filterBy, sortBy, sortOrderIsDescending,
  // events
  onClickCreateButton, onChangeSearchString, onClickSearchButton, onClickFilterButton,
  onClickSortButton, onToggleSortOrder, onDeleteShield, onResetButtonsTierList,
}) => {

  const type = ( searchable || filterable || sortable ) ? 'fab' : 'full';

  const handleDeleteShield = (item, index,) => {
    // console.log('item\n', item,);
    // console.log('index\n', index,);
    onDeleteShield(item, index,);
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
    return getCreateButtonConfig[type];
  }
  
  const CreateButton = () => <Tooltip TransitionComponent={Zoom} title="Add new item">{getCreateButton()}</Tooltip>

  return (
    <Paper className="w-full">
      <div className="w-full flex">
        { creatable && <span className="ml-4 mt-4"><CreateButton/></span> }
        { // searchable &&
        <Tooltip TransitionComponent={Zoom} placement="bottom" title="Search">
          <span className="ml-6">
            <IconButton color="inherit" aria-label="Search"
              onClick={onClickSearchButton}
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
          <SortFilterMenu variant="filter" filterOptions={filterOptions} />
        </span>
        <span className="ml-4" title="Sort">
          <SortFilterMenu variant="sort" sortOptions={sortOptions} />
        </span>
        <span className="ml-4" title={`Sort ${sortOrderIsDescending ? 'descending' : 'ascending'}`}>
          <IconButton
            onClick={onToggleSortOrder}
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
            <IconButton color="inherit" aria-label="Clear and reset" onClick={onResetButtonsTierList}>
              <Icon>clear</Icon>
            </IconButton>
          </span>
        </Tooltip>
        }
      </div>
      <div className="w-full">
        {
          configShields.map( (item, index,) => (
            <span key={item.key} className="ml-4">
              {/* <ShieldsIo label={item.label} message={item.message} color={item.color}/> */}
              <Chip
                className="ml-4 my-4"
                icon={<Icon>{item.icon}</Icon>}
                label={item.message}
                onDelete={() => handleDeleteShield(item, index,)}
                // onClick={handleClick}
                // color="secondary"
                // deleteIcon={<Icon>done</Icon>}
              />
            </span>
          ))
        }
      </div>
    </Paper>
  );

}

export default ButtonsTierList;