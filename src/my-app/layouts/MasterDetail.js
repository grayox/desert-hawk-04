// import React from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

// @material-ui/core
// import Icon from "@material-ui/core/Icon";
import {
  AppBar, Toolbar, Typography,
  // Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@material-ui/core';

import { FuseAnimate, FuseAnimateGroup } from '@fuse';

// import UserMultiForm from 'my-app/components/forms/UserMultiForm';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

// 4 Ways to Style React Components: https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
// const MasterDetailStyle = {
//   display: 'grid', // https://css-tricks.com/snippets/css/complete-guide-grid/ | http://grid.malven.co/
//   gridTemplateColumns: '1fr 1fr',
// };

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const INITIAL_STATE = {
  detail: null,
};

// function MasterDetail(props) {
class MasterDetail extends Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleSwitch = model => {
    console.log('model\n', model);
    this.setState(
      { detail: null },
      // promise completes animation effect
      () => this.setState({ detail: model })
    );
  }

  handleBack = () => {
    // console.log('model\n', model);
    this.setState({ detail: null });
  }

  getEmpty1 = () => (<img src="https://via.placeholder.com/800x900.png/e91e63/fff?text=Detail+goes+here"/>)

  getEmpty = () => (
    <div className="max-w-512 h-auto text-center align-middle">
      {/* <FuseAnimate animation="transition.expandIn" delay={100}> */}
        {/* <Typography variant="h1" color="inherit" className="font-medium mb-16">
          Detail
        </Typography> */}
        {/* <Avatar>
          <BeachAccessIcon />
        </Avatar> */}
      {/* </FuseAnimate> */}
      <FuseAnimate delay={500}>
        <Typography variant="body1" color="textSecondary" className="mb-16">
          Detail goes here after selecting list item
        </Typography>
      </FuseAnimate>
    </div>
  )

  getSummary = item => {
    const { handleSwitch, } = this;
    return (
      <ListItem
        button
        key={item.timestamp}
        onClick={() => handleSwitch(item)}
      >
        <Avatar>
          <BeachAccessIcon />
        </Avatar>
        <ListItemText primary="Vacation" secondary={item.name} />
      </ListItem>
    )
  }

  getDetail = item => {
    const { classes, condensed, } = this.props;
    return (
      <FuseAnimate
        // className="px-0"
        // key={row.name}
        delay={200}
        animation="transition.slideLeftIn"
        // enter={{ animation: 'transition.slideRightIn' }}
        // leave={{ animation: 'transition.slideLeftOut' }}
      >
        <Paper className={classes.paper}>
          <List component="nav"> {/* subheader={<ListSubheader className="text-left">Detail</ListSubheader>} */}
            {
              Object.keys(item).map((keyName, keyIndex,) =>
                // keyName // success
                // `${keyName}: ${item[keyName]}` // success
                // // success
                // <Typography className="text-left">
                //   {keyName}: {item[keyName]}
                // </Typography>
                // attempt
                <ListItem
                  key={keyName.timestamp}
                  // button
                  // onClick={() => handleSwitch(item)}
                >
                  {/* <Avatar>
                    <BeachAccessIcon />
                  </Avatar> */}
                  <ListItemText
                    primary={keyName}
                    secondary={ condensed ? null : item[keyName] }
                  />
                  {
                    condensed
                    ?
                    <ListItemSecondaryAction className="pr-16">
                      {item[keyName]}
                    </ListItemSecondaryAction>
                    :
                    null
                  }
                </ListItem>
              )
            }
          </List>
        </Paper>
      </FuseAnimate>
    )
  }

  getDetailPane = () => {
    const { getSummary, getDetail, getEmpty, handleBack, } = this;
    const { detail, } = this.state;
    return (
      <React.Fragment>
        {
          detail
          ?
          <React.Fragment>
            {getSummary(detail)}
            <button onClick={handleBack}>Reset</button>
            {getDetail(detail)}
          </React.Fragment>
          :
          getEmpty()
        }
      </React.Fragment>
    )
  }

  getListPane = () => {
    const { classes, items, } = this.props;
    const { getSummary, } = this;
    return (
      <Paper className={classes.paper}>
        <div className={classes.root}>
          <List component="nav"> {/* subheader={<ListSubheader className="text-left">Items</ListSubheader>} */}
            {items.map(item => <span key={item.timestamp}>{getSummary(item)}</span>)}
          </List>
        </div>
      </Paper>
    )
  }

  render() {
    const { classes, } = this.props;
    const { detail, } = this.state;
    const { getListPane, getDetailPane, } = this;

    return (
      <React.Fragment>
        {/* mobile */}
        <Hidden smUp>{detail ? getDetailPane() : getListPane()}</Hidden>
        {/* laptop */}
        <Hidden xsDown>   
          <div className={classNames(classes.root, "sm:p-8 md:p-16")}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={6}>{getListPane()}</Grid>
              <Grid item xs={6}>{getDetailPane()}</Grid>
            </Grid>
          </div>
        </Hidden>
      </React.Fragment>
    );
  }
}

MasterDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  condensed: PropTypes.bool,
};

// export default MasterDetail;
// export default withStyles(styles)(MasterDetail);
export default compose(
  withStyles(styles),
  withWidth(),
)(MasterDetail);