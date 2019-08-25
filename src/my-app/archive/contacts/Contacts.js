import React from 'react';
// import CRUDView from 'my-app/layouts/crud/CRUDView'
// import UserMultiForm from 'my-app/components/forms/UserMultiForm';

// import ContactsApp from 'my-app/apps/contacts/ContactsApp';
import UserMultiForm from 'my-app/components/forms/UserMultiForm';

function Contacts(props) {
  // const { list, detail } = props;
  return (
    // <CRUDView
    //   list='Contacts left'
    //   detail={
    //     <UserMultiForm
    //       heading='Add new contact'
    //       savePath='contacts'
    //       geoStepperLabel='Contact location'
    //     />
    //   }
    // />

    // <ContactsApp/>

    <UserMultiForm />
  );
}

export default Contacts;