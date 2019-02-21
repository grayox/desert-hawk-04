import React from 'react';
// import CRUDView from 'my-app/layouts/crud/CRUDView'
// import UserMultiForm from 'my-app/components/forms/UserMultiForm';

import FileManagerApp from 'my-app/apps/file-manager/FileManagerApp';

function Archive(props) {
  // const { list, detail } = props;
  return (
    // <CRUDView
    //   list='Archive left'
    //   detail={
    //     <UserMultiForm
    //       withPhone
    //       heading='Add new lead'
    //       savePath='leads'
    //       geoStepperLabel='Lead location'
    //     />        
    //   }
    // />
    <FileManagerApp/>
  );
}

export default Archive;