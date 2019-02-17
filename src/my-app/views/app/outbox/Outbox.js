import React from 'react';
// import CRUDview from 'my-app/layouts/CRUDview'

import CreateLead from 'my-app/components/forms/CreateLead'
import UserMultiForm from 'my-app/components/forms/UserMultiForm';

// import TodoApp from 'my-app/apps/todo/TodoApp';

function Outbox(props) {
  // const { list, detail } = props;
  return (
    // <CRUDview
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

    // <TodoApp/>
    
    <React.Fragment>
      <CreateLead />
      <UserMultiForm />
    </React.Fragment>
  );
}

export default Outbox;