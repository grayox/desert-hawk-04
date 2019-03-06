// inspired by https://github.com/withinpixels/fuse-react/blob/v2.2.3/src/app/main/apps/dashboards/project/ProjectDashboardApp.js
    
import React from 'react';
import Widget from './Widget';

const widget = {
  title: "Foobar",
  data: {
    label: 'Foo',
    value: 5,
  }
}

const DashboardWidgets = props =>
(
  <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
    <Widget widget={widget}/>
  </div>
)

export default DashboardWidgets;