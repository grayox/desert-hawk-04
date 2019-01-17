import React from 'react';
// import ListDetail from '../ListDetail'
// import UserMultiForm from 'my-app/components/forms/UserMultiForm';

import TodoApp from 'my-app/apps/todo/TodoApp';

function Outbox(props) {
  // const { list, detail } = props;
  return (
    // <ListDetail
    //   list='Outbox left'
    //   detail={
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