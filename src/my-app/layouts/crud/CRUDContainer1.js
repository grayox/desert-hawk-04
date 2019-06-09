// inspired by:
// https://codesandbox.io/s/lrvwm88pv7
// https://stackoverflow.com/a/55093394/1640892
// https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data

import React, { Component } from 'react';

import { withStyles, Icon, IconButton, Tooltip, Zoom, } from '@material-ui/core';

import { getSearchableFields, getForm, } from 'my-app/config/AppConfig';

import CRUDView from './CRUDView';
import Loading from 'my-app/components/Loading';
import Error500Page from 'my-app/components/Error500Page';

import { loadAsyncData } from 'my-app/containers/LoadAsync';

const styles = theme => ({
  root: {
    height: '100%',
  },
  refresh: {
    margin   : theme.spacing.unit,
    color    : 'white',
    zIndex   : 1201, // tablet: 1201, laptop: 1100, mobile: <= 1100,
    position : 'fixed', // 'absolute',
    top      : 0,
    right    : theme.spacing.unit * 9, // 72,
  },
});

// // https://codesandbox.io/s/lrvwm88pv7
// const loadAsyncData = () => {
//   let timeout;
//   const promise = new Promise((resolve, reject) => {
//     timeout = setTimeout(
//       () =>
//         resolve({
//           example: "value",
//           random: Math.random()
//         }),
//       1000
//     );
//   });
//   promise.cancel = () => clearTimeout(timeout);
//   return promise;
// };

const BATCH_SIZE = 15; // 20

const INITIAL_STATE_ITEMS = {
  items: [],
}

const INITIAL_STATE_LOADING_OPS = {
  isError: false,
  isLoading: true,
  hasMore: true,
  lastShown: false,
}

// const INITIAL_STATE_BUTTONS_TIER_LIST = {
//   searchString              : ''   ,
//   searchBy                  : ''   ,
//   filterBy                  : []   ,
//   sortBy                    : ''   ,
//   sortDirectionIsDescending : true ,
// }

const INITIAL_STATE_BUTTONS_TIER_MENU = {
  searchMenuOptions : [] ,
  filterMenuOptions : [] ,
  sortMenuOptions   : [] ,
}

const INITIAL_STATE = {
  ...INITIAL_STATE_ITEMS,
  ...INITIAL_STATE_LOADING_OPS,
  // ...INITIAL_STATE_BUTTONS_TIER_LIST,
  ...INITIAL_STATE_BUTTONS_TIER_MENU,
};

class CRUDContainer extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.handleLoad();
    this.getButtonsTierMenuOptions(); // For fastest page load speed, defer this task until buttons are clicked
  }

  componentWillUnmount() {
    this.handleCancel();
  }

  handleLoad = () => {
    this.setState(INITIAL_STATE, () => {
      this.handleFetchMoreData();
    });
  }

  // begin buttons tier list

  handleSearchFilterSort = model => {
    // const { searchString, searchBy, filterBy, sortBy, sortDirectionIsDescending, } = model; // searchStringDialogIsOpen,
    console.log('model\n', model,);
  }

  getSearchMenuOptions = () => {
    const HEADER = 'Search in';
    const { readable, searchable,  } = this.props;
    // console.log('readable\n', readable,);
    // console.log('searchable\n', searchable,);
    const ready1 = readable && searchable;
    if(!ready1) return;
    const searchableFieldIds = getSearchableFields(searchable, readable,);
    // console.log('searchableFieldIds\n', searchableFieldIds,);
    const form = getForm(searchableFieldIds);
    const searchableFieldLabels = form.map(({ label, }) => label);
    const searchMenuOptions = [ HEADER, ...searchableFieldLabels, ];
    this.setState({ searchMenuOptions, });
  }
  
  getFilterMenuOptions = () => {
    const filterMenuOptions = [
      'Filter by', 'All', 'Starred', 'Unstarred', 'Challenged', 'Pending', 'Resolved', 'Won', 'Lost', // [ 'foo' , 'bar'   , 'baz'  , ] ,
    ];
    this.setState({ filterMenuOptions, });
  }
  
  getSortMenuOptions = () => {
    const sortMenuOptions = [ 'Sort by', 'Date', 'Price', 'Margin', ];
    this.setState({ sortMenuOptions, });
  }

  // For fastest page load speed, defer these tasks until buttons are clicked
  getButtonsTierMenuOptions = () => {
    this.getSearchMenuOptions();
    this.getFilterMenuOptions();
    this.getSortMenuOptions();
  }
  
  // end buttons tier list

  // refs: https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data
  // https://stackoverflow.com/a/55093394/1640892 | https://codesandbox.io/s/lrvwm88pv7
  // handleFetchMoreData() {
  //   this._asyncRequest = loadAsyncData().then(
  //     externalData => {
  //       this._asyncRequest = null;
  //       this.setState({externalData});
  //     }
  //   );
  // }
  handleFetchMoreData = async () => {
    // console.log('props\n', this.props);
    const { readable, } = this.props;
    const { items, } = this.state;
    
    const ready1 = readable && readable.path;
    if( !ready1 ) return;
    const ready2 = this && this.state && this.state.hasMore;
    if( !ready2 ) return;
    
    const { path, } = readable;

    // this._asyncRequest = loadAsyncData();
    // ref: https://firebase.google.com/docs/firestore/query-data/query-cursors#paginate_a_query
    this._asyncRequest = loadAsyncData(
      path, BATCH_SIZE, this.state.lastShown,
      // searchString, searchBy, filterBy, sortBy, sortDirection,
    );
    // const items = await this._asyncRequest;
    const newData = await this._asyncRequest; // { data:<arrayOfObjects>, lastShown:<documentSnapshot>, }
    const { lastShown, } = newData;
    const newItems = newData.data;
    const hasMore = newItems.length === BATCH_SIZE;
    this._asyncRequest = null;
    this.setState({
      hasMore,
      isLoading: false,
      items: [ ...items, ...newItems, ],
      lastShown,
    }
    // , () => { console.log('state\n', this.state); }
    );
  }

  // xhandleFetchMoreData = () => {
  //   if (this.state.items.length >= 500) {
  //     this.setState({ hasMore: false });
  //     return;
  //   }
  //   this.setState({
  //     items: this.state.items.concat(Array.from({ length: 20 }))
  //   });
  // }

  // handleCancel() {
  //   if (this._asyncRequest) {
  //     this._asyncRequest.cancel();
  //   }
  // }
  handleCancel = () => {
    this.setState(INITIAL_STATE
      , () => {
        if (this._asyncRequest) {
          // this._asyncRequest.cancel();
          this._asyncRequest = null;
        }
      }
    );
  };

  // render() {
  //   return (
  //     <div className="App">
  //       {(isLoading && <button onClick={this.handleCancel}>Cancel</button>) || (
  //         <button onClick={this.handleFetchMoreData}>Load</button>
  //       )}
  //       <div>
  //         <h3>{(isLoading && "Loading...") || "Not loading"}</h3>
  //       </div>
  //       <pre>
  //         <code>{JSON.stringify(this.state)}</code>
  //       </pre>
  //     </div>
  //   );
  // }

  render() {
    const { handleLoad, handleFetchMoreData, handleSearchFilterSort, } = this;
    const {
      isLoading, isError, items, hasMore, searchMenuOptions, filterMenuOptions, sortMenuOptions,
    } = this.state;
    const {
      classes, condensed, searchable, sortable, filterable, starrable,
      miniDashboard, actionable, creatable, readable, updatable, deletable,
    } = this.props;
    
    const getCRUDView = () =>
      <CRUDView
        items={items} condensed={condensed} miniDashboard={miniDashboard} hasMore={hasMore}
        searchable={searchable} sortable={sortable} filterable={filterable} starrable={starrable} actionable={actionable}
        creatable={creatable} readable={readable} updatable={updatable} deletable={deletable}
        searchMenuOptions={searchMenuOptions} filterMenuOptions={filterMenuOptions} sortMenuOptions={sortMenuOptions}
        onRefresh={handleLoad} onNext={handleFetchMoreData} onSearchFilterSort={handleSearchFilterSort}
      />

    const getRefreshButton = () =>
      <Tooltip TransitionComponent={Zoom} title="Refresh data">
        <IconButton className={classes.refresh} onClick={handleFetchMoreData} color="inherit">
          <Icon>refresh</Icon>
        </IconButton>
      </Tooltip>
      
    const getMainContent = () => ( items && <React.Fragment> {getRefreshButton()} {getCRUDView()} </React.Fragment> )
    const getIsError = () => <div className="h-full"><Error500Page /></div>
    const getHasLoaded = () => ( isError ? getIsError() : getMainContent() )
    const getIsLoading = () => <div className="h-full"><Loading /></div>
    const getCRUDContainer = () => ( isLoading ? getIsLoading() : getHasLoaded() )

    return getCRUDContainer();
  }
}

// export default CRUDContainer;
export default withStyles(styles, {withTheme: true})(CRUDContainer);