import React from 'react';
import { Redirect, } from 'react-router-dom';
import firebaseService from 'firebaseService';

const Logout = () => {
  console.log('Logging out...');
  alert('Logging out...');
  // TODO: add logout functionality
  // firebaseService.signOut();
  return (
    <Redirect to='/login' />
  );
}
 
export default Logout;