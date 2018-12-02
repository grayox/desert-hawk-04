import React from 'react';
import SplitScreen from '../SplitScreen'
import UserMultiForm from 'my-app/components/forms/UserMultiForm';

function Outbox(props) {
  // const { left, right } = props;
  return (
    <SplitScreen
      left='Outbox left'
      right={
        <UserMultiForm
          withPhone
          heading='Add new lead'
          savePath='leads'
          geoStepperLabel='Lead location'
        />
      }
    />
  );
}

export default Outbox;