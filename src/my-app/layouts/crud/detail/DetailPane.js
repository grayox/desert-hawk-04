import React from 'react';
import classNames from 'classnames';

import {
  withStyles, Slide, Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction,
} from '@material-ui/core';

import { FuseAnimateGroup } from '@fuse'; // FuseScrollbars, FuseAnimate,

import { uiSpecs, } from 'my-app/config/AppConfig'; // getCleanFieldNames,
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

const getDetailListItem = ( label, value, condensed, ) => (

    // Prevent React from throwing an error if the 'update' field is an object
    (
      // field.id === 'update'
      // // because 'update' is constructed as object in src/my-app/layouts/crud/store/actions/item.actions.js
      // ||
      // Error guards against returning objects as fields
      typeof value === 'string'
      ||
      typeof value === 'number'
    )

    &&

    // skip empty fields
    value.length

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
        secondary={ condensed ? null : value }
      />
      {
        condensed
        ?
        <ListItemSecondaryAction>
          <Typography className="mr-16">{value}</Typography>
        </ListItemSecondaryAction>
        :
        null
      }
    </ListItem>
  )

const getDetail = ({ classes, condensed, creatable, getDetailListItem, }) => {
  // const MAX_LENGTH = 40;
  // console.log('condensed\n', condensed);
  
  // const keys = Object.keys(item);

  // const dataFields = getForm(keys);
  // console.log('dataFields\n', dataFields);

  const ready1 = creatable && creatable.fields;
  if(!ready1) return null;

  const formFields = this.getFormFields('loadSavedData', creatable.fields,);
  // console.log('formFields\n', formFields);
  
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
            formFields.map( field =>
              field.value.length > uiSpecs.maxCharsForDetailItemField // MAX_LENGTH
              ?
              <SimpleExpansionPanel key={field.label} heading={field.label} content={field.value} />
              :
              getDetailListItem( field.label, field.value, condensed, )
            )
          }
          </FuseAnimateGroup>
        </List>
      </Paper>
    // </FuseAnimate>
  )
}

const DetailPane = ({
  classes, detail, itemsLength, selectedIndex, updatable, deletable, actionable, starrable,
  onClickStar, onToggle, onUpdate, onDelete, onNavBack, onNavNext,
}) => {

  // console.log('detail\n', detail,);

  const getButtonsTier = () => {
    const limit = itemsLength - 2;
    // console.log('limit\n', limit,);
    return (
      <ButtonsTierDetail
        limit={limit} selectedIndex={selectedIndex}
        actionable={actionable} starrable={starrable} updatable={updatable} deletable={deletable}
        onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} onNavBack={onNavBack} onNavNext={onNavNext}
      />
    );
  }

  const getHeader = () =>
    <Paper className={classNames(classes.paper, "z-0",)}>
      {getButtonsTier()}
      <List component="nav">
        {/* {getSummary(detail, false,)} */}
        <ItemSummary
          side="detail"
          item={detail}
          actionable={actionable}
          starrable={starrable}
          selectedIndex={selectedIndex}
          onToggle={onToggle}
          onClickStar={onClickStar}
          // index={index} // never select summary on detail side
        />
      </List>
    </Paper>

  const getContent = () =>
    <React.Fragment>
      {getHeader()}
      {getDetail(detail)}
    </React.Fragment>

  // console.log('detail\n', detail);
  return (
    <Slide // <Zoom // <Grow 
      in //={detail}
      direction="right"
      mountOnEnter
      unmountOnExit
      // timeout={3000}
    >
      { detail ? getContent() : <ViewEmpty side="detail" /> }
    </Slide> //</Grow> // </Zoom> // 
  )

}
 
// export default DetailPane;
export default withStyles(styles)(DetailPane);