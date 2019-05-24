import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { createItem, updateItem, deleteItem, } from './store/actions';

import { updateUserData, } from 'my-app/store/actions/my-actions'; // updateSettings, updateDashboard, saveUserDataToFirestore,
import FetchUserData from 'my-app/containers/FetchUserData';

// @material-ui/core
import { withStyles, withWidth, Grid, Hidden, CssBaseline, } from '@material-ui/core';

import ListPane from './list/ListPane';
import DetailPane from './detail/DetailPane';
import ViewEmpty from './ViewEmpty';
import { CreateDialog, UpdateDialog, DeleteDialog, } from './ItemDialogs';

const styles = theme => ({
  root: {
    // height: '100%',
    // temp-border
    // border: 'solid black 4px',
    height: 'calc(100vh - 116px)',
    boxSizing: 'border-box',
    display: 'flex',
  },
  wrapper: {
    // temp-border
    // border: 'solid red 4px',
    height: '100%',
    flexGrow: 1,
    boxSizing: 'border-box',
    // overflow: 'auto',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const INITIAL_STATE_DIALOG = {
  createDialogIsOpen : false     ,
  updateDialogIsOpen : false     ,
  deleteDialogIsOpen : false     ,
  crudForm           : undefined ,
  crudFormTimestamp  : undefined ,
}

const INITIAL_STATE_DETAIL = {
  detail        : undefined ,
  selectedIndex : undefined ,
}

const INITIAL_STATE_EXPANSION = {
  panelIsExpanded : false ,
  searchField     : ''    ,
  filterField     : ''    ,
  sortField       : ''    ,
}

const INITIAL_STATE = {
  ...INITIAL_STATE_DETAIL,
  ...INITIAL_STATE_DIALOG,
  ...INITIAL_STATE_EXPANSION,
}


// function CRUDView(props) {
class CRUDView extends Component {

  state = INITIAL_STATE;

  // constructor(props) {
  //   super(props);
  //   this.state = INITIAL_STATE;
  // }

  // componentWillMount = () => {
  //   // this.setCreateFormInitialState(this.props.creatable.fields);
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.dashboard !== prevProps.dashboard) {
  //     const newDashboard = this.fetchData(this.props.userID);
  //     this.props.updateUserData('dashboard', newDashboard,);
  //   }
  // }

  handleChangeUserData = ( path, newData, ) => { // saveDataToFirestore, 
    // console.log('handleChangeUserData-path\n', path,)
    // console.log('handleChangeUserData-data\n', newData,)
    // console.log('saveDataToFirestore\n', saveDataToFirestore,)
    const { updateUserData, } = this.props; // saveUserDataToFirestore, 
    updateUserData( path, newData, ); // updates global state
    // if(saveDataToFirestore) {
    //   const dataPath = [ 'users' , uid , path , ].join('/');
    //   saveUserDataToFirestore( dataPath, newData, ); // updates firebase
    // }
  }

  handleOpenCreateDialog = () => {
    this.setState({
      createDialogIsOpen : true       ,
      updateDialogIsOpen : false      ,
      deleteDialogIsOpen : false      ,
      crudFormTimestamp  : Date.now() ,
    });
  };

  handleOpenUpdateDialog = () => {
    // console.log('detail\n', this.state.detail);
    this.setState({
      createDialogIsOpen : false ,
      updateDialogIsOpen : true  ,
      deleteDialogIsOpen : false ,
    });
  };

  handleOpenDeleteDialog = () => {
    this.setState({
      createDialogIsOpen : false ,
      updateDialogIsOpen : false ,
      deleteDialogIsOpen : true  ,
    });
  };

  // handleResetExpansionPanel = () => {
  //   // alert('You RESET the EXPANSION PANEL');
  //   // console.log('You RESET the EXPANSION PANEL');
  //   this.setState(INITIAL_STATE_EXPANSION);
  // }

  // handleResetSearchField = () => {
  //   // alert('You RESET the EXPANSION PANEL');
  //   // console.log('You RESET the EXPANSION PANEL');
  //   this.setState({
  //     searchField: '',
  //     panelIsExpanded: false,
  //   });
  // }

  // handleOpenSearch = () => {
  //   // alert('You clicked the SEARCH button');
  //   // console.log('You clicked the SEARCH button');
  //   this.setState({ panelIsExpanded: true, })
  // }
  
  // handleChangeSearchField = event => {
  //   const searchField = event.target.value;
  //   // console.log('search field\n', searchField,);
  //   this.setState({ searchField, });
  // }

  // handleOpenFilter = () => {
  //   // alert('You clicked the FILTER button');
  //   // console.log('You clicked the FILTER button');
  // }

  // handleOpenSort = () => {
  //   // alert('You clicked the SORT button');
  //   // console.log('You clicked the SORT button');
  // }

  handleChangeForm = event => {
    // console.log('target\n', event.target);
    const { id, value, } = event.target;
    // console.log('id\n', id); // 'name'
    // console.log('value\n', value); // 'john doe'
    const { crudForm, } = { ...this.state, }; // use spread syntax to create and modify a copy only
    // console.log('crudForm\n', crudForm); // 'john doe'
    const targetFieldIndex = crudForm.findIndex(field => field.id === id);
    // console.log('targetFieldIndex\n', targetFieldIndex); // 'john doe'
    crudForm[targetFieldIndex].value = value;
    this.setState({ crudForm, }
      // ,() => console.log('state\n', this.state)
    );
  }

  handleEnterDialog = type =>
    // type: string: enum: 'loadNewData' | 'loadSavedData'
    this.setState(
      { crudForm : this.getFormFields(type, this.props.creatable.fields,) }
      // ,() => console.log('state\n', this.state)
    )

  handleCloseDialog = () => {
    this.setState({
      ...INITIAL_STATE_DIALOG,
      crudForm: this.state.createFormInitialState,
    });
  };

  handleRefresh = () => this.props.onRefresh();

  handleCreateItem = e => {
    // console.log('state\n', this.state);
    const { handleCloseDialog, handleRefresh, } = this;
    const { crudForm, crudFormTimestamp, } = this.state;
    const { createItem, creatable, profile, dashboard, } = this.props;
    const { uid, } = profile;
    const { path, } = creatable;
    
    // inspired by: src/my-app/components/forms/CreateLead.js
    e.preventDefault();
    // console.log(this.state);
    // this.props.createItem('leads', crudForm,);

    const newItem = {
      createdAt: crudFormTimestamp,
    };
    crudForm.forEach(item => {
      let newVal = item.value;
      if(newVal === undefined || newVal === null) return; // newVal = null; //
      newItem[item.id] = newVal;
    });

    // console.log('path\n', path,)
    // console.log('newItem\n', newItem,)
    // console.log('profile\n', profile,)
    // console.log('uid\n', uid,)
    // console.log('dashboard\n', dashboard,)
    createItem( path, newItem, uid, dashboard, );
    // this.props.history.push('/');

    handleCloseDialog();
    handleRefresh();
  }
  
  handleUpdateItem = () => {
    // console.log('state\n', this.state);
    // console.log('props\n', this.props);
    const { handleCloseDialog, handleRefresh, } = this;
    const { detail, crudForm, } = this.state; // selectedIndex,
    const { readable, updateItem, } = this.props; // items, profile,
    // const { uid, } = profile;
    // console.log('selectedIndex', selectedIndex,);
    // console.log('selectedItem', items[selectedIndex],);
    // const item = items[selectedIndex];
    // const docId = item.docId;
    const docId = detail.docId;
    // console.log('docId', docId,);

    const newItem = {};
    crudForm.forEach(item => {
      let newVal = item.value;
      if(newVal === undefined || newVal === null) return; // newVal = null; //
      newItem[item.id] = newVal;
    });

    // old item: detail
    // new item: crudForm => newItem
    updateItem( readable, docId, newItem, detail, ); // note: readable is the path // uid,
    handleCloseDialog();
    handleRefresh();
  }

  handleDeleteItem = () => {
    // console.log('state\n', this.state);
    // console.log('props\n', this.props);
    const { handleCloseDialog, handleRefresh, } = this;
    const { selectedIndex, } = this.state;
    const { items, readable, deleteItem, profile, dashboard, } = this.props;
    const { uid, } = profile;
    // console.log('selectedIndex', selectedIndex,);
    // console.log('selectedItem', items[selectedIndex],);
    const item = items[selectedIndex];
    const docId = item.docId;
    // console.log('docId', docId,);
    deleteItem( readable, docId, uid, dashboard, ); // readable is the path
    handleCloseDialog();
    handleRefresh();
  }

  handleListItemClick = ( event, index, ) => {
    this.setState({ selectedIndex: index });
  };

  handleNavBack = () => {
    const { items, } = this.props;
    const { selectedIndex, } = this.state;
    const newSelectedIndex = selectedIndex - 1;
    this.setState({
      selectedIndex: Math.max(0, newSelectedIndex,),
      detail: items[newSelectedIndex],
    });
  };
  
  handleNavNext = () => {
    const { items, } = this.props;
    const { selectedIndex, } = this.state;
    const limit = items.length - 1;
    const newSelectedIndex = selectedIndex + 1;
    this.setState({
      selectedIndex: Math.min(limit, newSelectedIndex),
      detail: items[newSelectedIndex],
    });
  };

  handleToggle = ( model, isList, index, ) => {
    // console.log('model\n', model);
    // const { detail } = this.state;
    this.setState({
      ...INITIAL_STATE_DETAIL,
    }
      // promise completes animation effect
      ,() => {if(isList) this.setState({
        detail: model,
        selectedIndex: index,
      })}
    );
  }

  render() {
    const { classes, items, profile, creatable, } = this.props;
    const { uid, } = profile;
    const { detail, deleteDialogIsOpen, } = this.state;
    const {
      handleCloseDialog, handleDeleteItem, handleChangeUserData, handleOpenCreateDialog,
    } = this;

    const getFetchUserData = () => <FetchUserData path="dashboard" uid={uid} onChange={handleChangeUserData} />
    const getViewEmpty = () => <ViewEmpty side="list" onClick={handleOpenCreateDialog} creatable={creatable}/>
    
    const getCreateDialog = () => <CreateDialog /> 
    const getUpdateDialog = () => <UpdateDialog />  
    const getDeleteDialog = () =>
      <DeleteDialog
        isOpen={deleteDialogIsOpen}
        onCancel={handleCloseDialog}
        onDelete={handleDeleteItem}
        onClose={handleCloseDialog}
      />

    const getListPane = () => <ListPane />
    const getDetailPane = () => <DetailPane />    

    const getMobileContent = () => detail ? getDetailPane() : getListPane()
    const getLaptopContent = () =>
      <div className={classNames(classes.root,)}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>{getListPane()}</Grid>
          <Grid item xs={6}>{getDetailPane()}</Grid>
        </Grid>
      </div>
    
    const getMainContent = () => (
      <React.Fragment>
        {/* <CssBaseline/> */}
        { getFetchUserData() } {/* to update the dashboard after a CRUD task */}
        { getCreateDialog() }        
        { getUpdateDialog() }
        { getDeleteDialog() }
        <div className={classes.wrapper}>
          <Hidden smUp>{getMobileContent()}</Hidden>   {/* mobile */}
          <Hidden xsDown>{getLaptopContent()}</Hidden> {/* laptop */}
        </div>
      </React.Fragment>
    )

    return (
      // <FuseScrollbars className="overflow-auto">
      <div className={classes.root}>{( items && items.length ) ? getMainContent() : getViewEmpty() }</div>   
      // </FuseScrollbars>
    );
  }

}

CRUDView.propTypes = {
  createItem: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,

  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,

  condensed: PropTypes.bool, // one-line per list item in detail pane
  
  starrable: PropTypes.bool,
  searchable: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  sortable: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  filterable: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),

  actionable: PropTypes.object,
  creatable: PropTypes.oneOfType([ // create button in list pane
    PropTypes.object,
    PropTypes.bool,
  ]),
  readable: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  updatable: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  deletable: PropTypes.bool,
};

CRUDView.defaultProps = {
  condensed: false,
  searchable: false,
  sortable: false,
  filterable: false,
  // actionable: false,
  creatable: false,
  // readable: false,
  updatable: false,
  deletable: false,
};

const mapStateToProps = state => {
  const profile = state
    && state.firebase
    && state.firebase.profile;
  const dashboard = state
    && state.myApp
    && state.myApp.reducers
    && state.myApp.reducers.userDataReducer
    && state.myApp.reducers.userDataReducer.dashboard;
  return { profile, dashboard, };
}

const mapDispatchToProps = dispatch => ({
  createItem: ( path , item  , uid     , dashboard , ) => dispatch(createItem( path , item  , uid     , dashboard , )), // inspired by: src/my-app/components/forms/CreateLead.js
  updateItem: ( path , docId , newItem , oldItem   , ) => dispatch(updateItem( path , docId , newItem , oldItem   , )),
  deleteItem: ( path , docId , uid     , dashboard , ) => dispatch(deleteItem( path , docId , uid     , dashboard , )),
  // update dashboard
  updateUserData: (path, newData,) => dispatch(updateUserData(path, newData,)),
})

// export default CRUDView;
// export default withStyles(styles)(CRUDView);
export default compose(
  withStyles(styles),
  withWidth(),
  connect( mapStateToProps, mapDispatchToProps, ),
)(CRUDView);