// import React from 'react';
import React, {Component} from 'react';
// import CRUDView from 'my-app/layouts/crud/CRUDView'
// import InboxForm from 'my-app/components/forms/InboxForm';

// import MailApp from 'my-app/apps/mail/MailApp';
// import {Redirect} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import { FusePageCarded } from '@fuse';

const styles = theme => ({});

// function Inbox(props) {
class Inbox extends Component {

  
  render()
  { 
    // const { list, detail } = props;
    const { items } = this.props;

    return(
  
      // <Redirect to="/apps/mail/inbox"/>
      // <MailApp/>
      // <CRUDView
      //   list='Inbox left'
      //   detail={<InboxForm />}
      // />
  
      <FusePageCarded
        content={
          <List component="nav">
            {
              items.map(item => (
                <ListItem button key={item.timestamp}>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                  <ListItemText primary="Vacation" secondary={item.name} />
                </ListItem>
              ))
            }
          </List>
        }
      />
  
    );
  }

}

export default Inbox;