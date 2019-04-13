import React from 'react';

// @material-ui/core
import {
  // Typography, 
  List, ListItem, ListItemText, ListItemAvatar, Avatar, Icon,
} from '@material-ui/core';

// const marketDescription = (
//   <span>
//     To specify the location of your market, you must identify all three levels:
//     <ul>
//       <li>country</li>
//       <li>state or region</li>
//       <li>location</li>
//     </ul>
//   </span>
// );

export const DashboardGridConfig = [
    {
      name: 'Balance',
      desc:
        <span>
          A running total count of how many times you have done important activities we need to track.
          Your net balance is key. Because when it&rsquo;s at zero, you will need to make more &ldquo;deposits&rdquo;
          by making at least one referral. Then you can receive more leads when you have a positive net balance.
        </span>,
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
            <span>
              <span>
                Your net balance is the most important balance for you to maintain above zero.
                It represents the difference between your deposits and withdrawals.
                Or, in other words, how many leads you referred compared to how many you received.
              </span>
              <br/><br/>
              <span>
                If you maintain a positive net balance, you will always be able to see your inbox
                and claim new leads as they arrive.
                If your net balance reaches zero, your inbox will lock and you won&rsquo;t be able
                to view it until you deposit more leads.
              </span>
            </span>
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
            <span>
              <span>
                Here we keep track of all the valid leads you submitted and referred into the network.
                To make a deposit, click the button then fill out the form.
                The form&rsquo;s &ldquo;save&rdquo; button will remain disabled
                until you complete all required fields.
              </span>
              <br/><br/>
              <span>
                These are all your required fields.
                <ul>
                  <li>name</li>
                  <li>phone number or email</li>
                  <li>zip code</li>
                  <li>lead type</li>
                </ul>
              </span>
            </span>
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
            <span>
              <span>
                This is the number of leads you claimed from your inbox and placed into your archive for your use.
                To claim a lead from your inbox, just click it.
                Then we will automatically place that lead in your archive and you will be able to see it continuously.
              </span>
              <br/><br/>
              <span>
                Unlike new leads in your inbox, you will always be able to see your archived leads &mdash;
                even if your net balance falls to zero.
              </span>
            </span>
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
            <span>
              <span>
                This is the number of net lead challenges you have won.
                Lost challenges are shown as a negative number.
                Users can challenge leads they believe are not legitimate.
              </span>
              <br/><br/>
              <span>
                You can challenge any lead you think is of poor quality.
                Those who make or receive too many challenges could have negative consequences as a result.
                So strive to submit high quality leads and be judicious in your challenges of others.
              </span>
            </span>
          ,
        },
      ]
    },
    {
      name: 'Inventory',
      desc:
        <span>
          These are the count of individual items you have available or
          have made available in the individual categories we are tracking.
          When a new item is added to your inventory (like a new referral going to your inbox),
          it increases your count. When you consume an item of inventory, (like claiming a lead
          from your inbox and moving it to your archive), it decreases the count of your inbox
          inventory and increases the count of your archive inventory.
        </span>,
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
            <span>
              List of all leads matching your type category and market location
            </span>
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
            <span>
              List of all previously available leads you claimed that are now exclusively yours
            </span>
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
            <span>
              List of all leads you submitted and referred to your peers on the network
            </span>
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
            <span>
              List of everyone you invited to join the network
            </span>
          ,
        },
      ]
    },
    {
      name: 'Detail',
      desc:
        <span>
          This is information about you that we require in order to match you with the correct leads.
          We also use this information to help send leads from you to the correct geographical location.
        </span>,
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
            <span>
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
            </span>
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
            <span>
              <span>
                The third level of your location selection.
                (In some small states or regions, it can be the only third level choice.
                In that case, the third level choice is usually identical to the name of the state or region.)
              </span>
              {/*marketDescription*/}
            </span>
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
            <span>
              <span>
                The second level of your location selection. (Called &ldquo;region&rdquo; in certain countries.)
              </span>
              {/*marketDescription*/}
            </span>
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
            <span>
              <span>
                The first level of your location selection.
              </span>
              {/*marketDescription*/}
            </span>
          ,
        },
      ]
    },
  ]