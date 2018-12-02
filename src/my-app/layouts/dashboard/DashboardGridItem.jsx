import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// @material-ui/core
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import InfoIconOutline from '@material-ui/icons/InfoOutlined';

// core components
import GridItem from "my-app/vendors/creative-tim/components/Grid/GridItem";
// import Danger from "my-app/vendors/creative-tim/components/div/Danger.jsx";
import Card from "my-app/vendors/creative-tim/components/Card/Card";
import CardHeader from "my-app/vendors/creative-tim/components/Card/CardHeader";
import CardIcon from "my-app/vendors/creative-tim/components/Card/CardIcon";
// import CardBody from "my-app/vendors/creative-tim/components/Card/CardBody.jsx";
import CardFooter from "my-app/vendors/creative-tim/components/Card/CardFooter";
import dashboardStyle from "my-app/vendors/creative-tim/assets/jss/material-dashboard-react/views/dashboardStyle";

const styles = theme => ({
  ...dashboardStyle,
});

function DashboardGridItem(props) {
  const { classes, item, onClickInfo } = props;
  return (
    <GridItem xs={12} sm={6} md={3} key={item.label}>
      <Card>
        <CardHeader color={item.color} stats icon>
          <CardIcon color={item.color}>{React.createElement(item.icon)}</CardIcon>
          <Typography className={classes.cardCategory}>{item.label}</Typography>
          <Typography variant={item.typog || 'h4'}>{item.data}</Typography>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <IconButton
              color='primary'
              className={classes.button}
              onClick={() => onClickInfo(item)}
            >
              {React.createElement(InfoIconOutline)}
            </IconButton>
          </div>
          <div className={classes.stats}>{item.btn}</div>
        </CardFooter>
      </Card>
    </GridItem>
  );
}

DashboardGridItem.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickInfo: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(DashboardGridItem);