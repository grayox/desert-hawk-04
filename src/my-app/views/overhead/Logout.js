import React from 'react';
import { Redirect, } from "react-router-dom";

const Logout = () => {
  console.log('Logging out...');
  // TODO: add logout functionality
  return (
    <Redirect to='/login' />
  );
}
 
export default Logout;