import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import GeoSelect from '../GeoSelect/GeoSelect';
import SelectControl from '../selects/SelectControl';
import { bizCategoryItems } from 'my-app/config/AppConfig';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

const HEADER_MESSAGE =
  <Typography variant="h5" className="opacity-50 font-light" color="inherit" gutterBottom>
    Set your location
  </Typography>

const FINISH_MESSAGE = <div>You finished all steps. You&rsquo;re done!</div>

const steps = [
  'Select country'           ,
  'Select state or region'   ,
  'Select location'          ,
  'Select business cagegory' ,
];

const INITIAL_STATE_ACTIVE_STEP = {
  activeStep: 0,
};

const INITIAL_STATE_OPEN = {
  openCountry  : false ,
  openRegion   : false ,
  openLocal    : false ,
  openCategory : false ,
  openSnackbar : false ,
};

const INITIAL_STATE_VALUES_GEO = {
  geoNation : '' ,
  geoRegion : '' ,
  geoLocal  : '' ,
};

const INITIAL_STATE_VALUES_BIZ_CATEGORY = {
  bizCategory : '' ,
};

const INITIAL_STATE_VALUES = {
  ...INITIAL_STATE_VALUES_GEO,
  ...INITIAL_STATE_VALUES_BIZ_CATEGORY,
};

const INITIAL_STATE = {
  ...INITIAL_STATE_ACTIVE_STEP,
  ...INITIAL_STATE_OPEN,
  ...INITIAL_STATE_VALUES,
};

class SettingsStepper extends Component {
  
  state = INITIAL_STATE;
  
  // constructor(props) {
  //   super(props);
  //   this.state = INITIAL_STATE;
  // }

  getStepContent = step => {
    
    const {
      openCountry, openRegion, openLocal, openCategory,
      geoNation, geoRegion, geoLocal, bizCategory,
    } = this.state;
    
    const {
      handleOpenCountry, handleCloseCountry, handleChangeCountry,
      handleOpenRegion, handleCloseRegion, handleChangeRegion,
      handleOpenLocal, handleCloseLocal, handleChangeLocal,
      handleOpenCategory, handleCloseCategory, handleChangeCategory,
    } = this;
    
    const steps = [
      <GeoSelect
        control='none'
        variant='country'
        open={openCountry}
        value={geoNation}
        onOpen={handleOpenCountry}
        onClose={handleCloseCountry}
        onChange={handleChangeCountry}
      />
      ,
      <GeoSelect
        control='none'
        variant='region'
        open={openRegion}
        value={geoRegion}
        country={geoNation}
        onOpen={handleOpenRegion}
        onClose={handleCloseRegion}
        onChange={handleChangeRegion}
      />
      ,
      <GeoSelect
        control='none'
        variant='local'
        open={openLocal}
        value={geoLocal}
        region={geoRegion}
        country={geoNation}
        onOpen={handleOpenLocal}
        onClose={handleCloseLocal}
        onChange={handleChangeLocal}
      />
      ,
      <SelectControl
        size='small'
        control='none'
        label='Select category'
        open={openCategory}
        items={bizCategoryItems}
        value={bizCategory}
        onOpen={handleOpenCategory}
        onClick={handleOpenCategory}
        onClose={handleCloseCategory}
        onChange={handleChangeCategory}
      />
      ,
    ];
    return steps[step];
  }

  getOpenHandlers = () => [
    this.handleOpenCountry  ,
    this.handleOpenRegion   ,
    this.handleOpenLocal    ,
    this.handleOpenCategory ,
  ]

  getChipValue = () => [
    this.state.geoNation   ,
    this.state.geoRegion   ,
    this.state.geoLocal    ,
    this.state.bizCategory ,
  ]
  
  // ---------- country ------------

  handleOpenCountry = () => {
    this.setState({
      ...INITIAL_STATE_OPEN,
      activeStep: 0,
      openCountry: true,
    }
    // , () => console.log('state\n', this.state)
    );
  };

  handleCloseCountry = () => {
    this.setState({
      INITIAL_STATE_OPEN
    }
    // , () => console.log('state\n', this.state)
    );
  };
  
  handleChangeCountry = e => {
    // console.log('e\n', e);
    this.setState({
      ...INITIAL_STATE_OPEN,
      ...INITIAL_STATE_VALUES_BIZ_CATEGORY,
      activeStep: 1,
      geoNation: e.target.value,
      geoRegion: '',
      geoLocal: '',
    }
    // , () => {
    // console.log('state\n', this.state);
    // }
    );
  };

  // ---------- region ------------

  handleOpenRegion = () => {
    this.setState({
      ...INITIAL_STATE_OPEN,
      openRegion: true,
      activeStep: 1,
    }
    // , () => console.log('state\n', this.state)
    );
  };
  
  handleCloseRegion = () => {
    this.setState({
      INITIAL_STATE_OPEN
    }
    // , () => console.log('state\n', this.state)
    );
  };
  
  handleChangeRegion = e => {
    // console.log('e\n', e);
    // this.setState({ [e.target.name]: e.target.value });
    this.setState({ 
      ...INITIAL_STATE_OPEN,
      ...INITIAL_STATE_VALUES_BIZ_CATEGORY,
      activeStep: 2,
      // geoNation: '',
      geoRegion: e.target.value,
      geoLocal: '',
    }
    // , () => {
    // console.log('state\n', this.state);
    // }
    );
  };
  
  // ---------- local ------------

  handleOpenLocal = () => {
    this.setState({ 
      ...INITIAL_STATE_OPEN,
      activeStep: 2,
      openLocal: true,
    });
  };

  handleCloseLocal = () => {
    this.setState({
      openLocal: false,
    }
    // , () => console.log('state\n', this.state)
    );
  };

  handleChangeLocal = e => {
    // console.log('e\n', e);
    // this.setState({ [e.target.name]: e.target.value });
    this.setState({ 
      ...INITIAL_STATE_OPEN,
      ...INITIAL_STATE_VALUES_BIZ_CATEGORY,
      activeStep: 3,
      // geoNation: '',
      // geoRegion: '',
      geoLocal: e.target.value,
    }
    // , () => {
    // console.log('state\n', this.state);
    // }
    );
  };

  // ---------- category ------------

  handleOpenCategory = () => {
    this.setState({
      ...INITIAL_STATE_OPEN,
      openCategory: true,
      activeStep: 3,
    }
    // , () => console.log('state\n', this.state)
    );
  };

  handleCloseCategory = () => {
    this.setState({
      openCategory: false,
    }
    // , () => console.log('state\n', this.state)
    );
  };

  handleChangeCategory = e => {
    // console.log('e\n', e);
    // this.setState({ [e.target.name]: e.target.value });
    this.setState({
      ...INITIAL_STATE_OPEN, 
      activeStep: 4,
      bizCategory: e.target.value,
    }
    // , () => {
    // console.log('state\n', this.state);
    // }
    );
  };

  // ---------- stepper ------------

  handleReset         = () => this.setState(   INITIAL_STATE                                )
  handleBack          = () => this.setState( { activeStep   : this.state.activeStep - 1 , } )
  handleSave          = () => this.setState( { openSnackbar : true                      , } )
  handleCloseSnackbar = () => this.setState( { openSnackbar : false                     , } )

  handleClickButton = () => {
    const { activeStep, } = this.state;
    // console.log('button clicked...');
    // console.log('activeStep', activeStep);
    const a = this.getOpenHandlers();
    // console.log('open handlers\n', a);
    a[activeStep]();
  }

  handleClickChip = index => {
    // console.log('button clicked...');
    // console.log('index', index);
    const a = this.getOpenHandlers();
    // console.log('open handlers\n', a);
    a[index]();
  }

  render() {
    const { onSave, } = this.props;
    const { activeStep, openSnackbar, } = this.state;
    const {
      getChipValue, getStepContent, handleClickChip, handleBack, handleReset, handleCloseSnackbar,
    } = this;
    const { classes, } = this.props;

    const getActiveStep = () =>
      <Paper square elevation={0} className={classes.resetContainer}>
        {FINISH_MESSAGE}
        <Button onClick={handleReset} className={[classes.button, "mr-32"].join(" ")}>Reset</Button>
        <Button onClick={handleBack} className={classes.button}>Back</Button>
        <Button
          onClick={ () => onSave(this.state)}
          className={classes.button}
          variant="contained"
          color="primary"
        >Save</Button>
      </Paper>

    const getStepper = () =>
      <Stepper
        activeStep={activeStep}
        // orientation="horizontal"
        orientation="vertical"
      >
        {
          steps.map( ( label, index, ) =>
            <Step key={label}>
              <StepLabel>
                {/* <span className="opacity-50 ml-8 text-base">{this.getGeoValue()[index]}</span> */}
                {`Step ${index + 1}: ${label}`}
                {
                  getChipValue()[index]
                  ?
                  <Chip
                    className={[classes.chip, 'ml-8', 'capitalize',].join(' ')}
                    label={getChipValue()[index]}
                    onClick={() => handleClickChip(index)} />
                  :
                  null
                }
              </StepLabel>
              <StepContent>
                <div>{getStepContent(index)}</div>
                <div className={classes.actionsContainer}>
                  <Button
                    className={classes.button}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={this.handleClickButton}
                  >
                    Select
                  </Button>
                </div>
              </StepContent>
            </Step>
          )
        }
      </Stepper>

    const getSnackbar = () =>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Saved</span>}
        action={[
          <Button className="uppercase" key="undo" color="secondary" size="small" onClick={handleCloseSnackbar}>
            Undo
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleCloseSnackbar}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />

    const getMainContent = () =>
      <Paper className={classes.root} elevation={1}>
        {getStepper()} {(activeStep === steps.length) && getActiveStep()}
      </Paper>

    const getSettingsStepper = () =>
      <div className={classes.root}> {HEADER_MESSAGE} {getMainContent()} {getSnackbar()} </div>

    return getSettingsStepper();
  }
}

SettingsStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default withStyles(styles)(SettingsStepper);