import React from 'react';
// import SplitScreen from '../SplitScreen';
// import FeedbackForm from 'my-app/components/forms/FeedbackForm';

// import MailApp from 'my-app/apps/mail/MailApp';
import {Redirect} from 'react-router-dom';

function Feedback(props) {
  // const { left, right } = props;
  return (
    // <SplitScreen
    //   left='Feedback left'
    //   right={<FeedbackForm />}
    // />
    // <MailApp/>
    <Redirect to="/apps/mail/inbox"/>
  );
}

export default Feedback;