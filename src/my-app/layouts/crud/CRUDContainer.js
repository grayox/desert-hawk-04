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

const INITIAL_STATE = {
  items: null,
  isError: false,
  isLoading: true,
};

class CRUDContainer extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    this.handleLoad();
  }

  componentWillUnmount() {
    this.handleCancel();
  }

  // refs: https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data
  // https://stackoverflow.com/a/55093394/1640892 | https://codesandbox.io/s/lrvwm88pv7
  // handleLoad() {
  //   this._asyncRequest = loadAsyncData().then(
  //     externalData => {
  //       this._asyncRequest = null;
  //       this.setState({externalData});
  //     }
  //   );
  // }
  handleLoad = async () => {
    // console.log('props\n', this.props);
    const { readable, } = this.props;

    this.setState({
      isLoading: true,
    });
    // this._asyncRequest = loadAsyncData();
    this._asyncRequest = loadAsyncData(readable);
    const items = await this._asyncRequest;
    this._asyncRequest = null;
    this.setState({
      items,
      isLoading: false,
    });
  }

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
  //         <button onClick={this.handleLoad}>Load</button>
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
    const { handleLoad, } = this;
    const { isLoading, isError, items, } = this.state;
    const { classes, condensed, actionable, creatable, readable, updatable, deletable, } = this.props;
    
    return (
      isLoading
      ?
      <div className="h-full">
        <IconButton className={classes.refresh} onClick={handleLoad} color="inherit">
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
              <IconButton className={classes.refresh} onClick={handleLoad} color="inherit">
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
              onRefresh={handleLoad}
            />
          </React.Fragment>
      ))
    )
  }

}

// export default CRUDContainer;
export default withStyles(styles, {withTheme: true})(CRUDContainer);