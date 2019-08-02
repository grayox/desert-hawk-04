// alerts inspired by   : https://v0.tailwindcss.com/docs/examples/alerts/#app
// v1.x upgrade         : https://tailwindcss.com/components/alerts/#app
// snackbar inspired by : https://material-ui.com/components/snackbars/

import React from 'react';
// import React, { useState, } from 'react';
import PropTypes from 'prop-types';

// import classNames from 'classnames';
// import { withStyles, SnackbarContent, Icon, IconButton, } from '@material-ui/core';

// const styles = theme => ({
//   success: {
//     backgroundColor: 'green', //green[600],
//   },
//   error: {
//     backgroundColor: 'red', // theme.palette.error.dark,
//   },
//   info: {
//     backgroundColor: 'blue', // theme.palette.primary.main,
//   },
//   warning: {
//     backgroundColor: 'amber', //amber[700],
//   },
//   icon: {
//     fontSize: 20,
//   },
//   iconVariant: {
//     opacity: 0.9,
//     marginRight: '4px' // theme.spacing(1),
//   },
//   message: {
//     display: 'flex',
//     alignItems: 'center',
//   },
// })

const CustomAlert = ({ variant, heading, content, }) => {

  // const onClose = () => {}

  // const getSnackbar = () =>
  //   <SnackbarContent
  //     // className={clsx(classes[variant], className)}
  //     aria-describedby="client-snackbar"
  //     message={
  //       <span id="client-snackbar" className={classes.message}>
  //         <Icon
  //           // className={clsx(classes.icon, classes.iconVariant)}
  //         />
  //         {
  //           // message
  //           'Hello world'
  //         }
  //       </span>
  //     }
  //     action={[
  //       <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
  //         <Icon className={classes.icon}>close</Icon>
  //       </IconButton>,
  //     ]}
  //     // {...other}
  //   />

  const getTraditional = () =>
    <div class="my-16 p-16 bg-red-lightest border border-red-light text-red-dark rounded relative shadow-md" role="alert">
      <strong class="font-bold">{heading}</strong>
      <span class="block sm:inline ml-6">{content}</span>
      {
      // <span class="absolute pin-t pin-b pin-r px-4 py-3">
      //   <svg class="fill-current h-6 w-6 text-red" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      // </span>
      }
    </div>

  const getModernWithBadge = () =>
    <div class="my-16 p-16 bg-indigo-darkest text-center">
      <div class="p-8 bg-indigo-darker items-center text-indigo-lightest leading-none lg:rounded-full flex lg:inline-flex" role="alert">
        <span class="mr-8 p-8 flex rounded-full bg-indigo uppercase text-xs font-bold">{heading}</span>
        <span class="mr-8 font-semibold text-left flex-auto">{content}</span>
        {
        // <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
        }
      </div>
    </div>


  const getLeftAccentBorder = () =>
    <div class="my-16 p-16 bg-orange-lightest border-l-4 border-orange text-orange-dark" role="alert">
      <p class="font-bold">{heading}</p>
      <p>{content}</p>
    </div>

  const getTitled = () =>
    <div role="my-16 alert">
      <div class="px-16 py-8 bg-red text-white font-bold rounded-t">
        {heading}
      </div>
      <div class="p-16 border border-t-0 border-red-light rounded-b bg-red-lightest text-red-dark">
        <p>{content}</p>
      </div>
    </div>

  const getSolid = () =>
    <div class="my-16 p-16 flex items-center bg-blue text-white text-sm font-bold" role="alert">
      {
      // <svg class="mr-2 fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
      }
      <p>{content}</p>
    </div>

  const getTopAccentBorder = () =>
    <div class="my-16 p-16 bg-teal-lightest border-t-4 border-teal rounded-b text-teal-darkest shadow-md" role="alert">
      <div class="flex">
        {
        // <div class="py-1"><svg class="fill-current h-6 w-6 text-teal mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
        }
        <div>
          <p class="font-bold">{heading}</p>
          <p class="text-sm">{content}</p>
        </div>
      </div>
    </div>

  const getBanner = () =>
    <div class="my-16 p-16 bg-blue-lightest border-t border-b border-blue text-blue-dark" role="alert">
      <p class="font-bold">{heading}</p>
      <p class="text-sm">{content}</p>
    </div>

  const alertConfig = {
    traditional: getTraditional(),
    modern: getModernWithBadge(),
    left: getLeftAccentBorder(),
    titled: getTitled(),
    solid: getSolid(),
    top: getTopAccentBorder(),
    banner: getBanner(),
  }

  return alertConfig[variant]
}

CustomAlert.propTypes = {
  // classes: PropTypes.object.isRequired,
  variant: PropTypes.oneOf([ 'traditional', 'modern', 'left', 'titled', 'solid', 'top', 'banner', ]),
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

CustomAlert.defaultProps = {
  variant: 'traditional',
  heading: 'Holy smokes!',
  content: 'Something seriously bad happened.',
};

export default CustomAlert;