import React, { useState, useEffect, } from 'react';
import { CreateDialog, } from 'app/layouts/crud/ItemDialogs.js';

import { compose, } from 'redux';
import { connect, } from 'react-redux';

import {
  getFormFields, getIdHash, // app/layouts/crud/CRUDView.js
  getComponentsNavConfig, getFindNested, // app/config/ComponentRouter.js
} from 'app/config/AppConfig';

const INITIAL_STATE = {
  creatable          : null  ,
  crudForm           : null  ,
  crudFormIdHash     : null  ,
  crudFormTimestamp  : null  ,
  createDialogIsOpen : false ,
};

const CreateDialogContainer = ({ id, profile, settings, }) => { // dashboard,

  // state

  // const [ creatable          , setCreatable          , ] = useState( null  );
  // const [ crudForm           , setCrudForm           , ] = useState( null  );
  // const [ crudFormIdHash     , setCrudFormIdHash     , ] = useState( null  );
  // const [ crudFormTimestamp  , setCrudFormTimestamp  , ] = useState( null  );
  // const [ createDialogIsOpen , setCreateDialogIsOpen , ] = useState( false );

  // useEffect(() => {
  //   const r = getCreatable();
  //   setCreatable(r);
  // }, [],);

  const [ state, setState, ] = useState(INITIAL_STATE);

  useEffect( () => {
    const creatable = getCreatable();
    setState({ ...state, creatable, });
  }, [],);

  // app/layouts/crud/CRUDView.js
  const getStateOpenCreateDialog = () => {
    const crudFormTimestamp = Date.now();
    const crudFormIdHash = getIdHash( profile.uid, crudFormTimestamp, );
    const out = {
      crudFormIdHash              ,
      crudFormTimestamp           ,
      createDialogIsOpen : true   ,
      updateDialogIsOpen : false  ,
      deleteDialogIsOpen : false  ,
      actionDialogIsOpen : false  ,
    }
    // console.log('out\n', out,);
    return out;
  }

  // this: handlers: from: src/app/layouts/crud/CRUDView.js

  const handleClickCreateButton = () => this.setState(
    this.getStateOpenCreateDialog()
    // , () => console.log('state\n', this.state,)
  );

  const handleEnterDialog = () => { // type
    const TYPE = 'loadNewData'; // create only, no update
    // type: string: enum: 'loadNewData' | 'loadSavedData'
    // this.setState(
    //   { crudForm : getFormFields(type, this.props.creatable.fields, null,) }
    //   // ,() => console.log('state\n', this.state)
    // )
    // const { fields, } = creatable;
    const { fields, } = state.creatable;
    const crudForm = getFormFields( TYPE, fields, null, );
    // setCrudForm(crudForm);
    setState({ ...state, crudForm, });
  }

  const handleCloseDialog = () => {
    // this.setState({
    //   ...INITIAL_STATE_DIALOG,
    //   crudForm: null, // this.state.createFormInitialState,
    // });
    setState(INITIAL_STATE);
  };

  // props: creatable from: src/app/config/ComponentRouter.js

  const getCreatable = () => {
    const args = { profile, settings, };
    // console.log('args\n', args,);
    const componentsNavConfig = getComponentsNavConfig(args);
    // const matches = _.filter(componentsNavConfig, {id,},);
    // const item = matches[0];
    const item = getFindNested(componentsNavConfig, 'id', id,);
    const { crudConfig, } = item; // type: {component: type,}, dashboardConfig={},
    // console.log('crudConfig\n', crudConfig,);
    const { creatable, } = crudConfig;
    return creatable;
  }

  // from: src/app/layouts/crud/CRUDView.js

  const getCreateDialogContainer = () => {
    const { creatable, crudForm, crudFormIdHash, crudFormTimestamp, createDialogIsOpen, } = state;
    return (
      <CreateDialog
        // state
        crudFormIdHash={crudFormIdHash}
        crudFormTimestamp={crudFormTimestamp}
        createDialogIsOpen={createDialogIsOpen}
        crudForm={crudForm} creatable={creatable} // creatable is props in crudView
        // "this"
        onEnterDialog={handleEnterDialog} // onChangeForm={handleChangeForm}
        onCloseDialog={handleCloseDialog} // onCreateItem={handleCreateItem}
      />
    );
  }

  return getCreateDialogContainer();
}

const mapStateToProps = state => {
  const profile = state
               && state.firebase
               && state.firebase.profile;
  const settings = state
                && state.myApp
                && state.myApp.reducers
                && state.myApp.reducers.userDataReducer
                && state.myApp.reducers.userDataReducer.settings;
  // const dashboard = state
  //                && state.myApp
  //                && state.myApp.reducers
  //                && state.myApp.reducers.userDataReducer
  //                && state.myApp.reducers.userDataReducer.dashboard;
  const { dashboard, } = settings; // fold-in dashboard to subset of settings
  // console.log('profile\n', profile,);
  // console.log('settings\n', settings,);
  // console.log('dashboard\n', dashboard,); 
  return { profile, settings, dashboard, };
}

// export default ComponentRouter;
// export default CreateDialogContainer;
export default compose(
  // withStyles(styles, { withTheme: true }),  
  connect( mapStateToProps, ), // mapDispatchToProps,
)(CreateDialogContainer)