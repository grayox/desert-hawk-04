import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
// import withStyles from "@material-ui/core/styles/withStyles";

// react plugin for creating charts
// import ChartistGraph from "react-chartist";

// redux
// import { connect } from 'react-redux';
// import store from '../../store';
// import {withRouter} from 'react-router-dom';

// @material-ui/core
// import Icon from "@material-ui/core/Icon";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

// @material-ui/icons
import Button from "@material-ui/core/Button";

import dashboardStyle from "my-app/vendors/creative-tim/assets/jss/material-dashboard-react/views/dashboardStyle";
// import classNames from 'classnames';

// Custom Components
import DashboardGridItems from './DashboardGridItems'

// import GeoSelect from 'my-app/components/GeoSelect/GeoSelect';
// import GeoStepper from 'my-app/components/steppers/GeoStepper';
import SettingsMessage from 'my-app/components/SettingsMessage';
import SettingsStepper from 'my-app/components/steppers/SettingsStepper';

// config
import { bizCategoryItems } from 'my-app/config/AppConfig';

// firebase
import firebase from '@firebase/app';
import '@firebase/firestore';
const db = firebase.firestore();

const styles = theme => ({
  ...dashboardStyle,
  container: {
    padding: '24px',
  },
});

const INITIAL_STATE = {
  dialogOpen: false,
  dialogTitle: '',
  dialogContentText: '',

  categoryOpen: false,
  bizCategory: '',

  show: 'main', // 'main', 'step', 'greet',
};

const username = 'userme';
const path = [ 'users' , username , 'settings', ].join('/');
// const path = 'users/userme/settings';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.getSettings();
  }

  getSettings() {
    db.collection(path)
      // .collection('users/userme/settings')
      // .orderBy('added_at', 'desc')
      // .orderBy('created_at', 'desc')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get()
      .then(querySnapshot => {
        let out;
        querySnapshot.forEach(doc =>
          // doc.data() is always defined for query doc snapshots
          // console.log(doc.id, '\n', doc.data());
          // console.log('timestamp: ', doc.timestamp()); // throws error
          // console.log('timestamp: ', doc.get('created_at')); // undefined
          // console.log('id: ', doc.id); // works
          // console.log('data\n', doc.data()); // works
          out = doc.data()
        );
        // console.log('out\n', out);
        return out;
      })
        // }
      .then(result => {
        // this.setState(out);
        // always set state inside promise!
        // otherwise, function returns before data loads!
        const newState = result;
        this.setState(newState);
      })
      .catch(error => {
        console.log('Error getting documents: \n', error);
      });
    // console.log('out\n', out); // returns before promise settles
    // return out;                // returns before promise settles
  }

  handleSaveSettingsStepper = data => {
    const {
      bizCategory,
      geoNation,
      geoRegion,
      geoLocal,
    } = data;
    const newData = {
      timestamp: Date.now(),
      bizCategory: bizCategory,
      geoNation: geoNation,
      geoRegion: geoRegion,
      geoLocal: geoLocal,
    };
    this.setState({
      ...newData,
      show: 'main',
    });
    db.collection(path)
      .add(newData);
  }

  handleClickGeoLocal = () => {
    this.setState({ show: 'step', });
    window.scrollTo(0, 0);
  }

  handleClickGeoRegion = () => {
    this.setState({ show: 'step', });
    window.scrollTo(0, 0);
  }

  handleClickGeoNation = () => {
    this.setState({ show: 'step', });
    window.scrollTo(0, 0);
  }

  handleClickSettingsMessage = () => {
    this.setState({ show: 'step', });
    window.scrollTo(0, 0);
  }

  handleOpenCategory = () => {
    // console.log('opening category...');
    // console.log('state\n', this.state);
    this.setState({ categoryOpen: true, });
    // console.log('state\n', this.state);
  }
  
  handleCloseCategory = () => {
    // console.log('closing category...');
    // console.log('state\n', this.state);
    this.setState({ categoryOpen: false, });
    // console.log('state\n', this.state);
  }

  handleChangeCategory = model => {
    const {
      geoNation,
      geoRegion,
      geoLocal,
    } = this.state;
    // console.log('model\n', model);
    // this.setState({ [model.target.name]: model.target.value });
    const bizCategory = model.target.value;
    this.setState({ bizCategory: bizCategory, });
    // console.log('state\n', this.state);
    const newData = {
      timestamp: Date.now(),
      bizCategory: bizCategory,
      geoNation: geoNation,
      geoRegion: geoRegion,
      geoLocal: geoLocal,
    };
    db.collection(path)
      .add(newData);
  }

  // handleClickInfo = () => {
  handleClickInfo = item => {
    // console.log('handling click info...');
    // console.log('item\n', item);
    this.setState({
      dialogOpen: true,
      dialogTitle: item.label,
      dialogContentText: item.desc,
    });
  }

  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false,
      dialogTitle: null,
      dialogContentText: null,
    });
  }
  
  render() {
    const { show } = this.state;
    const {
      handleOpenCategory,
      handleChangeCategory,
      handleCloseCategory,
      handleCloseDialog,
      handleClickInfo,
      handleClickSettingsMessage,
      handleSaveSettingsStepper,
      handleClickGeoLocal,
      handleClickGeoRegion,
      handleClickGeoNation,
    } = this;
    const {
      geoLocal,
      geoRegion,
      geoNation,
      bizCategory,
      categoryOpen,
      dialogOpen,
      dialogContentText,
      dialogTitle,
    } = this.state;
    const {
      classes,
    } = this.props;
    // console.log('this', this);
    // console.log('this-props\n', this.props);
    // const { categoryOpen, bizCategory, } = this.props;

    const dialog = (
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" autoFocus>
            OK, got it!
          </Button>
        </DialogActions>
      </Dialog>
    );

    const main = (
      <React.Fragment>
        {dialog}
        <DashboardGridItems
          geoLocal={geoLocal}
          geoRegion={geoRegion}
          geoNation={geoNation}
          categoryOpen={categoryOpen}
          categoryItems={bizCategoryItems}
          bizCategory={bizCategory}
          onCategoryOpen={handleOpenCategory}
          onCategoryChange={handleChangeCategory}
          onCategoryClose={handleCloseCategory}
          onClickInfo={handleClickInfo}
          onClickGeoLocal={handleClickGeoLocal}
          onClickGeoRegion={handleClickGeoRegion}
          onClickGeoNation={handleClickGeoNation}
        />
      </React.Fragment>
    );

    return (
      <div className={classes.container}>
        { ( show === 'greet' ) ? <SettingsMessage onClick={handleClickSettingsMessage} /> : null }
        { ( show === 'step'  ) ? <SettingsStepper onSave={handleSaveSettingsStepper}   /> : null }
        { ( show === 'main'  ) ? main                                                     : null }
      </div>
    );
  }

}

// const getStore = store.getState();

// const mapStateToProps = state => {
//   // console.log('state\n', state);
//   // console.log('store\n', store.getState());
//   // const getStore = store.getState();
//   // console.log('getStore\n', getStore);
//   return {
//     category   : getStore.category    ,
//     geoNation : getStore.geoNation  ,
//     geoRegion  : getStore.geoRegion   ,
//     geoLocal   : getStore.geoLocal    ,
//     role       : state.auth.user.role ,
//   };
// }

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard); // latest working
// export default withStyles(dashboardStyle)(ViewDashboard); // test
// export default connect(mapStateToProps)(ViewDashboard); // not working
// export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseLayout))); // original from another part of this theme
// export default withStyles(styles)(connect(mapStateToProps)(Dashboard)); // in test