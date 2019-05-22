// inspired by https://material-ui.com/demos/buttons/#icon-buttons

import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { Icon, IconButton, Tooltip, Zoom, } from '@material-ui/core';

const ButtonsRowDetail = ({ limit, selectedIndex, deletable, updatable, onToggle, onDelete, onUpdate, onNavBack, onNavNext, }) => (
  <div className="flex mx-8">
    <Tooltip TransitionComponent={Zoom} title="Previous">
      <span className="flex-1 text-center mt-8">
        <IconButton onClick={onNavBack} disabled={selectedIndex === 0}>
          <Icon>arrow_back_ios</Icon>
        </IconButton>
      </span>
    </Tooltip>
    {
    deletable &&
    <Tooltip TransitionComponent={Zoom} title="Delete...">
      <span className="flex-1 text-center mt-8">
        <IconButton onClick={onDelete}>
          <Icon>delete</Icon>
        </IconButton>
      </span>
    </Tooltip>
    }
    <Tooltip TransitionComponent={Zoom} title="Clear">
      <span className="flex-1 text-center mt-8">
        <IconButton onClick={onToggle}>
          <Icon>clear</Icon>
        </IconButton>
      </span>
    </Tooltip>
    {
    updatable &&
    <Tooltip TransitionComponent={Zoom} title="Edit">
      <span className="flex-1 text-center mt-8">
        <IconButton onClick={onUpdate}>
          <Icon>edit</Icon>
        </IconButton>
      </span>
    </Tooltip>
    }
    <Tooltip TransitionComponent={Zoom} title="Next">
      <span className="flex-1 text-center mt-8">
        <IconButton onClick={onNavNext} disabled={selectedIndex > limit}>
          <Icon>arrow_forward_ios</Icon>
        </IconButton>
      </span>
    </Tooltip>
  </div>
);

ButtonsRowDetail.propTypes = {
  updatable: PropTypes.bool,
  deletable: PropTypes.bool,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  // limit, selectedIndex, deletable, updatable, onToggle, onNavBack, onNavNext,
};

ButtonsRowDetail.defaultProps = {
  deletable: false,
  updatable: false,
};
 
export default ButtonsRowDetail;