import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import withStyles from "@material-ui/core/styles/withStyles";

import AddIcon from '@material-ui/icons/Add';
// import Button from "@material-ui/core/Button";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ContactsIcon from '@material-ui/icons/Contacts';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import FlagIcon from '@material-ui/icons/Flag';
import LabelIcon from '@material-ui/icons/Label';
import PlaceIcon from '@material-ui/icons/Place';
import RemoveIcon from '@material-ui/icons/Remove';
import SaveIcon from '@material-ui/icons/Save';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import WarningIcon from '@material-ui/icons/Warning';

// import {FuseAnimateGroup, FuseHighlight, FusePageSimple} from '@fuse';
import { FuseAnimateGroup } from '@fuse';

// @material-ui/core
import {
  // Button, Icon, IconButton,
  // AppBar, Toolbar, ListItemIcon, 
  Typography, Avatar, ListItemAvatar, Card, CardContent,
  List, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction,
} from '@material-ui/core';

// core components
import GridContainer from "my-app/vendors/creative-tim/components/Grid/GridContainer";

// custom components
import SelectControl from '../../components/selects/SelectControl';
import DashboardGridItem from './DashboardGridItem'

// CategorySelect
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  // container: {
  //   padding: '24px',
  // },
});

function DashboardGridItems(props) {
  const { onClickInfo, condensedDashboard, } = props; // classes,
  const rows = getRows(props);
  // console.log('props', props);
  return (
    <React.Fragment>
      {
        condensedDashboard
        ?
        (
          <Card className="w-full m-0 md:mb-16">
            <CardContent className="px-0">
              <FuseAnimateGroup
                // className="px-0"
                // key={row.name}
                delay={200}
                enter={{ animation: 'transition.slideRightBigIn' }}
                leave={{ animation: 'transition.slideLeftBigOut' }}
              >
                {
                  rows.map(row => (
                    <List
                      key={row.name}
                      component="nav"
                      className="px-0 mb-4"
                      subheader={<ListSubheader>{row.name}</ListSubheader>}
                    >
                      {
                        row.cells.map(cell => (
                          <ListItem
                            key={cell.label}
                            button
                            aria-haspopup="false"
                            aria-controls="username"
                            aria-label="username"
                            // onClick={handleClickListItemDialog({
                            //   dialogTitle: 'Name',
                            //   isDialogTextField: true,
                            //   dialogTextFieldLabel: 'first and last',
                            //   dialogFieldName: 'name',
                            // })}
                            onClick={() => onClickInfo(cell)}
                          >
                            {/* <ListItemIcon>
                              {React.createElement(cell.icon)}
                            </ListItemIcon> */}
                            <ListItemAvatar>
                              <Avatar>
                                {React.createElement(cell.icon)}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={cell.label}
                              // secondary={name}
                              // secondary={user.data.displayName}
                            />
                            <ListItemSecondaryAction className="pr-16">
                              {cell.data}
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))
                      }
                    </List>
                  ))
                }
              </FuseAnimateGroup>
            </CardContent>
          </Card>
        )
        :
        ( 
          rows.map(row => (
            <FuseAnimateGroup
              className="p-24"
              key={row.name}
              delay={200}
              enter={{ animation: 'transition.slideRightBigIn' }}
              leave={{ animation: 'transition.slideLeftBigOut' }}
            >
              <Typography variant="subtitle1" className="opacity-75 font-light">{row.name}</Typography>
              <GridContainer
                // className={classes.container}
              >
                {row.cells.map(cell => (
                  <DashboardGridItem
                    key={cell.label}
                    item={cell}
                    onClickInfo={() => onClickInfo(cell)}
                  />
                ))}
              </GridContainer>
            </FuseAnimateGroup>
          ))
        )
      }
    </React.Fragment>
  );
}

const marketDescription = (
  <Typography className="mt-12">
    To specify the location of your market, you must identify all three levels:
    <ul>
      <li>country</li>
      <li>state or region</li>
      <li>location</li>
    </ul>
  </Typography>
);

function getRows(props) {
  const {
    categoryOpen, categoryItems, bizCategory,
    onCategoryOpen, onCategoryClose, onCategoryChange,
    geoLocal, geoRegion, geoNation,
  } = props;
  return [
    {
      name: 'Balances',
      cells: [
        {
          label: 'Net',
          data: 5,
          icon: DragHandleIcon,
          color: 'warning',
          buttonLabel: 'Hai',
          desc:
            <React.Fragment>
              <Typography paragraph>
                Your net balance is the most important balance for you to maintain above zero.
                It represents the difference between your deposits and withdrawals.
                Or, in other words, how many leads you referred compared to how many you received.
              </Typography>
              <Typography className="mt-12">
                If you maintain a positive net balance, you will always be able to see your inbox
                and claim new leads as they arrive.
                If your net balance reaches zero, your inbox will lock and you won&rsquo;t be able
                to view it until you deposit more leads.
              </Typography>
            </React.Fragment>
          ,
        },
        {
          label: 'Deposits',
          data: 5,
          icon: AddIcon,
          color: 'success',
          buttonLabel: 'Deposit new',
          desc:
            <React.Fragment>
              <Typography paragraph>
                Here we keep track of all the valid leads you submitted and referred into the network.
                To make a deposit, click the button then fill out the form.
                The form&rsquo;s &ldquo;save&rdquo; button will remain disabled
                until you complete all required fields.
              </Typography>
              <Typography className="mt-12">
                These are all your required fields.
                  <ul>
                  <li>name</li>
                  <li>phone number or email</li>
                  <li>zip code</li>
                  <li>lead type</li>
                </ul>
              </Typography>
            </React.Fragment>
          ,
        },
        {
          label: 'Withdrawals',
          data: 5,
          icon: RemoveIcon,
          color: 'danger',
          buttonLabel: 'See available',
          desc:
            <React.Fragment>
              <Typography paragraph>
                This is the number of leads you claimed from your inbox and placed into your archive for your use.
                To claim a lead from your inbox, just click it.
                Then we will automatically place that lead in your archive and you will be able to see it continuously.
              </Typography>
              <Typography className="mt-12">
                Unlike new leads in your inbox, you will always be able to see your archived leads &mdash;
                even if your net balance falls to zero.
              </Typography>
            </React.Fragment>
          ,
        },
        {
          label: 'Challenges',
          data: <span>&minus;5</span>,
          icon: WarningIcon,
          color: 'primary',
          buttonLabel: 'See challenges',
          desc:
            <React.Fragment>
              <Typography paragraph>
                This is the number of net lead challenges you have won.
                Lost challenges are shown as a negative number.
                Users can challenge leads they believe are not legitimate.
              </Typography>
              <Typography className="mt-12">
                You can challenge any lead you think is of poor quality.
                Those who make or receive too many challenges could have negative consequences as a result.
                So strive to submit high quality leads and be judicious in your challenges of others.
              </Typography>
            </React.Fragment>
          ,
        },
      ]
    },
    {
      name: 'Inventories',
      cells: [
        {
          label: 'Inbox',
          data: 5,
          icon: CloudDownloadIcon,
          color: 'info',
          buttonLabel: 'View inbox',
          desc:
            <Typography paragraph>
              List of all leads matching your type category and market location
            </Typography>
          ,
        },
        {
          label: 'Archive',
          data: 5,
          icon: SaveIcon,
          color: 'success',
          buttonLabel: 'View archive',
          desc:
            <Typography paragraph>
              List of all previously available leads you claimed that are now exclusively yours
            </Typography>
          ,
        },
        {
          label: 'Outbox',
          data: 5,
          icon: CloudUploadIcon,
          color: 'primary',
          buttonLabel: 'View outbox',
          desc:
            <Typography paragraph>
              List of all leads you submitted and referred to your peers on the network
            </Typography>
          ,
        },
        {
          label: 'Contacts',
          data: 5,
          icon: ContactsIcon,
          color: 'success',
          buttonLabel: 'Add contact',
          desc:
            <Typography paragraph>
              List of everyone you invited to join the network
            </Typography>
          ,
        },
      ]
    },
    {
      name: 'Details',
      cells: [
        {
          label: 'Category',
          data: <span className="capitalize">{bizCategory}</span>,
          icon: LabelIcon,
          color: 'info',
          typog: 'subtitle1',
          buttonLabel: 'Edit',
          btn:
            <SelectControl
              size='small'
              control='button'
              label='Change category'
              open={categoryOpen}
              items={categoryItems}
              value={bizCategory}
              onOpen={onCategoryOpen}
              onClick={onCategoryOpen}
              onClose={onCategoryClose}
              onChange={onCategoryChange}
            />
          ,
          desc:
            <React.Fragment>
              Tell us the type of leads you want.
                <ul>
                <li>
                  <Typography className="mt-12">
                    <Typography className="mr-12">Home</Typography>
                    {React.createElement(HomeIcon)}
                  </Typography>
                  <Typography paragraph>
                    Select this if you are a real estate broker or agent selling homes to residential buyers
                  </Typography>
                </li>
                <li>
                  <Typography className="mt-12">
                    <Typography className="mr-12">Mortgage</Typography>
                    {React.createElement(AccountBalanceIcon)}
                  </Typography>
                  <Typography paragraph>
                    Select this if you are a real estate mortgage broker or agent selling financing to home buyers
                  </Typography>
                </li>
                <li>
                  <Typography className="mt-12">
                    <Typography className="mr-12">Insurance</Typography>
                    {React.createElement(AssessmentIcon)}
                  </Typography>
                  <Typography paragraph>
                    Select this if you are an insurance broker or agent selling property and casualty policies
                  </Typography>
                </li>
                <li>
                  <Typography className="mt-12">
                    <Typography className="mr-12">Financial</Typography>
                    {React.createElement(AssignmentIcon)}
                  </Typography>
                  <Typography paragraph>
                    Select this if you are a financial planner and advise clients on their personal finances
                  </Typography>
                </li>
              </ul>
            </React.Fragment>
          ,
        },
        {
          label: 'Location',
          // data: 'Scholes',
          data: geoLocal,
          icon: PlaceIcon,
          color: 'primary',
          typog: 'subtitle1',
          buttonLabel: 'Edit',
          desc:
            <React.Fragment>
              <Typography paragraph>
                The third level of your location selection.
                (In some small states or regions, it can be the only third level choice.
                In that case, the third level choice is usually identical to the name of the state or region.)
              </Typography>
              {marketDescription}
            </React.Fragment>
          ,
        },
        {
          label: 'State',
          // data: 'Mississippi',
          data: geoRegion,
          icon: TrackChangesIcon,
          color: 'warning',
          typog: 'subtitle1',
          buttonLabel: 'Edit',
          desc:
            <React.Fragment>
              <Typography paragraph>
                The second level of your location selection. (Called &ldquo;region&rdquo; in certain countries.)
              </Typography>
              {marketDescription}
            </React.Fragment>
          ,
        },
        {
          label: 'Country',
          // data: 'United States',
          data: geoNation,
          icon: FlagIcon,
          color: 'primary',
          typog: 'subtitle1',
          buttonLabel: 'Edit',
          desc:
            <React.Fragment>
              <Typography paragraph>
                The first level of your location selection.
              </Typography>
              {marketDescription}
            </React.Fragment>
          ,
        },
      ]
    },
  ]
}

DashboardGridItems.propTypes = {
  // classes: PropTypes.object.isRequired,
  onCategoryOpen: PropTypes.func.isRequired,
  onCategoryClose: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onClickInfo: PropTypes.func.isRequired,
  categoryOpen: PropTypes.bool.isRequired,
  categoryItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  bizCategory: PropTypes.string,
  geoLocal: PropTypes.string,
  geoRegion: PropTypes.string,
  geoNation: PropTypes.string,
  onClickGeoLocal: PropTypes.func.isRequired,
  onClickGeoRegion: PropTypes.func.isRequired,
  onClickGeoNation: PropTypes.func.isRequired,
};

export default withStyles(styles)(DashboardGridItems);