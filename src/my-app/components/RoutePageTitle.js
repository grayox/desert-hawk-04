import React from 'react';
import { Route, Redirect, } from "react-router-dom";
import { componentsNavConfig, } from 'my-app/config/AppConfig.js';

const pageTitle = ({ location, }) => { // model // 
  // console.log('model\n', model); // {"history":{"length":50,"action":"POP","location":{"pathname":"/archive","search":"","hash":"","key":"1pelhl"}},"location":{"pathname":"/archive","search":"","hash":"","key":"1pelhl"},"match":{"path":"/","url":"/","isExact":false,"params":{}}}
  const { pathname } = location;
  const items = componentsNavConfig.filter(r => (r.path === pathname));
  // console.log('items\n', items);
  const out = items && items[0] && items[0].title;
  return out || <Redirect to='/error404' />;
}

// const Transition = props => <Slide direction="up" {...props} />

// const pageTitleElement = () => {

//   const [ dialogIsOpen, setDialogIsOpen, ] = useState(false);
//   const handleOpenDialog = () => setDialogIsOpen(true);
//   const handleCloseDialog = () => setDialogIsOpen(false);
//   return (
//     <div>
//       {config[type].element}
//       <Dialog
//         keepMounted
//         open={dialogIsOpen}
//         onClose={handleCloseDialog}
//         TransitionComponent={Transition}
//         aria-labelledby="alert-dialog-slide-title"
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogTitle id="alert-dialog-slide-title">{label}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-slide-description">{message}</DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">Ok, got it</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );

// }

const RoutePageTitle = () => <Route path="/" component={pageTitle} />
 
export default RoutePageTitle;