import React, { Component } from 'react';
import PropTypes from "prop-types";
// import { withStyles } from '@material-ui/core/styles';
// import withStyles from "@material-ui/core/styles/withStyles";

// import { withRouter } from 'react-router-dom';

// react plugin for creating charts
// import ChartistGraph from "react-chartist";

// firebase
// import { firestoreConnect } from 'react-redux-firebase';

// redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateSettings } from 'my-app/store/actions/my-actions';
// import store from '../../store';
// import { firestoreConnect } from 'react-redux-firebase';

// @material-ui/core
// import Icon from "@material-ui/core/Icon";
import {
  // AppBar, Toolbar, Typography, // CssBaseline, Slide,
  withStyles, Hidden, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';

// import ViewListIcon from '@material-ui/icons/ViewList';
// import ViewModuleIcon from '@material-ui/icons/ViewModule';

// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';

// @material-ui/icons
import Button from "@material-ui/core/Button";

import dashboardStyle from "my-app/vendors/creative-tim/assets/jss/material-dashboard-react/views/dashboardStyle";
// import classNames from 'classnames';

// Custom Components
import DashboardWidgets from './DashboardWidgets';
import DashboardGridItems from './DashboardGridItems';
import Error500Page from 'my-app/components/Error500Page';

// import GeoSelect from 'my-app/components/GeoSelect/GeoSelect';
// import GeoStepper from 'my-app/components/steppers/GeoStepper';
import Loading from 'my-app/components/Loading.js';
import SettingsMessage from 'my-app/components/SettingsMessage';
import SettingsStepper from 'my-app/components/steppers/SettingsStepper';

// config
import { uiSpecs } from 'my-app/config/AppConfig';
import { bizCategoryItems } from 'my-app/config/AppConfig';

// firebase
import firebase from '@firebase/app';
import '@firebase/firestore';

// misc
// import Album from 'my-app/views/app/album/Album'

// import MyAppBar from 'my-app/views/app/appBars/MyAppBar';

const db = firebase.firestore();

const styles = theme => ({

  root: {
    // display: 'flex',
    ...dashboardStyle,
  },
  
  wrapper: {
    padding: 0, // flush with top on mobile //'56px', // clears <AppBar />
    // verticalAlign: 'top', // overcomes default
    width: `calc(100vw - ${uiSpecs.drawerWidth})`, // flush with right edge on mobile
    height: 'calc(100vh - 128px)',
  },

});

const INITIAL_STATE_DIALOG = {
  dialogOpen: false,
  dialogTitle: null,
  dialogContentText: null,
  dialogButtonLabel: null,
}

const INITIAL_STATE = {
  ...INITIAL_STATE_DIALOG,

  isError: false,
  // isLoading: true,
  bizCategory: null,
  categoryOpen: false,

  show: 'main', // 'main', 'step', 'greet',
  // condensedDashboard: false,
};

// const username = 'userme';
// const path = [ 'users' , username , 'settings', ].join('/');
// // const path = 'users/userme/settings';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  // componentDidMount() {
  //   this.getSettings();
  // }

  // getPath() {
  //   if(!this.props.user) return;
  //   const uid = this && this.props && this.props.user &&
  //               this.props.user.data && this.props.user.data.uid;
  //   return uid ? [ 'users' , uid , 'settings' , ].join('/') : null;
  // }

  // getSettings() {
  //   // console.log('props\n', this.props);
  //   // debugger;
  //   const path = this.getPath();
  //   try {
  //     db.collection(path)
  //     // .collection('users/userme/settings')
  //     // .orderBy('added_at', 'desc')
  //     // .orderBy('createdAt', 'desc')
  //     .orderBy('createdAt', 'desc')
  //     .limit(1)
  //     .get()
  //     .then(querySnapshot => {
  //       let out;
  //       querySnapshot.forEach(doc =>
  //         // doc.data() is always defined for query doc snapshots
  //         // console.log(doc.id, '\n', doc.data());
  //         // console.log('createdAt: ', doc.createdAt()); // throws error
  //         // console.log('createdAt: ', doc.get('createdAt')); // undefined
  //         // console.log('id: ', doc.id); // works
  //         // console.log('data\n', doc.data()); // works
  //         out = doc.data()
  //       );
  //       console.log('out\n', out);
  //       return out;
  //     })
  //       // }
  //     .then(result => {
  //       // this.setState(out);
  //       // always set state inside promise!
  //       // otherwise, function returns before data loads!
  //       const newState = {
  //         ...result,
  //         isLoading: false,
  //       };
  //       this.setState(newState);
  //     })
  //     .catch(error => {
  //       console.error('Error getting documents: \n', error);
  //       throw new Error(error);
  //     });
  //     // console.log('out\n', out); // returns before promise settles
  //     // return out;                // returns before promise settles
  //   } catch(error) {
  //     console.error(error.message);
  //     this.setState({
  //       isError: true,
  //       isLoading: false,
  //     });
  //   }
  // }

  handleSaveSettingsStepper = data => {
    const { bizCategory, geoNation, geoRegion, geoLocal, } = data;
    const createdAt = Date.now();
    const newData = { createdAt, bizCategory, geoNation, geoRegion, geoLocal, };
    this.setState({
      ...newData,
      show: 'main',
    });
    const path = this.getPath();
    db.collection(path)
      .add(newData);
  }

  handleClickButton = name => {
    // console.log('name', name);
    switch(name) {
      case 'Net':
        this.handleCloseCategory();
        break;
      case 'Deposits':
        this.handleCloseCategory();
        break;
      case 'Withdrawals':
        this.handleCloseCategory();
        break;
      case 'Challenges':
        this.handleCloseCategory();
        break;
      case 'Inbox':
        this.handleCloseCategory();
        break;
      case 'Archive':
        this.handleCloseCategory();
        break;
      case 'Contacts':
        this.handleCloseCategory();
        break;
      case 'Category':
        this.handleOpenCategory();
        break;
      case 'Locaction':
        this.handleClickGeo();
        break;
      case 'State':
        this.handleClickGeo();
        break;
      case 'Country':
        this.handleClickGeo();
        break;
      default:
        // code block
    }
  }

  handleClickGeo = () => {
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
    const { geoNation, geoRegion, geoLocal, } = this.state;
    // console.log('model\n', model);
    // this.setState({ [model.target.name]: model.target.value });
    const bizCategory = model.target.value;
    this.setState({ bizCategory, });
    // console.log('state\n', this.state);
    const createdAt = Date.now();
    const newData = { createdAt, bizCategory, geoNation, geoRegion, geoLocal, };
    const path = this.getPath();
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
      dialogButtonLabel: item.buttonLabel,
    });
  }

  handleCloseDialog = () => {
    this.setState(INITIAL_STATE_DIALOG);
  }

  // handleChangeSwitch = name => event => {
  //   this.setState({ [name]: event.target.checked }, () => {
  //     console.log('state\n', this.state);
  //     // this.props.updateSettings(this.state.settings);
  //   });
  // };
  
  render() {
    // console.log('user\n', this.props.user);
    // console.log('leads\n', this.props.leads);
    console.log('profile\n', this.props.profile);
    console.log('settings\n', this.props.settings);
    console.log('dataHasLoaded\n', this.props.dataHasLoaded);

    const { classes, settings, dataHasLoaded, } = this.props; // leads, user, profile,
    const { geoNation, geoRegion, geoLocal, bizCategory, } = settings; // isValidGeo,

    // const { isValidGeo, geoNation, geoRegion, geoLocal, bizCategory }
    //   = this && this.props && this.props.settings;// ? this.props.settings : this.state.settings;
    // let isValidGeo, geoNation, geoRegion, geoLocal, bizCategory;
    // if(dataHasLoaded) {
    // // if(dataHasLoaded && settings && this && this.props && this.props.settings) {
    //   // { isValidGeo, geoNation, geoRegion, geoLocal, bizCategory } = this.props.settings;
    //   isValidGeo  = this.props.settings.isValidGeo ;
    //   geoNation   = this.props.settings.geoNation  ;
    //   geoRegion   = this.props.settings.geoRegion  ;
    //   geoLocal    = this.props.settings.geoLocal   ;
    //   bizCategory = this.props.settings.bizCategory;
    //   console.log( 'isValidGeo\n'  , isValidGeo  );
    //   console.log( 'geoNation\n'   , geoNation   );
    //   console.log( 'geoRegion\n'   , geoRegion   );
    //   console.log( 'geoLocal\n'    , geoLocal    );
    //   console.log( 'bizCategory\n' , bizCategory );
    // };

    const {
      // handleChangeSwitch, 
      handleSaveSettingsStepper, handleClickGeo,
      handleOpenCategory, handleChangeCategory, handleCloseCategory,
      handleCloseDialog, handleClickButton, handleClickInfo,
    } = this;
    const {
      // isLoading, condensedDashboard, 
      // bizCategory, geoLocal, geoRegion, geoNation,
      show, isError, categoryOpen,
      dialogOpen, dialogContentText, dialogTitle, dialogButtonLabel,
    } = this.state;
    // const {
    //   classes,
    // } = this.props;
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
          <Button
            autoFocus
            // color="secondary"
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleClickButton(dialogTitle)}
          >
            {dialogButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    );

    const main = (
      <React.Fragment>
        {dialog}

        {
        // <AppBar
        //   className="m-0"
        //   position="static"
        //   elevation={0}
        // >
        //   <Toolbar className="px-16">
        //     <Typography variant="subtitle1" color="inherit" className="flex-1">
        //       Dashboard
        //     </Typography>
        //     <FormGroup row>
        //       <span className="self-center mr-12">
        //         { condensedDashboard ? <ViewListIcon /> : <ViewModuleIcon /> }
        //       </span>
        //       <FormControlLabel
        //         // labelPlacement="start"
        //         // label="Condensed"
        //         // label={ condensedDashboard ? "Condensed" : "Expanded" }
        //         // label={ condensedDashboard ? <ViewListIcon /> : <ViewModuleIcon /> }
        //         control={
        //           <Switch
        //             checked={condensedDashboard}
        //             onChange={handleChangeSwitch('condensedDashboard')}
        //             value="condensedDashboard"
        //             // color="white"
        //             // icon={<ViewModuleIcon />}
        //             // checkedIcon={<ViewListIcon />}
        //           />
        //         }
        //       />
        //     </FormGroup>
        //   </Toolbar>
        // </AppBar>
        }

        <Hidden smUp>
          <DashboardWidgets />
          <DashboardGridItems 
            // condensedDashboard={condensedDashboard}
            condensedDashboard
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
          />
        </Hidden>

        <Hidden xsDown>
          <DashboardWidgets />
          <DashboardGridItems 
            // condensedDashboard={condensedDashboard}
            // condensedDashboard
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
          />
        </Hidden>
        
      </React.Fragment>
    );

    return (
      // <React.Fragment>
        // <CssBaseline />
        // <MyAppBar
        //    id="fuse-toolbar"
        //    color="default"
        //   //  className={classNames(classes.toolbarWrapper, classes.toolbar,)}
        //   //  onClick={navbarOpenMobile}
        // />
      // isLoading
      !dataHasLoaded
      ?
      <Loading />
      :
      isError
        ?
        <Error500Page />
        :
        // <Slide in direction="right">
        <div className={classes.wrapper}>
          { ( show === 'greet' ) ? <SettingsMessage onClick={handleClickGeo} />           : null }
          { ( show === 'step'  ) ? <SettingsStepper onSave={handleSaveSettingsStepper} /> : null }
          { ( show === 'main'  ) ? main                                                   : null }
          {
          // <Album />
          }
        </div>
        // </Slide>
        // </React.Fragment>
    );
  }

}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  // console.log('state\n', state);
  // const settings = state.firestore.ordered.users
  //               && state.firestore.ordered.users[0]
  //               && state.firestore.ordered.users[0].settings
  //               && state.firestore.ordered.users[0].settings[0];
  // const settings = state.settings;
  const settings = state
                && state.myApp
                && state.myApp.reducers
                && state.myApp.reducers.settingsReducer
                && state.myApp.reducers.settingsReducer.settings;
  const profile = state
               && state.firebase
               && state.firebase.profile;
  // replace user with profile; user contains default settings
  // const user = state.auth.user;
  // const leads = state.firestore.ordered.leads;
  const dataHasLoaded = !!profile && !!settings; // && !!leads && !!user && 
  
  // console.log('user\n', user);
  // console.log('leads\n', leads);
  console.log('profile\n', profile);
  console.log('settings\n', settings);
  console.log('dataHasLoaded\n', dataHasLoaded);
  
  // //       YES   YES      YES       NO     NO
  // return { user, profile, settings, leads, dataHasLoaded, }
  return { profile, settings, dataHasLoaded, }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSettings: settings => dispatch(updateSettings(settings)),
  }
}

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps),
  // withRouter(connect(mapStateToProps, mapDispatchToProps),
  // firestoreConnect(props => {
  //   return [
  //     { collection: 'leads', orderBy: ['createdAt', 'desc'] },
  //     {
  //       collection: 'users',
  //       doc: props.profile.uid,
  //       subcollections: [
  //         {
  //           collection: 'settings',
  //           limit: 1,
  //           orderBy: ['createdAt', 'desc',],
  //           storeAs: 'settings',
  //         },
  //       ],
  //     },
  //   ];
  // }),
)(Dashboard)
