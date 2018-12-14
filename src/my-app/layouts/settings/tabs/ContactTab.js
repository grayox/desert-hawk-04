import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import axios from 'axios/index';
import { Avatar, AppBar, Button, Card, CardContent, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Toolbar, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { FuseAnimateGroup } from '@fuse';

// this page was copied from ./AboutTab

const styles = theme => ({
  root: {}
});

class ContactTab extends Component {

  state = {
    general: null,
    work: null,
    contact: null,
    groups: null,
    friends: null
  };

  componentDidMount() {
    axios.get('/api/profile/about').then(res => {
      this.setState(res.data);
    });
  }

  render() {
    const { classes } = this.props;
    const { general, work, contact, } = this.state;

    return (
      <div className={classNames(classes.root, "md:flex max-w-2xl")}>

        <div className="flex flex-col flex-1 md:pr-32">
          <FuseAnimateGroup
            enter={{
              animation: "transition.slideUpBigIn"
            }}
          >
            {general && (
              <Card className="w-full mb-16">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                      General Information
                                        </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent>
                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Gender</Typography>
                    <Typography>{general.gender}</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Birthday</Typography>
                    <Typography>{general.birthday}</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Locations</Typography>

                    {general.locations.map((location) => (
                      <div className="flex items-center" key={location}>
                        <Typography>{location}</Typography>
                        <Icon className="text-16 ml-4" color="action">location_on</Icon>
                      </div>
                    ))}
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">About Me</Typography>
                    <Typography>{general.about}</Typography>
                  </div>

                </CardContent>
              </Card>
            )}

            {work && (
              <Card className="w-full mb-16">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                      Work
                                        </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent>
                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Occupation</Typography>
                    <Typography>{work.occupation}</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Skills</Typography>
                    <Typography>{work.skills}</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Jobs</Typography>
                    <table className="">
                      <tbody>
                        {work.jobs.map((job) => (
                          <tr key={job.company}>
                            <td className="pr-16">
                              <Typography>{job.company}</Typography>
                            </td>
                            <td>
                              <Typography color="textSecondary">{job.date}</Typography>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {contact && (
              <Card className="w-full mb-16">
                <AppBar position="static" elevation={0}>
                  <Toolbar className="pl-16 pr-8">
                    <Typography variant="subtitle1" color="inherit" className="flex-1">
                      Contact
                                        </Typography>
                  </Toolbar>
                </AppBar>

                <CardContent>
                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Address</Typography>
                    <Typography>{contact.address}</Typography>
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Tel.</Typography>

                    {contact.tel.map((tel) => (
                      <div className="flex items-center" key={tel}>
                        <Typography>{tel}</Typography>
                      </div>
                    ))}
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Website</Typography>

                    {contact.websites.map((website) => (
                      <div className="flex items-center" key={website}>
                        <Typography>{website}</Typography>
                      </div>
                    ))}
                  </div>

                  <div className="mb-24">
                    <Typography className="font-bold mb-4 text-15">Emails</Typography>

                    {contact.emails.map((email) => (
                      <div className="flex items-center" key={email}>
                        <Typography>{email}</Typography>
                      </div>
                    ))}
                  </div>

                </CardContent>
              </Card>
            )}
          </FuseAnimateGroup>
        </div>

      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ContactTab);
