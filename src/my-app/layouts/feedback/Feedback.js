// import React from 'react';
import React, {Component} from 'react';
// import MasterDetail from '../MasterDetail';
// import FeedbackForm from 'my-app/components/forms/FeedbackForm';

// import MailApp from 'my-app/apps/mail/MailApp';
// import {Redirect} from 'react-router-dom';

import { FusePageCarded } from '@fuse';

const styles = theme => ({});

// function Feedback(props) {
class Feedback extends Component {

  // const { list, detail } = props;

  render()
  { 
    return(
  
      // <Redirect to="/apps/mail/inbox"/>
      // <MailApp/>
      // <MasterDetail
      //   list='Feedback left'
      //   detail={<FeedbackForm />}
      // />
  
      <FusePageCarded/>
  
    );
  }

}

export default Feedback;