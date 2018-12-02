import React from 'react';

// 4 Ways to Style React Components: https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822
const splitScreenStyle = {
  display: 'grid', // https://css-tricks.com/snippets/css/complete-guide-grid/ | http://grid.malven.co/
  gridTemplateColumns: '1fr 1fr',
};

function SplitScreen(props) {
  const { left, right } = props;
  return (
    <div style={splitScreenStyle}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

export default SplitScreen;