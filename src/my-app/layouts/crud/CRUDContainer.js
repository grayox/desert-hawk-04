// inspired by:
// https://codesandbox.io/s/lrvwm88pv7
// https://stackoverflow.com/a/55093394/1640892
// https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data

import React, { Component } from 'react';

import { withStyles, Icon, IconButton, Tooltip, Zoom, } from '@material-ui/core';

import CRUDView from './CRUDView';
import Loading from 'my-app/components/Loading';
import Error500Page from 'my-app/components/Error500Page';

import { loadAsyncData } from 'my-app/containers/LoadAsync';

const styles = theme => ({

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

const BATCH_SIZE = 20;

const INITIAL_STATE = {
  items: [],
  isError: false,
  isLoading: true,

  hasMore: true,
  lastVisible: null,
};

class CRUDContainer extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.handleFetchMoreData();
  }

  componentWillUnmount() {
    this.handleCancel();
  }

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
    const { items, hasMore, } = this.state;
    
    const ready = hasMore;
    if(!ready) return;

    this.setState({
      isLoading: true,
    });
    // this._asyncRequest = loadAsyncData();
    // ref: https://firebase.google.com/docs/firestore/query-data/query-cursors#paginate_a_query
    this._asyncRequest = loadAsyncData( readable, BATCH_SIZE, );
    // const items = await this._asyncRequest;
    const newItems = await this._asyncRequest;
    const keepGoing = newItems.length === BATCH_SIZE;
    this._asyncRequest = null;
    this.setState({
      isLoading: false,
      hasMore: keepGoing,
      items: [ ...items, ...newItems, ],
    });
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
    this.setState(INITIAL_STATE);
    if (this._asyncRequest) {
      // this._asyncRequest.cancel();
      this._asyncRequest = null;
    }
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
    const { handleFetchMoreData, } = this;
    const { isLoading, isError, items, hasMore, } = this.state;
    const { classes, condensed, actionable, creatable, readable, updatable, deletable, } = this.props;
    
    return (
      isLoading
      ?
      <div className="h-full">
        <IconButton className={classes.refresh} onClick={handleFetchMoreData} color="inherit">
          <Icon>refresh</Icon>
        </IconButton>
        <Loading />
      </div>
      :
      (
        isError
        ?
        <div className="h-full">
          <Error500Page />
        </div>
        :
        (
          items &&
          <React.Fragment>
            <Tooltip TransitionComponent={Zoom} title="Refresh data">
              <IconButton className={classes.refresh} onClick={handleFetchMoreData} color="inherit">
                <Icon>refresh</Icon>
              </IconButton>
            </Tooltip>
            <CRUDView
              items={items}
              condensed={condensed}
              actionable={actionable}
              creatable={creatable}
              readable={readable}
              updatable={updatable}
              deletable={deletable}
              onRefresh={handleFetchMoreData}
              onNext={handleFetchMoreData}
              hasMore={hasMore}
            />
          </React.Fragment>
      ))
    )
  }

}

// export default CRUDContainer;
export default withStyles(styles, {withTheme: true})(CRUDContainer);