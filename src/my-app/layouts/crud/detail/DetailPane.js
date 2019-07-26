import React from 'react';
import classNames from 'classnames';

import {
  withStyles, Slide, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction,
  // Chip, Badge, Avatar,
} from '@material-ui/core';

import { FuseAnimateGroup } from '@fuse'; // FuseScrollbars, FuseAnimate,
// import _ from '@lodash';

import MediaWidth from 'my-app/layouts/MediaWidth';
import { uiSpecs, } from 'my-app/config/AppConfig'; // getCleanFieldNames,
import Dashboard from 'my-app/views/app/dashboard/Dashboard';
import SimpleExpansionPanel from 'my-app/components/SimpleExpansionPanel';
import ButtonsTierDetail from './ButtonsTierDetail'; // CRUDButtons,
import ViewEmpty from '../ViewEmpty';
import ItemSummary from '../ItemSummary';

const styles = theme => ({
  paper: {
    // temp-border
    // border: 'solid blue 4px',
    color: theme.palette.text.secondary,
  },
});

// getHeader = () => (
//   <Hidden xsDown>
//     <FuseAnimate
//       // className="px-0"
//       // key={row.name}
//       delay={200}
//       // animation="transition.slideLeftIn"
//       // enter={{ animation: 'transition.perspectiveLeft' }}
//       // leave={{ animation: 'transition.perspectiveRight' }}
//       enter={{ animation: 'transition.slideDownBigIn' }}
//       leave={{ animation: 'transition.slideLeftOut' }}
//     >
//       <AppBar
//         className="m-0"
//         position="static"
//         elevation={0}
//       >
//         <Toolbar className="px-16">
//           <Typography variant="subtitle1" color="inherit" className="flex-1">
//             Items
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     </FuseAnimate>
//   </Hidden>
// )

// getDetailListItem = ( keyName, keyIndex, item, condensed, ) =>
  
//   // Prevent React from throwing an error if the 'update' field is an object
//   (
//     // keyName === 'update'
//     // // because 'update' is constructed as object in src/my-app/layouts/crud/store/actions/item.actions.js
//     // ||
//     // Error guards against returning objects as fields
//     typeof item[keyName] === 'string'
//     ||
//     typeof item[keyName] === 'number'
//   )

//   &&

//   // skip empty fields
//   item[keyName].length
  
//   &&

//   // keyName // success
//   // `${keyName}: ${item[keyName]}` // success
//   // // success
//   // <Typography className="text-left">
//   //   {keyName}: {item[keyName]}
//   // </Typography>
//   // attempt
//   <ListItem
//     // key={keyName.createdAt}
//     key={keyIndex}
//     divider
//     // light
//     // button
//     // onClick={() => handleToggle(item)}
//   >
//     {
//     // <Avatar>
//     //   <BeachAccessIcon />
//     // </Avatar>
//     }
//     <ListItemText
//       primary={keyName}
//       secondary={ condensed ? null : item[keyName] }
//     />
//     {
//       condensed
//       ?
//       <ListItemSecondaryAction>
//         <Typography className="mr-16">{item[keyName]}</Typography>
//       </ListItemSecondaryAction>
//       :
//       null
//     }
//   </ListItem>

const DetailPane = ({
  classes, detail, condensed, itemsLength, selectedIndex, navComponentId,
  creatable, readable, updatable, deletable, actionable, starrable, dashboard, miniDashboard,
  onAction, onClickStar, onToggle, onUpdate, onDelete, onNavBack, onNavNext, getFormFields,
}) => {

  // console.log('detail\n', detail,);

  const getDetailListItem = ({ label, value, valueMask, }) => {
    const display = valueMask || value;
    return (
      // Prevent React from throwing an error if the 'update' field is an object
      (
        // field.id === 'update'
        // // because 'update' is constructed as object in src/my-app/layouts/crud/store/actions/item.actions.js
        // ||
        // Error guards against returning objects as fields
        typeof display === 'string'
        ||
        typeof display === 'number'
      )
  
      &&
  
      // skip empty fields
     display.length
  
      &&
  
      // keyName // success
      // `${keyName}: ${item[keyName]}` // success
      // // success
      // <Typography className="text-left">
      //   {keyName}: {item[keyName]}
      // </Typography>
      // attempt
      <ListItem
        // key={keyName.createdAt}
        key={label}
        divider
        // light
        // button
        // onClick={() => handleToggle(item)}
      >
        {
        // <Avatar>
        //   <BeachAccessIcon />
        // </Avatar>
        }
        <ListItemText
          primary={label}
          secondary={ condensed ? null : display }
        />
        {
          condensed
          ?
          <ListItemSecondaryAction>
            <Typography className="mr-16">{display}</Typography>
          </ListItemSecondaryAction>
          :
          null
        }
      </ListItem>
    )
  }
  
  const getDetail = () => {
    // const MAX_LENGTH = 40;
    // console.log('condensed\n', condensed);
    
    // const keys = Object.keys(item);

    // const dataFields = getForm(keys);
    // console.log('dataFields\n', dataFields);

    const ready1 = creatable && creatable.fields;
    if(!ready1) return null;

    const formFields = getFormFields('loadSavedData', creatable.fields,);
    // console.log('formFields\n', formFields);

    const getDetailListItemObject = fields => {
      // implement recursive field listings
      console.log('fields\n', fields,);

      const ready1 = fields && (typeof fields === 'object');
      console.log('ready1\n', ready1,);
      if(!ready1) return null;

      // const { value: { formFieldConfigKey: key, }, } = fields;
      const { value, } = fields;
      console.log('value\n', value,);
      const key = value && value.formFieldConfigKey; // 'zipInput'
      
      const ready2 = key;
      console.log('ready2\n', ready2,);
      if(!ready2) return null;

      // turn object into array
      const keys = Object.keys(value);
      console.log('keys\n', keys,);
      const newArray = getFormFields('loadSavedData', keys,);
      console.log('newArray\n', newArray,);
      return getFormFieldsMap(newArray)
    }
    
    const getDetailListItemString = field =>
      ( field.value && field.value.length ) > uiSpecs.maxCharsForDetailItemField // MAX_LENGTH
      ?
      <SimpleExpansionPanel key={field.label} heading={field.label} content={field.value} />
      :
      getDetailListItem(field)

    const getFormFieldsMap = formFields =>
      formFields.map( field => {
        const type = typeof field.value;
        // console.log('type\n', type,);
        // console.log('field\n', field,);
        const config = {
          string: getDetailListItemString(field),
          object: getDetailListItemObject(field),
          // object: getDetailListItemObject(field.value),
          // object: getFormFieldsMap(field.value), // recursion
        };
        return config[type];
      })
    
    return (
      // <FuseAnimate
      //   // className="px-0"
      //   // key={row.name}
      //   delay={200}
      //   // animation="transition.slideLeftIn"
      //   // enter={{ animation: 'transition.perspectiveLeft' }}
      //   // leave={{ animation: 'transition.perspectiveRight' }}
      //   enter={{ animation: 'transition.slideLeftIn' }}
      //   leave={{ animation: 'transition.slideLeftOut' }}
      // >
      <Paper className={classNames(classes.paper, "z-0",)}>
        <List className="m-0 p-0" component="nav"> {/* subheader={<ListSubheader className="text-left">Detail</ListSubheader>} */}
          <FuseAnimateGroup
            delay={500}
            enter={{ animation: "transition.slideDownBigIn" }}
            leave={{ animation: "transition.slideLeftOut" }}
          >
          {
            // keys.map((keyName, keyIndex,) =>
            //   item[keyName].length > uiSpecs.maxCharsForDetailItemField // MAX_LENGTH
            //   ?
            //   <SimpleExpansionPanel key={keyIndex} heading={keyName} content={item[keyName]} />
            //   :
            //   getDetailListItem( keyName, keyIndex, item, condensed, )
            // )
            getFormFieldsMap(formFields)
          }
          </FuseAnimateGroup>
        </List>
      </Paper>
      // </FuseAnimate>
    )
  }
    
  const getSummaryTier = () => 
    <List component="nav">
      {/* {getSummary(detail, false,)} */}
      <ItemSummary
        side="detail"
        navComponentId={navComponentId}
        item={detail}
        readable={readable}
        actionable={actionable}
        starrable={starrable}
        selectedIndex={selectedIndex}
        onAction={onAction}
        onToggle={onToggle}
        onClickStar={onClickStar}
        // index={index} // never select summary on detail side
      />
    </List>

  const getButtonsTier = () => {
    const limit = itemsLength - 2;
    // console.log('limit\n', limit,);
    // console.log('actionable\n', actionable,);
    return (
      <ButtonsTierDetail
        limit={limit} selectedIndex={selectedIndex}
        updatable={updatable} deletable={deletable} // actionable={actionable} starrable={starrable}
        onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} onNavBack={onNavBack} onNavNext={onNavNext}
      />
    );
  }

  const getDashboard = () =>
    <Paper className={classNames(classes.paper, "z-0",)}>
      <MediaWidth
        mobile={<Dashboard dashboard={dashboard} type="micro" />}
        tablet={<Dashboard dashboard={dashboard} type="mini" />}
        laptop={<Dashboard dashboard={dashboard} type="mini" />}
      />
    </Paper> 

  const getHeader = () =>
    <Paper className={classNames(classes.paper, "z-0",)}>
      {getButtonsTier()}
      {getSummaryTier()}
    </Paper>

  const getContent = () => <React.Fragment>{getHeader()}{getDetail()}</React.Fragment>
  const getViewEmpty = () => <ViewEmpty side="detail" />

  // console.log('detail\n', detail);
  return (
    <React.Fragment>
      { miniDashboard && getDashboard() }      
      <Slide // <Zoom // <Grow 
        in //={detail}
        direction="right"
        mountOnEnter
        unmountOnExit
        // timeout={3000}
      >
        { detail ? getContent() : getViewEmpty() }
      </Slide>
      {/* // </Grow> // </Zoom> // */}
    </React.Fragment>
  )

}
 
// export default DetailPane;
export default withStyles(styles)(DetailPane);