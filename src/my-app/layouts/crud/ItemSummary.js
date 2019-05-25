import React from 'react';
import moment from 'moment';

import HashAvatar from 'my-app/components/HashAvatar';
import {
  withStyles, Zoom, Fab, Tooltip, Icon, IconButton,
  ListItem, ListItemText, ListItemSecondaryAction,
} from '@material-ui/core';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

const DEFAULT_ACTIONABLE_ICON = 'send';
const DEFAULT_STAR_COLOR = 'secondary'; // supported colors: 'inherit', 'primary', 'secondary', 'action', 'error', 'disabled'

// getSummary = ( item, isList, index, ) => {
const ItemSummary = ({
  classes, actionable, starrable, item, side, index, selectedIndex, onClickStar, onToggle,
}) => {

  const ready1 = item;
  if(!ready1) return null;

  const { createdAt, } = item;
  // console.log('createdAt\n', createdAt);
  // console.log('starrable\n', starrable);

  const actionableIcon = ( actionable && actionable.icon ) || DEFAULT_ACTIONABLE_ICON;

  const getStarSwitch = () => {
    const { starred, } = item;
    const icon = starred ? 'star' : 'star_border';
    return (
      <Tooltip TransitionComponent={Zoom} placement="left" title="Star item">
        <IconButton onClick={() => onClickStar(index, starred,)}>
          <Icon color={DEFAULT_STAR_COLOR}>{icon}</Icon>
        </IconButton>
      </Tooltip>
    )
  }

  const getListSide = () => (
    <span>
      { starrable && getStarSwitch() }
      <Tooltip TransitionComponent={Zoom} placement="left" title="See detail">
        {
        // Not using this for two reasons:
        // 1. Does not yet provide selectedIndex to state
        // 2. Horizontal space constraint on narrow screens
        // <CRUDButtons
        //   updatable={updatable}
        //   deletable={deletable}
        //   onUpdate={handleOpenUpdateDialog}
        //   onDelete={handleOpenDeleteDialog}
        // />
        }
        <IconButton
          color="inherit"
          aria-label="More detail"
          onClick={() => onToggle( item, "list", index, )}
        >
          <Icon>more_horiz</Icon>
        </IconButton>
      </Tooltip>
    </span>
  )
  
  const getDetailSide = () => (
    <div>
      <span>{ starrable && getStarSwitch() }</span>
      <span>
        {
          actionable &&
          <Zoom in mountOnEnter unmountOnExit>
            <Tooltip TransitionComponent={Zoom} placement="left" title={actionable && actionable.label}>
              <Fab size="small" color="primary" className={classes.margin}>
                <Icon>{actionableIcon}</Icon>
              </Fab>
            </Tooltip>
          </Zoom>
        }
      </span>
    </div>
  )

  const getSecondaryAction = () => {
    // isList ? getListSide() : getDetailSide()
    switch(side) {
      case 'list':
        return getListSide();
      case 'detail':
        return getDetailSide();
      default:
        throw new Error('Missing required property: "side"');
        return null;
    }
  }
  
  return (
    <ListItem
      button
      // divider light // use <Divider /> instead
      key={createdAt}
      onClick={() => onToggle( item, side, index, )}
      selected={index && (selectedIndex === index)}
    >
      <Zoom key={index} in mountOnEnter unmountOnExit>
        <HashAvatar
          message={createdAt}
          // variant="uic" //"robohashx" //"robohash4" //"retro" //"monsterid" //"wavatar" //"adorable" //"identicon" //"mp" //"ui" //"random"(deprecated)
        />
      </Zoom>
      <ListItemText primary={item.geoLocal} secondary={moment(createdAt).fromNow()} />
      <ListItemSecondaryAction>{getSecondaryAction()}</ListItemSecondaryAction>
    </ListItem>
  )
}
 
// export default ItemSummary;
export default withStyles(styles)(ItemSummary);