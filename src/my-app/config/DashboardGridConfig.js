import React from 'react';

// @material-ui/core
import {
  // Typography, 
  List, ListItem, ListItemText, ListItemAvatar, Avatar, Icon,
} from '@material-ui/core';

// const marketDescription = (
//   <Typography className="mt-12">
//     To specify the location of your market, you must identify all three levels:
//     <ul>
//       <li>country</li>
//       <li>state or region</li>
//       <li>location</li>
//     </ul>
//   </div>
// );

export const DashboardGridConfig = [
    {
      name: 'Balance',
      desc:
        <div>
          <div>
            A running total count of how many times you have done important activities we need to track.
            Your net balance is key. Because when it&rsquo;s at zero, you will need to make more &ldquo;deposits&rdquo;
            by making at least one referral. Then you can receive more leads when you have a positive net balance.
          </div>
        </div>,
      cells: [
        {
          label: 'Net',
          data: 5,
          icon: 'drag_handle',
          color: 'warning',
          buttonLabel: 'Hai',
          links: [
            { id: 'outbox' , label: 'Deposit new referral' , },
            { id: 'inbox'  , label: 'Shop for new leads'   , },
          ],
          desc:
            <div>
              <div>
                Your net balance is the most important balance for you to maintain above zero.
                It represents the difference between your deposits and withdrawals.
                Or, in other words, how many leads you referred compared to how many you received.
              </div>
              <div className="mt-12">
                If you maintain a positive net balance, you will always be able to see your inbox
                and claim new leads as they arrive.
                If your net balance reaches zero, your inbox will lock and you won&rsquo;t be able
                to view it until you deposit more leads.
              </div>
            </div>
          ,
        },
        {
          label: 'Deposits',
          data: 5,
          icon: 'add',
          color: 'success',
          buttonLabel: 'Deposit new',
          links: [
            { id: 'outbox', label: 'Deposit new referral', },
          ],
          desc:
            <div>
              <div>
                Here we keep track of all the valid leads you submitted and referred into the network.
                To make a deposit, click the button then fill out the form.
                The form&rsquo;s &ldquo;save&rdquo; button will remain disabled
                until you complete all required fields.
              </div>
              <div className="mt-12">
                These are all your required fields.
                <ul>
                  <li>name</li>
                  <li>phone number or email</li>
                  <li>zip code</li>
                  <li>lead type</li>
                </ul>
              </div>
            </div>
          ,
        },
        {
          label: 'Withdrawals',
          data: 5,
          icon: 'remove',
          color: 'danger',
          buttonLabel: 'See available',
          links: [
            { id: 'archive' , label: 'Jump to lead archive' , },
            { id: 'inbox'   , label: 'Shop for new leads'   , },
          ],
          desc:
            <div>
              <div>
                This is the number of leads you claimed from your inbox and placed into your archive for your use.
                To claim a lead from your inbox, just click it.
                Then we will automatically place that lead in your archive and you will be able to see it continuously.
              </div>
              <div className="mt-12">
                Unlike new leads in your inbox, you will always be able to see your archived leads &mdash;
                even if your net balance falls to zero.
              </div>
            </div>
          ,
        },
        {
          label: 'Challenges',
          data: <span>&minus;5</span>,
          icon: 'warning',
          color: 'primary',
          buttonLabel: 'See challenges',
          links: [
            { id: 'inbox', label: 'Search for leads', },
          ],
          desc:
            <div>
              <div>
                This is the number of net lead challenges you have won.
                Lost challenges are shown as a negative number.
                Users can challenge leads they believe are not legitimate.
              </div>
              <div className="mt-12">
                You can challenge any lead you think is of poor quality.
                Those who make or receive too many challenges could have negative consequences as a result.
                So strive to submit high quality leads and be judicious in your challenges of others.
              </div>
            </div>
          ,
        },
      ]
    },
    {
      name: 'Inventory',
      desc:
        <div>
          These are the count of individual items you have available or
          have made available in the individual categories we are tracking.
          When a new item is added to your inventory (like a new referral going to your inbox),
          it increases your count. When you consume an item of inventory, (like claiming a lead
          from your inbox and moving it to your archive), it decreases the count of your inbox
          inventory and increases the count of your archive inventory.
        </div>,
      cells: [
        {
          label: 'Inbox',
          data: 5,
          icon: 'cloud_download',
          color: 'info',
          buttonLabel: 'View inbox',
          links: [
            { id: 'inbox', label: 'Jump to inbox', },
          ],
          desc:
            <div>
              List of all leads matching your type category and market location
            </div>
          ,
        },
        {
          label: 'Archive',
          data: 5,
          icon: 'folder',
          color: 'success',
          buttonLabel: 'View archive',
          links: [
            { id: 'archive', label: 'Jump to archive', },
          ],
          desc:
            <div>
              List of all previously available leads you claimed that are now exclusively yours
            </div>
          ,
        },
        {
          label: 'Outbox',
          data: 5,
          icon: 'cloud_upload',
          color: 'primary',
          buttonLabel: 'View outbox',
          links: [
            { id: 'outbox', label: 'Jump to outbox', },
          ],
          desc:
            <div>
              List of all leads you submitted and referred to your peers on the network
            </div>
          ,
        },
        {
          label: 'Contacts',
          data: 5,
          icon: 'account_box',
          color: 'success',
          buttonLabel: 'Add contact',
          links: [
            { id: 'contacts', label: 'Edit contacts', },
          ],
          desc:
            <div>
              List of everyone you invited to join the network
            </div>
          ,
        },
      ]
    },
    {
      name: 'Detail',
      desc:
        <div>
          This is information about you that we require in order to match you with the correct leads.
          We also use this information to help send leads from you to the correct geographical location.
        </div>,
      cells: [
        {
          label: 'Category',
          // data: <span className="capitalize">{bizCategory}</span>,
          // data: 'Mortgage',
          data: <Icon>warning</Icon>,
          icon: 'label',
          color: 'info',
          typog: 'subtitle1',
          buttonLabel: 'Edit',
          // btn:
          //   <SelectControl
          //     size='small'
          //     control='button'
          //     label='Change category'
          //     open={categoryOpen}
          //     items={categoryItems}
          //     value={bizCategory}
          //     onOpen={onCategoryOpen}
          //     onClick={onCategoryOpen}
          //     onClose={onCategoryClose}
          //     onChange={onCategoryChange}
          //   />
          // ,
          links: [
            { id: 'settings', label: 'Edit category', },
          ],
          desc:
            <div>
              Select the type of leads you want.
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Icon>home</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Home"
                    secondary="Select this if you are a real estate broker or agent selling homes to residential buyers"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Icon>account_balance</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Mortgage"
                    secondary="Select this if you are a real estate mortgage broker or agent selling financing to home buyers"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Icon>assessment</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Insurance"
                    secondary="Select this if you are an insurance broker or agent selling property and casualty policies"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Icon>assignment</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Financial"
                    secondary="Select this if you are a financial planner and advise clients on their personal finances"
                  />
                </ListItem>
              </List>
            </div>
          ,
        },
        {
          label: 'Location',
          data: <Icon>done</Icon>,
          // data: 'Scholes',
          // data: geoLocal,
          icon: 'place',
          color: 'primary',
          typog: 'subtitle1',
          buttonLabel: 'Edit',
          links: [
            { id: 'settings', label: 'Edit location', },
          ],
          desc:
            <div>
              <div>
                The third level of your location selection.
                (In some small states or regions, it can be the only third level choice.
                In that case, the third level choice is usually identical to the name of the state or region.)
              </div>
              {/*marketDescription*/}
            </div>
          ,
        },
        {
          label: 'State',
          data: <Icon>done</Icon>,
          // data: 'Mississippi',
          // data: geoRegion,
          icon: 'track_changes',
          color: 'warning',
          typog: 'subtitle1',
          buttonLabel: 'Edit',
          links: [
            { id: 'settings', label: 'Edit state', },
          ],
          desc:
            <div>
              <div>
                The second level of your location selection. (Called &ldquo;region&rdquo; in certain countries.)
              </div>
              {/*marketDescription*/}
            </div>
          ,
        },
        {
          label: 'Country',
          data: <Icon>done</Icon>,
          // data: 'United States',
          // data: geoNation,
          icon: 'flag',
          color: 'primary',
          typog: 'subtitle1',
          buttonLabel: 'Edit',
          links: [
            { id: 'settings', label: 'Edit country', },
          ],
          desc:
            <div>
              <div>
                The first level of your location selection.
              </div>
              {/*marketDescription*/}
            </div>
          ,
        },
      ]
    },
  ]