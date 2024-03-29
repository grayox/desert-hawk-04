import 'babel-polyfill'
import 'typeface-muli';
import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
// import { createBrowserHistory } from "history";
import './react-table-defaults';
import './styles/index.css';
import './fake-db/fake-db'
import JssProvider from 'react-jss/lib/JssProvider';
import { create, } from 'jss';
import { createGenerateClassName, jssPreset, } from '@material-ui/core/styles';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';
import { Router, } from 'react-router-dom';
import { routes, } from './fuse-configs/fuseRoutesConfig';
import { FuseTheme, FuseAuthorization, } from '@fuse'; // FuseLayout,
// import MainToolbar from './main/MainToolbar';
// import MainNavbarContent from './main/MainNavbarContent';
// import MainNavbarHeader from './main/MainNavbarHeader';
// import MainFooter from './main/MainFooter';
import jssExtend from 'jss-extend';
// import QuickPanel from 'main/quickPanel/QuickPanel';
import store from 'store';
// import SettingsPanel from 'main/SettingsPanel';
// import ChatPanel from 'main/chatPanel/ChatPanel';
import { Auth, } from 'auth';

// begin my add
import MyLayout from 'app/layouts/MyLayout';
// import { CssBaseline, } from '@material-ui/core';
// import MyBottomNav from 'app/layouts/AppBars/MyBottomNav.js';
// import { Hidden } from '@material-ui/core';
// end my add

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()]
});

jss.options.insertionPoint = document.getElementById('jss-insertion-point');
const generateClassName = createGenerateClassName();

// const history = createBrowserHistory();

store.firebaseAuthIsReady.then(() => { // my add
  ReactDOM.render(
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <Provider store={store}>
        <Auth>
          <Router history={history}>
            <FuseAuthorization routes={routes}>
              <FuseTheme>
                {
                // <CssBaseline />
                }
                <MyLayout />
                {
                // <FuseLayout
                //   routes={routes}
                //   toolbar={
                //     <MainToolbar />
                //   }
                //   navbarHeader={
                //     <MainNavbarHeader />
                //   }
                //   navbarContent={
                //     <MainNavbarContent />
                //   }
                //   footer={
                //     // <MainFooter />
                //     <MyBottomNav />
                //   }
                //   // rightSidePanel={
                //   //   <React.Fragment>
                //   //     <ChatPanel />
                //   //     <QuickPanel />
                //   //   </React.Fragment>
                //   // }
                //   // contentWrapper={
                //   //   <SettingsPanel />
                //   // }
                // >
                // </FuseLayout>
                }
              </FuseTheme>
            </FuseAuthorization>
          </Router>
        </Auth>
      </Provider>
    </JssProvider>
    , document.getElementById('root'));
});

registerServiceWorker();
