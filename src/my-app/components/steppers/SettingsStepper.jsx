import React from 'react';
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

const steps = [
  'Select country'           ,
  'Select state or region'   ,
  'Select location'          ,
  'Select business cagegory' ,
];

const INITIAL_STATE = {
  activeStep: 0,

  openCountry: false,
  openRegion: false,
  openLocal: false,
  openCategory: false,
  openSnackbar: false,

  geoNation: '',
  geoRegion: '',
  geoLocal: '',
  bizCategory: '',
};

class SettingsStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  getStepContent = step => {
    
    const {
      openCountry   , geoNation   ,
      openRegion    , geoRegion   ,
      openLocal     , geoLocal    ,
      openCategory  , bizCategory ,
    } = this.state;
    
    const {
      handleOpenCountry  , handleCloseCountry  , handleChangeCountry  ,
      handleOpenRegion   , handleCloseRegion   , handleChangeRegion   ,
      handleOpenLocal    , handleCloseLocal    , handleChangeLocal    ,
      handleOpenCategory , handleCloseCategory , handleChangeCategory ,
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
    this.state.geoNation  ,
    this.state.geoRegion   ,
    this.state.geoLocal    ,
    this.state.bizCategory ,
  ]
  
  // ---------- country ------------

  handleOpenCountry = () => {
    this.setState({
      activeStep: 0,
      openCountry: true,
      openRegion: false,
      openLocal: false,
      openCategory: false,
      // geoNation: '',
      // geoRegion: '',
      // geoLocal: '',
    });
    // console.log('state\n', this.state);
  };

  handleCloseCountry = () => {
    this.setState({
      openCountry: false,
    });
    // console.log('state\n', this.state);
  };
  
  handleChangeCountry = e => {
    // console.log('e\n', e);
    // this.setState({ [e.target.name]: e.target.value });
    this.setState({     
      activeStep: 1,
      openCountry: false,
      openRegion: false,
      openLocal: false,
      openCategory: false,
      geoNation: e.target.value,
      geoRegion: '',
      geoLocal: '',
    });
    // this.handleNext();
    // console.log('state\n', this.state);
  };

  // ---------- region ------------

  handleOpenRegion = () => {
    this.setState({  
      activeStep: 1,
      openCountry: false,
      openRegion: true,
      openLocal: false,
      openCategory: false,
      // geoNation: '',
      // geoRegion: '',
      // geoLocal: '',
    });
    // console.log('state\n', this.state);
  };
  
  handleCloseRegion = () => {
    this.setState({
      openRegion: false,
    });
    // console.log('state\n', this.state);
  };
  
  handleChangeRegion = e => {
    // console.log('e\n', e);
    // this.setState({ [e.target.name]: e.target.value });
    this.setState({      
      activeStep: 2,
      openCountry: false,
      openRegion: false,
      openLocal: false,
      openCategory: false,
      // geoNation: '',
      geoRegion: e.target.value,
      geoLocal: '',
    });
    // this.handleNext();
    // console.log('state\n', this.state);
  };
  
  // ---------- local ------------

  handleOpenLocal = () => {
    this.setState({ 
      activeStep: 2,
      openCountry: false,
      openRegion: false,
      openLocal: true,
      openCategory: false,
      // geoNation: '',
      // geoRegion: '',
      // geoLocal: '',
    });
    // console.log('state\n', this.state);
  };

  handleCloseLocal = () => {
    this.setState({
      openLocal: false,
    });
    // console.log('state\n', this.state);
  };

  handleChangeLocal = e => {
    // console.log('e\n', e);
    // this.setState({ [e.target.name]: e.target.value });
    this.setState({    
      activeStep: 3,
      openCountry: false,
      openRegion: false,
      openLocal: false,
      openCategory: false,
      // geoNation: '',
      // geoRegion: '',
      geoLocal: e.target.value,
    });
    // this.handleNext();
    // console.log('state\n', this.state);
  };

  // ---------- category ------------

  handleOpenCategory = () => {
    this.setState({ 
      activeStep: 3,
      openCountry: false,
      openRegion: false,
      openLocal: false,
      openCategory: true,
      // geoNation: '',
      // geoRegion: '',
      // geoLocal: '',
    });
    // console.log('state\n', this.state);
  };

  handleCloseCategory = () => {
    this.setState({
      openCategory: false,
    });
    // console.log('state\n', this.state);
  };

  handleChangeCategory = e => {
    // console.log('e\n', e);
    // this.setState({ [e.target.name]: e.target.value });
    this.setState({    
      activeStep: 4,
      openCountry: false,
      openRegion: false,
      openLocal: false,
      openCategory: false,
      // geoRegion: '',
      // geoLocal: '',
      bizCategory: e.target.value,
    });
    // this.handleNext();
    // console.log('state\n', this.state);
  };

  // ---------- stepper ------------

  // handleNext = () => {
  //   this.setState(state => ({
  //     activeStep: state.activeStep + 1,
  //   }));
  // };

  handleReset = () => {
    // this.setState({
    //   activeStep: 0,
    // });
    this.setState(INITIAL_STATE);
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleSave = () => {
    this.setState({openSnackbar: true,});
  };

  handleCloseSnackbar = () => {
    this.setState({openSnackbar: false,});
  };

  // ------------------------------

  // handleBack = () => {
  //   const { activeStep } = this.state;
  //   switch( activeStep ) {
  //     case 1:
  //       this.setState({
  //         geoNation: null,
  //       })
  //       break;
  //     case 2:
  //       this.setState({
  //         geoRegion: null,
  //       })
  //       break;
  //     default:
  //       console.log('activeState out of range');
  //   }
  //   this.setState({
  //     activeStep: (activeStep + 1),
  //   });
  // }

  handleClickButton = () => {
    const { activeStep } = this.state;
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
      getChipValue,
      getStepContent,
      handleClickChip,
      handleBack,
      handleReset,
      handleCloseSnackbar,
    } = this;
    const { classes, } = this.props;

    return (
      <div className={classes.root}>
        <Typography
          variant="h5"
          className="opacity-50 font-light"
          color="inherit"
          gutterBottom
        >
          Set your location
        </Typography>
        <Paper className={classes.root} elevation={1}>
        <Stepper
          activeStep={activeStep}
          // orientation="horizontal"
          orientation="vertical"
        >
          {steps.map((label, index) =>
            <Step key={label}>
              <StepLabel>
                {/* <span className="opacity-50 ml-8 text-base">{this.getGeoValue()[index]}</span> */}
                {'Step ' + (index + 1) + ': ' + label}
                {
                  getChipValue()[index]
                    ?
                      <Chip className={[classes.chip, 'ml-8', 'capitalize',].join(' ')}
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
          )}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <div>You finished all steps. You&rsquo;re done!</div>
            <Button onClick={handleReset} className={[classes.button, "mr-32"].join(" ")}>Reset</Button>
            <Button onClick={handleBack} className={classes.button}>Back</Button>
            <Button onClick={ () => onSave(this.state)} className={classes.button}
              variant="contained"
              color="primary"
            >Save</Button>
          </Paper>
        )}
        </Paper>

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

      </div>
    );
  }
}

SettingsStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default withStyles(styles)(SettingsStepper);