import React from 'react';
import SplitScreen from '../SplitScreen'
import UserMultiForm from 'my-app/components/forms/UserMultiForm';

import TodoApp from 'my-app/apps/todo/TodoApp';

function Outbox(props) {
  // const { left, right } = props;
  return (
    // <SplitScreen
    //   left='Outbox left'
    //   right={
    //     <UserMultiForm
    //       withPhone
    //       heading='Add new lead'
    //       savePath='leads'
    //       geoStepperLabel='Lead location'
    //     />
    //   }
    // />
    <TodoApp/>
  );
}

export default Outbox;