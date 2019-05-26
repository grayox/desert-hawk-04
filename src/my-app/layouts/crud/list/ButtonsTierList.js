import React from 'react';
import {
  Paper, Tooltip, Zoom, Chip, Button, Fab, Icon, IconButton, TextField,
} from '@material-ui/core'; // withStyles,

import hash from 'object-hash'; // https://www.npmjs.com/package/object-hash
import SortFilterMenu from './SortFilterMenu';
// import ShieldsIo from 'my-app/components/ShieldsIo';

const configShields = [
  { icon: 'filter_list' , label : 'filter' , message : 'starred' , color : 'informational' , } ,
  { icon: 'sort'        , label : 'sort'   , message : 'age'     , color : 'blueviolet'    , } ,
  { icon: 'star'        , label : 'rating' , message : '3/5'     , color : 'brightgreen'   , } ,
]

const ButtonsTierList = ({
  creatable, searchable, filterable, sortable, // props
  searchString, filterBy, sortBy, sortOrderIsDescending, // state
  // events
  onClickCreateButton, onChangeSearchString, onClickSearchButton, onClickFilterButton,
  onClickSortButton, onToggleSortOrder, onResetButtonsTierList,
}) => {

  const type = ( searchable || filterable || sortable ) ? 'fab' : 'full';

  const getCreateButton = () => {
    switch(type) {
      case 'fab':
        return (
          <Fab
            color="primary"
            onClick={onClickCreateButton}
            size="small"
          >
            <Icon>add</Icon>
          </Fab>
        );
      case 'full':
        return (
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
        );
      default:
        throw new Error('Create button must have type of either "fab" or "full"');
        return null;
    }
  }
  
  const CreateButton = () => <Tooltip TransitionComponent={Zoom} title="Add new item">{getCreateButton()}</Tooltip>

  const handleDelete = () => console.log('hallo');

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
          <SortFilterMenu variant="filter" />
        </span>
        <span className="ml-4" title="Sort">
          <SortFilterMenu variant="sort"   />
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
            <span key={hash([item, index,])} className="ml-4">
              {/* <ShieldsIo label={item.label} message={item.message} color={item.color}/> */}
              <Chip
                icon={<Icon>{item.icon}</Icon>}
                label={item.message}
                // onClick={handleClick}
                onDelete={handleDelete}
                className="ml-4 my-4"
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