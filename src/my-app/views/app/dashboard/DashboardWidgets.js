// inspired by https://github.com/withinpixels/fuse-react/blob/v2.2.3/src/app/main/apps/dashboards/project/ProjectDashboardApp.js
    
import React from 'react';
import PropTypes from 'prop-types';

import { DashboardGridConfig } from 'my-app/config/DashboardGridConfig';
import DashboardWidget from './DashboardWidget';
import { withStyles, Grid, } from '@material-ui/core'; // GridList,

const styles = theme => ({
  // root: {
  //   // flexGrow: 1,
  //   // display: 'flex',
  //   // flexWrap: 'wrap',
  //   // justifyContent: 'space-around',
  //   // overflow: 'hidden',
  //   // // backgroundColor: theme.palette.background.paper,
  // },
  gridList: {
    // width: 500,
    // height: 450,
    height: 248,
  },
});

// const widget = {
//   title: "Title",
//   data: {
//     label: 'Data Label',
//     value: 5,
//   }
// }

// const getItems = () => {
//   const out = [];
//   const rows = DashboardGridConfig;
//   let i = rows.length;
//   while(i--) {
//     const row = rows[i];
//     let j = row.cells.length;
//     while(j--) {
//       const cell = row.cells[j];
//       out.unshift({
//         rowName: row.name,
//         rowDesc: row.desc,
//         ...cell,
//       });
//     }
//   }
//   console.log('out\n', out);
//   return out;
// }

// const DashboardWidgets = props =>
// (
//   <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
//     <DashboardWidget widget={widget}/>
//   </div>
// )

const DashboardWidgets = ({ data, settings, }) => { // classes,
  const items = DashboardGridConfig.cells; // getItems();
  const count = items && items.length;
  return (
    // <div className={classes.root}>
      // <GridList
      //   cellHeight={248}
      //   // className={classes.gridList}
      //   cols={4}
      //   spacing={16}
      // >
      //   {items && items.map(item =>
      //     <div key={`${item.name}${item.label}`} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
      //       <DashboardWidget widget={item} />
      //     </div>
      //     // <GridListTile key={`${item.name}${item.label}`} cols={tile.cols || 1}>
      //     //   <img src={tile.img} alt={tile.title} />
      //     // </GridListTile>
      //   )}
      // </GridList>

    // console.log('data\n', data,);
    <div className="pt-16 sm:pt-0">
      <Grid container spacing={16}>
        {items && items.map((item, index,) => {
          // console.log('data\n', data,);
          const { id, } = item;
          console.log('id\n', id,);
          console.log('settings[id]\n', settings[id],);
          console.log('data[id]\n', data[id],);
          const itemData = settings[id] || data[id];
          // item.data = 
          return (
            <Grid
            // item key={`${item.name}${item.label}`}
              item key={item.id}
              // className={classes.gridList}
              className="widget flex w-full mx-16 sm:mx-0 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-16"
            >
              <DashboardWidget widget={item} index={index} count={count} data={itemData} />
            </Grid>
          )}
        )}
      </Grid>
    </div>
  );
}

DashboardWidgets.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default DashboardWidgets;
export default withStyles(styles)(DashboardWidgets);