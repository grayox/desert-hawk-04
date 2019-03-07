import React from 'react';

// @material-ui/core
import { Typography, Icon, } from '@material-ui/core';

const marketDescription = (
  <Typography className="mt-12">
    To specify the location of your market, you must identify all three levels:
    <ul>
      <li>country</li>
      <li>state or region</li>
      <li>location</li>
    </ul>
  </Typography>
);

export const DashboardGridConfig = [
    {
      name: 'Balances',
      desc:
        <React.Fragment>
          <Typography>
            These are a running total of how many times you have done important activities we need to track.
            Your net balance is key. Because when it&rsquo;s at zero, you will need to make more &ldquo;deposits&rdquo;
            by making at least one referral in order to receive more leads.
          </Typography>
        </React.Fragment>,
      cells: [
        {
          label: 'Net',
          data: 5,
          icon: 'drag_handle',
          color: 'warning',
          buttonLabel: 'Hai',
          desc:
            <React.Fragment>
              <Typography>
                Your net balance is the most important balance for you to maintain above zero.
                It represents the difference between your deposits and withdrawals.
                Or, in other words, how many leads you referred compared to how many you received.
              </Typography>
              <Typography className="mt-12">
                If you maintain a positive net balance, you will always be able to see your inbox
                and claim new leads as they arrive.
                If your net balance reaches zero, your inbox will lock and you won&rsquo;t be able
                to view it until you deposit more leads.
              </Typography>
            </React.Fragment>
          ,
        },
        {
          label: 'Deposits',
          data: 5,
          icon: 'add',
          color: 'success',
          buttonLabel: 'Deposit new',
          desc:
            <React.Fragment>
              <Typography>
                Here we keep track of all the valid leads you submitted and referred into the network.
                To make a deposit, click the button then fill out the form.
                The form&rsquo;s &ldquo;save&rdquo; button will remain disabled
                until you complete all required fields.
              </Typography>
              <Typography className="mt-12">
                These are all your required fields.
                  <ul>
                  <li>name</li>
                  <li>phone number or email</li>
                  <li>zip code</li>
                  <li>lead type</li>
                </ul>
              </Typography>
            </React.Fragment>
          ,
        },
        {
          label: 'Withdrawals',
          data: 5,
          icon: 'remove',
          color: 'danger',
          buttonLabel: 'See available',
          desc:
            <React.Fragment>
              <Typography>
                This is the number of leads you claimed from your inbox and placed into your archive for your use.
                To claim a lead from your inbox, just click it.
                Then we will automatically place that lead in your archive and you will be able to see it continuously.
              </Typography>
              <Typography className="mt-12">
                Unlike new leads in your inbox, you will always be able to see your archived leads &mdash;
                even if your net balance falls to zero.
              </Typography>
            </React.Fragment>
          ,
        },
        {
          label: 'Challenges',
          data: <span>&minus;5</span>,
          icon: 'warning',
          color: 'primary',
          buttonLabel: 'See challenges',
          desc:
            <React.Fragment>
              <Typography>
                This is the number of net lead challenges you have won.
                Lost challenges are shown as a negative number.
                Users can challenge leads they believe are not legitimate.
              </Typography>
              <Typography className="mt-12">
                You can challenge any lead you think is of poor quality.
                Those who make or receive too many challenges could have negative consequences as a result.
                So strive to submit high quality leads and be judicious in your challenges of others.
              </Typography>
            </React.Fragment>
          ,
        },
      ]
    },
    {
      name: 'Inventories',
      desc:
        <React.Fragment>
          <Typography>
            These are the count of individual items you have available or
            have made available in the individual categories we are tracking.
            When an item is added to your inventory, it increases your balance.
          </Typography>
        </React.Fragment>,
      cells: [
        {
          label: 'Inbox',
          data: 5,
          icon: 'cloud_download',
          color: 'info',
          buttonLabel: 'View inbox',
          desc:
            <Typography>
              List of all leads matching your type category and market location
            </Typography>
          ,
        },
        {
          label: 'Archive',
          data: 5,
          icon: 'folder',
          color: 'success',
          buttonLabel: 'View archive',
          desc:
            <Typography>
              List of all previously available leads you claimed that are now exclusively yours
            </Typography>
          ,
        },
        {
          label: 'Outbox',
          data: 5,
          icon: 'cloud_upload',
          color: 'primary',
          buttonLabel: 'View outbox',
          desc:
            <Typography>
              List of all leads you submitted and referred to your peers on the network
            </Typography>
          ,
        },
        {
          label: 'Contacts',
          data: 5,
          icon: 'account_box',
          color: 'success',
          buttonLabel: 'Add contact',
          desc:
            <Typography>
              List of everyone you invited to join the network
            </Typography>
          ,
        },
      ]
    },
    {
      name: 'Details',
      desc:
        <React.Fragment>
          <Typography>
            This is information about you that we require in order to match you with the correct leads.
            We also use this information to help send leads from you to the correct geographical location.
          </Typography>
        </React.Fragment>,
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
          desc:
            <React.Fragment>
              Tell us the type of leads you want.
                <ul>
                <li>
                  <Typography className="mt-12">
                    <Typography className="mr-12">Home</Typography>
                    <Icon>home</Icon>
                  </Typography>
                  <Typography>
                    Select this if you are a real estate broker or agent selling homes to residential buyers
                  </Typography>
                </li>
                <li>
                  <Typography className="mt-12">
                    <Typography className="mr-12">Mortgage</Typography>
                    <Icon>account_balance</Icon>
                  </Typography>
                  <Typography>
                    Select this if you are a real estate mortgage broker or agent selling financing to home buyers
                  </Typography>
                </li>
                <li>
                  <Typography className="mt-12">
                    <Typography className="mr-12">Insurance</Typography>
                    <Icon>assessment</Icon>
                  </Typography>
                  <Typography>
                    Select this if you are an insurance broker or agent selling property and casualty policies
                  </Typography>
                </li>
                <li>
                  <Typography className="mt-12">
                    <Typography className="mr-12">Financial</Typography>
                    <Icon>assignment</Icon>
                  </Typography>
                  <Typography>
                    Select this if you are a financial planner and advise clients on their personal finances
                  </Typography>
                </li>
              </ul>
            </React.Fragment>
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
          desc:
            <React.Fragment>
              <Typography>
                The third level of your location selection.
                (In some small states or regions, it can be the only third level choice.
                In that case, the third level choice is usually identical to the name of the state or region.)
              </Typography>
              {marketDescription}
            </React.Fragment>
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
          desc:
            <React.Fragment>
              <Typography>
                The second level of your location selection. (Called &ldquo;region&rdquo; in certain countries.)
              </Typography>
              {marketDescription}
            </React.Fragment>
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
          desc:
            <React.Fragment>
              <Typography>
                The first level of your location selection.
              </Typography>
              {marketDescription}
            </React.Fragment>
          ,
        },
      ]
    },
  ]