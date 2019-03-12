import React, { Component } from 'react';

import { componentsNavConfig } from 'my-app/config/AppConfig';
import CRUDView from './CRUDView';
import Loading from 'my-app/components/Loading.js';
import ErrorMaintenance from 'my-app/components/ErrorMaintenance.js';

import { loadMyAsyncData } from 'my-app/containers/loadAsync.js';

// const loadMyAsyncData = () => {
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
  //   this._asyncRequest = loadMyAsyncData().then(
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
    // this._asyncRequest = loadMyAsyncData();
    this._asyncRequest = loadMyAsyncData(readable);
    const items = await this._asyncRequest;
    this._asyncRequest = null;
    this.setState({
      isLoading: false,
      items,
    });
  }

  // handleCancel() {
  //   if (this._asyncRequest) {
  //     this._asyncRequest.cancel();
  //   }
  // }
  handleCancel = () => {
    if (this._asyncRequest) {
      // this._asyncRequest.cancel();
      this._asyncRequest = null;
    }
    this.setState(INITIAL_STATE);
  };

  // render() {
  //   const { condensed, actionable, creatable, readable, updatable, deletable, } = this.props;
    
  //   return (
  //     isLoading
  //     ?
  //     <Loading />
  //     :
  //     (
  //       isError
  //       ?
  //       <ErrorMaintenance />
  //       :
  //       (items && (
  //       <CRUDView
  //         items={items}
  //         condensed={condensed}
  //         actionable={actionable}
  //         creatable={creatable}
  //         // readable={readable}
  //         updatable={updatable}
  //         deletable={deletable}
  //       />
  //     )))
  //   )
  // }

  render() {
    const { isLoading, } = this.state;
    return (
      <div className="App">
        {(isLoading && <button onClick={this.handleCancel}>Cancel</button>) || (
          <button onClick={this.handleLoad}>Load</button>
        )}
        <div>
          <h3>{(isLoading && "Loading...") || "Not loading"}</h3>
        </div>
        <pre>
          <code>{JSON.stringify(this.state)}</code>
        </pre>
      </div>
    );
  }
}

export default CRUDContainer;
