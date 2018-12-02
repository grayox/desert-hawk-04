import React from 'react';
import SplitScreen from '../SplitScreen'
import UserMultiForm from 'my-app/components/forms/UserMultiForm';

function Contacts(props) {
  // const { left, right } = props;
  return (
    <SplitScreen
      left='Contacts left'
      right={
        <UserMultiForm
          heading='Add new contact'
          savePath='contacts'
          geoStepperLabel='Contact location'
        />
      }
    />
  );
}

export default Contacts;