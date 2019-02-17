import React from 'react';
// import CRUDview from 'my-app/layouts/crud/CRUDview'
// import UserMultiForm from 'my-app/components/forms/UserMultiForm';

import FileManagerApp from 'my-app/apps/file-manager/FileManagerApp';

function Archive(props) {
  // const { list, detail } = props;
  return (
    // <CRUDview
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