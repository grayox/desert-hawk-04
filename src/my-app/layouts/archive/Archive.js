import React from 'react';
// import SplitScreen from '../SplitScreen'
// import UserMultiForm from 'my-app/components/forms/UserMultiForm';

import FileManagerApp from 'my-app/apps/file-manager/FileManagerApp';

function Archive(props) {
  // const { left, right } = props;
  return (
    // <SplitScreen
    //   left='Archive left'
    //   right={
    //     <UserMultiForm
    //       withPhone
    //       heading='Add new lead'
    //       savePath='leads'
    //       geoStepperLabel='Lead location'
    //     />        
    //   }
    // />
    <FileManagerApp />
  );
}

export default Archive;