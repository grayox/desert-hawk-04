// import React from 'react';

import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


// 4 Ways to Style React Components: https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
// const ListDetailStyle = {
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

function ListDetail(props) {

  const { classes, list, detail } = props;

  return (
    // <div style={ListDetailStyle}>
    //   <div className="border-solid">{list}</div>
    //   <div className="border-solid">{detail}</div>
    // </div>

    // <div className="flex mb-4">
    //   <div className="md:w-1/2">{list}</div>
    //   <div className="md:w-1/2 md:hidden">{detail}</div>
    // </div>

    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>{list}</Paper>
          {/* {list} */}
        </Grid>
        <Hidden xsDown>
          <Grid item xs={6}>
            <Paper className={classes.paper}>{detail}</Paper>
            {/* {detail} */}
          </Grid>
        </Hidden>
      </Grid>
    </div>

  );
}

ListDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default ListDetail;
// export default withStyles(styles)(ListDetail);
export default compose(
  withStyles(styles),
  withWidth(),
)(ListDetail);