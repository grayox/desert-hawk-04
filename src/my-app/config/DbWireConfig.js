// import React from 'react';

// batch.set(
//   // db.collection('dashboard').doc(uid),
//   db.collection('settings').doc(uid),
//   {
//     dashboard: {
//       net: getIncrement(1), 
//       deposits: getIncrement(1),
//       outbox: getIncrement(1),
//     },
//   },
//   { merge: true, },
// );
// batch.set(
//   db.collection('stats').doc('level_2'),
//   {
//     leads: {
//       deposited: getIncrement(1),
//     },
//   },
//   { merge: true, },
// );
// batch.set(
//   db.collection('stats').doc('level_1'),
//   {
//     leads: {
//       geoLocations: {
//         [settings.geoNation]: {
//           [settings.geoRegion]: {
//             [settings.geoLocal]: {
//               [newData.bizCategory]: getIncrement(1),
//             },
//           },
//         },
//       },
//       zipCodes: {
//         [newData.zipInput.zip]: {
//           [geoLocationKey]: getIncrement(1),
//         },
//       },
//     },
//   },
//   { merge: true, },
// );

export const getBatchWriteConfig_createItem= ({ getIncrement, uid, settings, newData, }) => {
  const geoLocationKey = [ settings.geoNation, settings.geoRegion, settings.geoLocal, ].join(' | ');
  const geoLocationTypeKey = [ geoLocationKey, newData.bizCategory, ].join(' | ');
  const out = [
    {
      collection: 'settings',
      doc: uid,
      data: {
        dashboard: {
          net: getIncrement(1), 
          deposits: getIncrement(1),
          outbox: getIncrement(1),
        },
      },
    },
    {
      collection: 'stats',
      doc: 'level_1',
      data: {
        leads: {
          geoLocations: {
            // [settings.geoNation]: {
            //   [settings.geoRegion]: {
            //     [settings.geoLocal]: {
            //       [newData.bizCategory]: getIncrement(1),
            //     },
            //   },
            // },
            [geoLocationTypeKey]: getIncrement(1),
          },
        },
      },
    },
    {
      collection: 'stats',
      doc: 'level_2',
      data: {
        leads: {
          deposited: getIncrement(1),
        },
        zipCodes: {
          [newData.zipInput.zip]: {
            [geoLocationKey]: getIncrement(1),
          },
        },
      },
    },
  ];
  return out;
}