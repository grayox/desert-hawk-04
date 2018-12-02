import React from 'react';
import SplitScreen from '../SplitScreen';
import FeedbackForm from 'my-app/components/forms/FeedbackForm';

function Feedback(props) {
  // const { left, right } = props;
  return (
    <SplitScreen
      left='Feedback left'
      right={<FeedbackForm />}
    />
  );
}

export default Feedback;