import React from 'react';
// import CRUDview from 'my-app/layouts/crud/CRUDview'
// import UserMultiForm from 'my-app/components/forms/UserMultiForm';

// import ContactsApp from 'my-app/apps/contacts/ContactsApp';
import UserMultiForm from 'my-app/components/forms/UserMultiForm';

function Contacts(props) {
  // const { list, detail } = props;
  return (
    // <CRUDview
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