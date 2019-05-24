


  // setCreateFormInitialState = fields => {
  //   const detail = this.state;

  //   const ready = this.props.creatable;
  //   if(!ready) return;

  //   // console.log('fields\n', fields); // some contain '*'
  //   // console.log('detail\n', detail); // some contain '*'
    
  //   const arrayOfFieldNames = getCleanFieldNames(fields);
  //   // const crudForm = { arrayOfFieldNames, };
  //   const crudForm = {};
  //   arrayOfFieldNames.forEach(field => crudForm[field] = (detail && detail[field]) || '');
  //   // fields.forEach(field => crudForm[field] = '');
  //   this.setState({
  //     crudForm,
  //     createFormInitialState: crudForm,
  //   }
  //     // ,() => console.log('state\n', this.state)
  //   );
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
    formFields.forEach(field => {
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