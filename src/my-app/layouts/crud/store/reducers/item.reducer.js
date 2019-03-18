// inspired by: src/my-app/store/reducers/my-reducers/leadsReducer.js
// There is no reducer for firebase actions to save items.
// Because the data is stored to firebase, not to app state

import * as Actions from '../../actions/fuse/index';

const initState = {
  items: [
    {id: '1', title: 'help me find peach', content: 'blah blah blah'},
    {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
    {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
  ]
}

const itemsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ITEM_SUCCESS':
      console.log('create item success');
      return state;
    case 'CREATE_ITEM_ERROR':
      console.log('create item error');
      return state;
    default:
      return state;
  }
};

export default itemsReducer;