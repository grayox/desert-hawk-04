import React, { Component, } from 'react';
import PropTypes from 'prop-types';

import compose from 'recompose/compose';
import { connect, } from 'react-redux';
import { createItem, updateItem, deleteItem, actionItem, } from './store/actions';

import { updateUserData, } from 'my-app/store/actions/my-actions'; // updateSettings, updateDashboard, saveUserDataToFirestore,
import FetchUserData from 'my-app/containers/FetchUserData';

// @material-ui/core
import { withStyles, withWidth, Grid, } from '@material-ui/core';

import { getForm, getIdHash, } from 'my-app/config/AppConfig'; // getSearchableFields, getItemsFilteredBySearch,
import MediaWidth from 'my-app/layouts/MediaWidth';
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
    // height: '100%',
    // maxHeight: '100%',
    height: 'calc(100vh - 116px - 48px)',
    flexGrow: 1, // extends content to right edge of viewport
    boxSizing: 'border-box',
    // overflow: 'auto',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const STATE_OPEN_UPDATE_DIALOG = {
  createDialogIsOpen : false ,
  updateDialogIsOpen : true  ,
  deleteDialogIsOpen : false ,
}

const STATE_OPEN_DELETE_DIALOG = {
  createDialogIsOpen : false ,
  updateDialogIsOpen : false ,
  deleteDialogIsOpen : true  ,
}

const INITIAL_STATE_DIALOG = {
  createDialogIsOpen : false     ,
  updateDialogIsOpen : false     ,
  deleteDialogIsOpen : false     ,
  crudForm           : undefined ,
  crudFormIdHash     : undefined ,
  crudFormTimestamp  : undefined ,
}

const INITIAL_STATE_DETAIL = {
  detail        : undefined ,
  selectedIndex : undefined ,
}

const INITIAL_STATE = {
  ...INITIAL_STATE_DETAIL,
  ...INITIAL_STATE_DIALOG,
}

class CRUDView extends Component {

  state = INITIAL_STATE;

  // constructor(props) {
  //   super(props);
  //   this.state = INITIAL_STATE;
  // }

  // componentWillMount = () => {
  //   // this.setCreateFormInitialState(this.props.creatable.fields);
  // }

  // componentDidMount = () => {
  //   this.getInitialItemsFromProps();
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.dashboard !== prevProps.dashboard) {
  //     const newDashboard = this.fetchData(this.props.userID);
  //     this.props.updateUserData('dashboard', newDashboard,);
  //   }
  // }

  // getInitialItemsFromProps = () => this.setState({items: this.props.items,})

  getStateOpenCreateDialog = () => {
    const crudFormTimestamp = Date.now();
    const crudFormIdHash = getIdHash(this.props.profile.uid, crudFormTimestamp,);
    const out = {
      crudFormIdHash              ,
      crudFormTimestamp           ,
      createDialogIsOpen : true   ,
      updateDialogIsOpen : false  ,
      deleteDialogIsOpen : false  ,
    }
    // console.log('out\n', out,);
    return out;
  }

  getFormFields = ( type, fields, ) => {
    // type: string: enum: 'loadSavedData' | 'loadNewData'
    // fields: arrayOFStrings: example: ['name*', 'phone*', 'email*', 'zip*', 'notes', ]
    // console.log('type\n', type);
    // console.log('fields\n', fields);
    // console.log('state\n', this.state);

    const ready = fields && typeof fields === 'object';
    if(!ready) return;

    const { detail, } = this.state;
    // console.log('updateDialogIsOpen\n', updateDialogIsOpen);
    // console.log('detail\n', detail);
    const formFields = getForm(fields);
    // console.log('formFields\n', formFields); // debugger;
    formFields.forEach( field => {
      switch(type) {
        case 'loadNewData':
          field.value = '';
          break;
        case 'loadSavedData':
          field.value = detail && detail[field.id];
          break;
        default:
          // throw new Error('Type must be one of: "loadSavedData" or "loadNewData"');
          console.error('Type must be one of: "loadSavedData" or "loadNewData"');
      }
      // console.log(`field: ${field.id}\n`, field);
    });
    // console.log('formFields\n', formFields);
    // console.log('state\n', this.state);
    return formFields;
  }

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

  handleOpenUpdateDialog  = () => this.setState({ ...STATE_OPEN_UPDATE_DIALOG, });
  handleOpenDeleteDialog  = () => this.setState({ ...STATE_OPEN_DELETE_DIALOG, });
  handleClickCreateButton = () => this.setState(
    this.getStateOpenCreateDialog()
    // , () => console.log('state\n', this.state,)
  );
 
  handleChangeForm = event => {
    // console.log('target\n', event.target);
    const { id, value, } = event.target;
    // console.log('id\n', id); // 'name'
    // console.log('value\n', value); // 'john doe'
    const { crudForm, } = { ...this.state, }; // use spread syntax to create and modify a copy only
    // console.log('crudForm\n', crudForm); // 'john doe'
    const targetFieldIndex = crudForm.findIndex( field => field.id === id);
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
      crudForm: null, // this.state.createFormInitialState,
    });
  };

  handleRefresh = () => this.props.onRefresh();

  handleCreateItem = e => {
    // console.log('state\n', this.state);
    const { handleCloseDialog, handleRefresh, } = this;
    const { crudForm, crudFormTimestamp, crudFormIdHash, } = this.state;
    const { createItem, creatable, profile, dashboard, } = this.props; // settings,
    const { uid, } = profile;
    const { path, } = creatable;
    
    // inspired by: src/my-app/components/forms/CreateLead.js
    e.preventDefault();
    // console.log(this.state);
    // this.props.createItem('leads', crudForm,);

    const newItem = {
      idHash: crudFormIdHash,
      createdAt: crudFormTimestamp,
    };
    crudForm.forEach( item => {
      let newVal = item.value;
      if(newVal === undefined || newVal === null) return; // newVal = null; //
      newItem[item.id] = newVal;
    });

    // console.log('path\n', path,)
    // console.log('newItem\n', newItem,)
    // console.log('profile\n', profile,)
    // console.log('uid\n', uid,)
    // console.log('dashboard\n', dashboard,)
    createItem( path, newItem, uid, dashboard, creatable, ); // settings,
    // this.props.history.push('/');

    handleCloseDialog();
    handleRefresh();
  }
  
  handleUpdateItem = () => {
    // console.log('state\n', this.state);
    // console.log('props\n', this.props);
    const { handleCloseDialog, handleRefresh, } = this;
    const { detail, crudForm, } = this.state; // selectedIndex,
    const { readable, updatable, updateItem, } = this.props; // items, profile, // settings,
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
    updateItem( readable, docId, newItem, detail, updatable, ); // note: readable is the path // uid, // settings,
    handleCloseDialog();
    handleRefresh();
  }

  handleDeleteItem = () => {
    // console.log('state\n', this.state);
    // console.log('props\n', this.props);
    const { handleCloseDialog, handleRefresh, } = this;
    const { selectedIndex, } = this.state;
    const { items, readable, deletable, deleteItem, profile, dashboard, } = this.props; // settings,
    const { uid, } = profile;
    // console.log('selectedIndex', selectedIndex,);
    // console.log('selectedItem', items[selectedIndex],);
    const item = items[selectedIndex];
    const docId = item.docId;
    // console.log('docId', docId,);
    deleteItem( readable, docId, uid, dashboard, deletable, ); // readable is the path // settings,
    handleCloseDialog();
    handleRefresh();
  }

  handleListItemClick = ( event, selectedIndex, ) => {
    this.setState({ selectedIndex, });
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
    const BUFFER = 1;
    const { items, } = this.props;
    const { selectedIndex, } = this.state;
    const limit = items.length - 1;
    const newSelectedIndex = selectedIndex + 1;
    this.setState({
      selectedIndex: Math.min(limit, newSelectedIndex),
      detail: items[newSelectedIndex],
    });
    // fetch more data if we hit the last item
    if(newSelectedIndex === (limit - BUFFER)) this.props.onNext();
  };

  handleClickAction = e => {
    // alert('You clicked me!');
    // console.log('state\n', this.state);
    const { handleCloseDialog, handleRefresh, } = this;
    const { crudForm, crudFormTimestamp, crudFormIdHash, } = this.state;
    const { creatable, actionable, profile, dashboard, } = this.props; // settings, createItem, 
    const { uid, } = profile;
    const { path, } = creatable;
    
    // inspired by: src/my-app/components/forms/CreateLead.js
    e.preventDefault();
    // console.log(this.state);
    // this.props.createItem('leads', crudForm,);

    const newItem = {
      idHash: crudFormIdHash,
      createdAt: crudFormTimestamp,
    };
    crudForm.forEach( item => {
      let newVal = item.value;
      if(newVal === undefined || newVal === null) return; // newVal = null; //
      newItem[item.id] = newVal;
    });

    // console.log('path\n', path,)
    // console.log('newItem\n', newItem,)
    // console.log('profile\n', profile,)
    // console.log('uid\n', uid,)
    // console.log('dashboard\n', dashboard,)
    actionItem( path, newItem, uid, dashboard, actionable, ); // settings,
    // this.props.history.push('/');

    handleCloseDialog();
    handleRefresh();
  }

  handleToggle = ( detail, side, selectedIndex, ) => {
    // console.log('model\n', model);
    // const { detail } = this.state;
    const isList = (side === 'list');
    this.setState({ ...INITIAL_STATE_DETAIL, }
      // promise completes animation effect
      ,() => { if(isList) this.setState({ detail, selectedIndex, }) }
    );
  }

  handleClickStar = ( index, starred, ) => {
    console.log('index\n', index,);
    console.log('starred\n', starred,);
    // consider array membership
    // ref: https://firebase.google.com/docs/firestore/query-data/queries#array_membership
  }

  render() {
    const {
      detail, deleteDialogIsOpen, selectedIndex,
      createDialogIsOpen, updateDialogIsOpen,
      crudForm, crudFormTimestamp, crudFormIdHash,
    } = this.state;
    const {
      classes, profile, items, condensed, onNext, hasMore, dashboard, miniDashboard,
      creatable, updatable, deletable, actionable, searchable, sortable, filterable, starrable,
      searchMenuOptions, filterMenuOptions, sortMenuOptions, searchFilterSortModelWithLabels,
      onSearchFilterSort, onResetSearchFilterSort,
    } = this.props;
    const {
      handleCloseDialog, handleDeleteItem, handleChangeUserData,
      handleClickCreateButton, handleClickAction, handleClickStar, handleToggle,
      handleOpenUpdateDialog, handleOpenDeleteDialog, handleNavBack, handleNavNext, getFormFields,
      handleEnterDialog, handleChangeForm, handleCreateItem, handleUpdateItem,
    } = this;

    const ready1 = !!profile;
    if(!ready1) return null;

    const { uid, } = profile;

    // console.log('props\n', this.props,);
    // console.log('state\n', this.state,);
    // console.log('items\n', items,);
    // console.log('detail\n', detail,);
    // console.log('miniDashboard\n', miniDashboard,);
    
    const getFetchUserData = () => <FetchUserData path="dashboard" uid={uid} onChange={handleChangeUserData} />
    const getViewEmpty = () =>
      <React.Fragment>
        { getCreateDialog() }
        <ViewEmpty
          side="list" onClick={handleClickCreateButton} creatable={creatable}
          searchFilterSortModelWithLabels={searchFilterSortModelWithLabels}
          onResetSearchFilterSort={onResetSearchFilterSort}
        />
      </React.Fragment>
    
    const getCreateDialog = () =>
      <CreateDialog
        crudForm={crudForm} crudFormTimestamp={crudFormTimestamp} crudFormIdHash={crudFormIdHash}
        creatable={creatable} createDialogIsOpen={createDialogIsOpen}
        onEnterDialog={handleEnterDialog} onChangeForm={handleChangeForm}
        onCloseDialog={handleCloseDialog} onCreateItem={handleCreateItem}
      /> 
    const getUpdateDialog = () =>
      <UpdateDialog
        detail={detail} crudForm={crudForm} 
        updatable={updatable} updateDialogIsOpen={updateDialogIsOpen}
        onChangeForm={handleChangeForm} onCloseDialog={handleCloseDialog}
        onUpdateItem={handleUpdateItem} onEnterDialog={handleEnterDialog}
      />  
    const getDeleteDialog = () =>
      <DeleteDialog
        isOpen={deleteDialogIsOpen} onCancel={handleCloseDialog}
        onDelete={handleDeleteItem} onClose={handleCloseDialog}
      />

    const getListPane = () =>
      <ListPane
        items={items}
        selectedIndex={selectedIndex}
        hasMore={hasMore}
        
        creatable={creatable}
        searchable={searchable}
        filterable={filterable}
        sortable={sortable}
        starrable={starrable}

        searchMenuOptions={searchMenuOptions}
        filterMenuOptions={filterMenuOptions}
        sortMenuOptions={sortMenuOptions}
        // for initial state after re-render following data fetch...
        searchFilterSortModelWithLabels={searchFilterSortModelWithLabels}

        onNext={onNext}
        onClickStar={handleClickStar}
        onToggle={handleToggle}

        onClickCreateButton={handleClickCreateButton}
        onSearchFilterSort={onSearchFilterSort}
      />
    const getDetailPane = () =>
      <DetailPane
        detail={detail}
        condensed={condensed}
        itemsLength={items.length}
        selectedIndex={selectedIndex}
        creatable={creatable}
        updatable={updatable}
        deletable={deletable}
        actionable={actionable}
        starrable={starrable}
        miniDashboard={miniDashboard}
        dashboard={dashboard}
        onClickAction={handleClickAction}
        onClickStar={handleClickStar}
        onToggle={handleToggle}
        onUpdate={handleOpenUpdateDialog}
        onDelete={handleOpenDeleteDialog}
        onNavBack={handleNavBack}
        onNavNext={handleNavNext}
        getFormFields={getFormFields}
        // index={index} // never select summary on detail side
      />    

    const getMobileContent = () => detail ? getDetailPane() : getListPane()
    const getTabletContent = () => getMobileContent()
    const getLaptopContent = () =>
      <Grid container spacing={16}>
        <Grid item xs={6}>{getListPane()}</Grid>
        <Grid item xs={6}>{getDetailPane()}</Grid>
      </Grid>
    
    const getMainContent = () => (
      <React.Fragment>
        { getFetchUserData() } {/* updates dashboard after CRUD task */}
        { getCreateDialog()  }
        { getUpdateDialog()  }
        { getDeleteDialog()  }
        <div className={classes.wrapper}>
          <MediaWidth
            mobile={getMobileContent()}
            tablet={getTabletContent()}
            laptop={getLaptopContent()}
          />
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
  
  miniDashboard: PropTypes.array,
  starrable: PropTypes.bool,
  searchable: PropTypes.oneOfType([
    PropTypes.array,
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

  actionable: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
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
  starrable: false,
  miniDashboard: [],
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
  // const settings = state
  //   && state.myApp
  //   && state.myApp.reducers
  //   && state.myApp.reducers.userDataReducer
  //   && state.myApp.reducers.userDataReducer.settings;
  return { profile, dashboard, }; // settings, 
}

const mapDispatchToProps = dispatch => ({
  // CRUD item
  createItem: ( path , item  , uid     , dashboard , creatable  , ) => dispatch(createItem( path , item  , uid     , dashboard , creatable  , )), // inspired by: src/my-app/components/forms/CreateLead.js
  updateItem: ( path , docId , newItem , oldItem   , updatable  , ) => dispatch(updateItem( path , docId , newItem , oldItem   , updatable  , )),
  deleteItem: ( path , docId , uid     , dashboard , creatable  , ) => dispatch(deleteItem( path , docId , uid     , dashboard , creatable  , )),
  actionItem: ( path , docId , uid     , dashboard , actionable , ) => dispatch(actionItem( path , docId , uid     , dashboard , actionable , )),
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