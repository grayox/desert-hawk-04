import React from 'react';
// import ListDetail from '../ListDetail'
// import UserMultiForm from 'my-app/components/forms/UserMultiForm';

import ContactsApp from 'my-app/apps/contacts/ContactsApp';

function Contacts(props) {
  // const { list, detail } = props;
  return (
    // <ListDetail
    //   list='Contacts left'
    //   detail={
    //     <UserMultiForm
    //       heading='Add new contact'
    //       savePath='contacts'
    //       geoStepperLabel='Contact location'
    //     />
    //   }
    // />
    <ContactsApp/>
  );
}

export default Contacts;