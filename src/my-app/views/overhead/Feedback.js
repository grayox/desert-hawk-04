// import React from 'react';
import React, {Component} from 'react';
// import CRUDView from '../CRUDView';
import FeedbackForm from 'my-app/components/forms/FeedbackForm';

// import MailApp from 'my-app/apps/mail/MailApp';
// import {Redirect} from 'react-router-dom';

// import { FusePageCarded } from '@fuse';

const styles = theme => ({});

// function Feedback(props) {
class Feedback extends Component {

  // const { list, detail } = props;

  render()
  { 
    return(
  
      // <Redirect to="/apps/mail/inbox"/>
      // <MailApp/>
      // <CRUDView
      //   list='Feedback left'
      //   detail={<FeedbackForm />}
      // />
  
      // <FusePageCarded/>
  
      <FeedbackForm />
    );
  }

}

export default Feedback;