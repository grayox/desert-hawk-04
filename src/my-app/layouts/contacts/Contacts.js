import React from 'react';
// import SplitScreen from '../SplitScreen'
// import UserMultiForm from 'my-app/components/forms/UserMultiForm';

import ContactsApp from 'my-app/apps/contacts/ContactsApp';

function Contacts(props) {
  // const { left, right } = props;
  return (
    // <SplitScreen
    //   left='Contacts left'
    //   right={
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