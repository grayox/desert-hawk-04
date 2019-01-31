import React from 'react';
// import MasterDetail from 'my-app/layouts/MasterDetail.js'
// import UserMultiForm from 'my-app/components/forms/UserMultiForm';

import TodoApp from 'my-app/apps/todo/TodoApp';

function Outbox(props) {
  // const { list, detail } = props;
  return (
    // <MasterDetail
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