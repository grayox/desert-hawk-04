import React from 'react';
import classNames from 'classnames';
import { FuseAnimateGroup } from '@fuse'; // FuseScrollbars, FuseAnimate,

import { withStyles, Zoom, Paper, Tooltip, Divider, List, CircularProgress, } from '@material-ui/core';

import hash from 'object-hash'; // https://www.npmjs.com/package/object-hash
import ButtonsTierList from './ButtonsTierList'; // CRUDButtons,
import InfiniteScroll from 'react-infinite-scroll-component';
import ItemSummary from '../ItemSummary';

const styles = theme => ({
  paper: {
    // temp-border
    // border: 'solid blue 4px',
    color: theme.palette.text.secondary,
  },
});

const ListPane = ({
  classes, items, hasMore, creatable, searchable, filterable, sortable, starrable, selectedIndex,
  searchString, filterBy, sortBy, sortOrderIsDescending, onClickStar, onNext, onToggle,
  onClickCreateButton, onChangeSearchString, onClickSearchButton, onClickFilterButton,
  onClickSortButton, onToggleSortOrder, onResetButtonsTierList,
}) => {

  const ready1 = items && items.length;
  if(!ready1) return null;

  const getHeader = () =>
    <div className="w-full">
      <Zoom in mountOnEnter unmountOnExit>
        <ButtonsTierList
          creatable={creatable}
          searchable={searchable}
          filterable={filterable}
          sortable={sortable}

          searchString={searchString}
          filterBy={filterBy}
          sortBy={sortBy}
          sortOrderIsDescending={sortOrderIsDescending}

          onClickCreateButton={onClickCreateButton}
          onChangeSearchString={onChangeSearchString}
          onClickSearchButton={onClickSearchButton}
          onClickFilterButton={onClickFilterButton}
          onClickSortButton={onClickSortButton}
          onToggleSortOrder={onToggleSortOrder}
          onResetButtonsTierList={onResetButtonsTierList}
        />
      </Zoom>
    </div>

  const getList = () =>
    <InfiniteScroll
      dataLength={items && items.length}
      next={onNext} // event
      hasMore={hasMore} // boolean
      loader={
        // {<h4>Loading...</h4>}
        <div className='ml-24 mt-12'>
          <CircularProgress className={classes.progress} color="secondary" />
        </div>
      }
      height={ window.innerHeight - 128 - 56 } // -28 // {800} {400}
      endMessage={
        <div className="text-center p-16">
          End of list
        </div>
      }
    >
      <FuseAnimateGroup
        delay={500}
        enter={{ animation: "transition.slideUpBigIn" }}
        leave={{ animation: "transition.slideLeftOut" }}
      >
        {
          items && items.map( ( item, index, ) =>
            <Tooltip
              key={hash([item, (item && item.createdAt),])}
              TransitionComponent={Zoom} placement="top" title="Click for detail"
            >
              <div
                // className="border-b" // use divider instead
              >
                {/* { getSummary( item, true, index, ) } */}
                <ItemSummary
                  side="list"
                  item={item}
                  index={index}
                  onToggle={onToggle}
                  selectedIndex={selectedIndex}
                  starrable={starrable}
                  onClickStar={onClickStar}
                  // actionable={actionable} // not needed on list side
                />
                <Divider />
              </div>
            </Tooltip>
          )
        }
      </FuseAnimateGroup>
    </InfiniteScroll>

  return (
    <React.Fragment>
      {getHeader()}    
      <Paper className={classNames(classes.paper, "z-10",)}>
        <List className="m-0 p-0" component="nav">
          {/* <ListSubheader className="text-left">Items</ListSubheader> */}
          {getList()}
        </List>
      </Paper>
    </React.Fragment>
  );
}


// export default ListPane;
export default withStyles(styles)(ListPane);