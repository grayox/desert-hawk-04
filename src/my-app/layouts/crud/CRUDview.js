import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { createItem, updateItem, deleteItem, } from './store/actions';

import { updateUserData, } from 'my-app/store/actions/my-actions'; // updateSettings, updateDashboard, saveUserDataToFirestore,
import FetchUserData from 'my-app/containers/FetchUserData';

// @material-ui/core
import { withStyles, withWidth, Grid, Hidden, } from '@material-ui/core'; // CssBaseline, 
import _ from '@lodash';

import { getForm, } from 'my-app/config/AppConfig';
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

const STATE_OPEN_CREATE_DIALOG = {
  createDialogIsOpen : true       ,
  updateDialogIsOpen : false      ,
  deleteDialogIsOpen : false      ,
  crudFormTimestamp  : Date.now() ,
}

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
  crudFormTimestamp  : undefined ,
}

const INITIAL_STATE_DETAIL = {
  detail        : undefined ,
  selectedIndex : undefined ,
}

const INITIAL_STATE_BUTTONS_TIER_LIST = {
  filterOptions         : [ 'Filter by', 'All', 'Starred', 'Unstarred', 'Challenged', 'Pending', 'Resolved', 'Won', 'Lost', ], // [ 'foo' , 'bar'   , 'baz'  , ] ,
  sortOptions           : [ 'Sort by', 'Date', 'Price', 'Margin', ],
  searchString          : ''   ,
  filterBy              : []   ,
  sortBy                : ''   ,
  sortOrderIsDescending : true ,
}

const INITIAL_STATE = {
  ...INITIAL_STATE_DETAIL,
  ...INITIAL_STATE_DIALOG,
  ...INITIAL_STATE_BUTTONS_TIER_LIST,
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
  handleClickCreateButton = () => this.setState({ ...STATE_OPEN_CREATE_DIALOG, });

  // begin buttons tier list

  handleChangeSearchString = event => {
    const searchString = event && event.target && event.target.value;
    this.setState({ searchString, });
  }

  handleClickSearchButton = () => {
    const { searchField, } = this.state;
    console.log('searchField\n', searchField,);
  }

  // handleClickFilterButton = () => {
  //   alert('You clicked the FILTER button');
  //   console.log('You clicked the FILTER button');
  // }

  // handleClickSortButton = () => {
  //   alert('You clicked the SORT button');
  //   console.log('You clicked the SORT button');
  // }

  handleMenuItemClick = ({ variant, selectedIndex, selectedString, }) => {
    switch(variant) {
      case 'filter':
        // fetch existing array
        let filterArray = [ ...this.state.filterBy, ];
        // first check for duplicates, then push
        if(filterArray.indexOf(selectedString) < 0) filterArray.push(selectedString);
        this.setState({ filterBy: filterArray, }
          // , () => // apply where filters, then re-fetch data
        );
        break;
      case 'sort':
        this.setState({ sortBy: selectedString, });
        break;
      default:
        // code block
    }
  }
  
  handleToggleSortOrder = () => {
    this.setState({sortOrderIsDescending: !this.state.sortOrderIsDescending});
  }
  
  handleDeleteShield = ( item, selectedIndex, ) => {
    // get id of clicked shield
    console.log('item\n', item,);
    console.log('selectedIndex\n', selectedIndex,);
    const { type, value, } = item;
    switch(type) {
      case 'filter':
        // fetch existing array
        let filterArray = [ ...this.state.filterBy, ];
        _.pull( filterArray, value, );
        this.setState({ filterBy: filterArray, }
          // , () => // apply where filters, then re-fetch data
        );
        break;
      case 'sort':
        this.setState({ sortBy: '', });
        break;
      default:
        // code block
    }
  }

  handleResetButtonsTierList = () => this.setState({ ...INITIAL_STATE_BUTTONS_TIER_LIST, });
  
  // end buttons tier list

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
      detail, deleteDialogIsOpen, selectedIndex, filterOptions, sortOptions,
      searchString, filterBy, sortBy, sortOrderIsDescending,
    } = this.state;
    const {
      classes, items, profile, condensed, onNext, hasMore,
      creatable, updatable, deletable, actionable, searchable, sortable, filterable, starrable,
    } = this.props;
    const {
      handleCloseDialog, handleDeleteItem, handleChangeUserData,
      handleClickStar, handleToggle,
      handleOpenUpdateDialog, handleOpenDeleteDialog, handleNavBack, handleNavNext, getFormFields,

      // list pane
      handleClickCreateButton, handleChangeSearchString, handleClickSearchButton, // handleClickFilterButton, handleClickSortButton, 
      handleMenuItemClick, handleToggleSortOrder, handleDeleteShield, handleResetButtonsTierList,
    } = this;

    const ready1 = !!profile;
    if(!ready1) return null;

    const { uid, } = profile;

    // console.log('items\n', items,);
    // console.log('detail\n', detail,);
    
    const getFetchUserData = () => <FetchUserData path="dashboard" uid={uid} onChange={handleChangeUserData} />
    const getViewEmpty = () => <ViewEmpty side="list" onClick={handleClickCreateButton} creatable={creatable} />
    
    const getCreateDialog = () => <CreateDialog /> 
    const getUpdateDialog = () => <UpdateDialog />  
    const getDeleteDialog = () =>
      <DeleteDialog
        isOpen={deleteDialogIsOpen}
        onCancel={handleCloseDialog}
        onDelete={handleDeleteItem}
        onClose={handleCloseDialog}
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

        filterOptions={filterOptions}
        sortOptions={sortOptions}
        searchString={searchString}
        filterBy={filterBy}
        sortBy={sortBy}
        sortOrderIsDescending={sortOrderIsDescending}

        onNext={onNext}
        onClickStar={handleClickStar}
        onToggle={handleToggle}

        onClickCreateButton={handleClickCreateButton} 
        onChangeSearchString={handleChangeSearchString}
        onClickSearchButton={handleClickSearchButton}
        // onClickFilterButton={handleClickFilterButton}
        // onClickSortButton={handleClickSortButton}
        onMenuItemClick={handleMenuItemClick}
        onToggleSortOrder={handleToggleSortOrder}
        onDeleteShield={handleDeleteShield}
        onResetButtonsTierList={handleResetButtonsTierList}
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
        { getCreateDialog()  }        
        { getUpdateDialog()  }
        { getDeleteDialog()  }
        <div className={classes.wrapper}>
          <Hidden smUp   >{ getMobileContent() }</Hidden> {/* mobile */}
          <Hidden xsDown >{ getLaptopContent() }</Hidden> {/* laptop */}
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