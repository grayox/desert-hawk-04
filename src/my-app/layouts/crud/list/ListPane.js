import React from 'react';
import classNames from 'classnames';
import { FuseAnimateGroup } from '@fuse'; // FuseScrollbars, FuseAnimate,

import { withStyles, Zoom, Paper, Tooltip, Divider, List, CircularProgress, } from '@material-ui/core';

import ListButtonsRow from './ListButtonsRow'; // CRUDButtons,
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
  classes, items, onNext, onToggle, hasMore, creatable, searchable, filterable, sortable,
  handleOpenSearch, handleOpenFilter, handleOpenSort, handleOpenCreateDialog,
}) => (
  <React.Fragment>
    <div className="w-full">
      <Zoom in mountOnEnter unmountOnExit>
        <ListButtonsRow
          creatable={creatable}
          searchable={searchable}
          filterable={filterable}
          sortable={sortable}
          onClickCreate={handleOpenCreateDialog}
          onClickSearch={handleOpenSearch}
          onClickFilter={handleOpenFilter}
          onClickSort={handleOpenSort}
        />
      </Zoom>
    </div>
  
    <Paper className={classNames(classes.paper, "z-10",)}>
      <List className="m-0 p-0" component="nav">
        {
          // subheader={<ListSubheader className="text-left">Items</ListSubheader>}
        }
        <InfiniteScroll
          dataLength={items.length}
          next={onNext} // event
          hasMore={hasMore} // boolean
          loader={
            // {<h4>Loading...</h4>}
            <div className='ml-8'>
              <CircularProgress className={classes.progress} color="secondary" />
            </div>
          }
          height={window.innerHeight - 128 - 28} // {800} {400}
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
                <Tooltip key={item && item.createdAt} TransitionComponent={Zoom} placement="top" title="Click for detail">
                  <div
                    // className="border-b" // use divider instead
                  >
                    {/* { getSummary( item, true, index, ) } */}
                    <ItemSummary item={item} side="list" index={index} onToggle={onToggle} />
                    <Divider />
                  </div>
                </Tooltip>
              )
            }
          </FuseAnimateGroup>
        </InfiniteScroll>
      </List>
    </Paper>
  </React.Fragment>
)

// export default ListPane;
export default withStyles(styles)(ListPane);