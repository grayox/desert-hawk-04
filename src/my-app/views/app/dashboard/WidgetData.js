// inspired by: https://github.com/withinpixels/fuse-react/blob/v2.2.3/src/app/main/apps/dashboards/project/widgets/Widget4.js

import React, { Component, } from 'react'; // useState,
import { CircularProgress, } from '@material-ui/core';

import { loadUserData, } from 'my-app/containers/LoadAsync';


// // const WidgetData = props => {
//   // if(props) console.log('props\n', props,);
// const WidgetData = ({ dataSource={}, }) => {
//   // path: string, fields: string,
//   const { path, field, } = dataSource;
//   // if(path) console.log('path\n', path,);
//   // if(field) console.log('field\n', field,);

  // const ready1 = path && path.length;
  // if(!ready1) return null;
  // const ready2 = field && field.length;
  // if(!ready2) return null;

  // const [ hasLoaded, setHasLoaded, ] = useState(false);

const INITIAL_STATE = {
  data: null,
  // hasLoaded: false,
}

class WidgetData extends Component {

  state = { ...INITIAL_STATE };

  componentDidMount() {
    const data = this.fetchData()
      .then( () => {
        console.log('data\n', data,);
        this.setState({
          data,
          hasLoaded: () => (typeof data==='number'),
        });
      });
    // set recurring data fetch
    // this.timer = setInterval(() => fetchData(), 5000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.timer);
  //   this.timer = null;
  // }

  fetchData = async () => {
    this.setState({ hasLoaded: false, });
    const { dataSource, } = this.props;
    const { path, field, } = dataSource;
    // this._asyncRequest = await loadUserData(path,);
    // const data = this._asyncRequest;
    // const data = await loadUserData(path,);
    console.log('path\n', path,);
    const out = await loadUserData(path,);
    console.log('out\n', out,);
    return out;
  }

  getData = () => {
    const { data, } = this.state;
    if (typeof data === 'number') return data;
    else return null;
  }

  // const getData = () => {
  // // const getData = async () => {
  //   // const _asyncRequest = await loadUserData(path);
  //   // console.log('_asyncRequest\n', _asyncRequest,);
  //   const out = 15;
  //   // const out = _asyncRequest.leads.geoLocations['United States | Washington | Seattle | financial'];
  //   // const data = _asyncRequest;
  //   console.log('out\n', out,);
  //   if(typeof out === 'number') {
  //     setHasLoaded(true);
  //     return out;
  //   } else return null;
  // }

  // // const data = 17;
  // const data = getData();
  // // if(data) setHasLoaded(true);

  render() {
    const { hasLoaded, } = this.state; // data,
    const { getData, } = this;

    const getWidgetData = () =>
      // <div> {path} {field} </div>
      <React.Fragment>
        {
          hasLoaded
          ?
          getData()
          :
          <CircularProgress color="secondary" />
        }
      </React.Fragment>
  
    return getWidgetData();
  }

}

export default WidgetData;
// export default withStyles(styles)(DashboardWidget);