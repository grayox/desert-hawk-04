import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {appsConfigs} from 'main/content/apps/appsConfigs';
import {pagesConfigs} from 'main/content/pages/pagesConfigs';
import {authRoleExamplesConfigs} from 'main/content/auth/authRoleExamplesConfigs';
import {UserInterfaceConfig} from 'main/content/user-interface/UserInterfaceConfig';
import {ComponentsConfig} from 'main/content/components/ComponentsConfig';
import {ComponentsThirdPartyConfig} from 'main/content/components-third-party/ComponentsThirdPartyConfig';
import {GettingStartedConfig} from 'main/content/getting-started/GettingStartedConfig';
import {LoginConfig} from 'main/content/login/LoginConfig';
import {RegisterConfig} from 'main/content/register/RegisterConfig';
import {LogoutConfig} from 'main/content/logout/LogoutConfig';
import {CallbackConfig} from 'main/content/callback/CallbackConfig';

// import Login from 'main/content/login/Login'; // my add

const routeConfigs = [
    ...appsConfigs,
    ...pagesConfigs,
    ...authRoleExamplesConfigs,
    ComponentsConfig,
    ComponentsThirdPartyConfig,
    UserInterfaceConfig,
    GettingStartedConfig,
    LoginConfig,
    RegisterConfig,
    LogoutConfig,
    CallbackConfig
];

export const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact    : true,
        // component: () => <Redirect to="/apps/dashboards/analytics"/>
        component: () => <Redirect to="/dashboard"/>
    },
    // {
    //     path     : '/login',
    //     exact    : true,
    //     component: Login,
    // },
    {
        component: () => <Redirect to="/pages/errors/error-404"/>
    },
];
