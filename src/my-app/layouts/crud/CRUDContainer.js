import React, { Component } from 'react';
import {
  Route,
  // BrowserRouter as Router, Link 
} from "react-router-dom";

import { componentsNavConfig } from 'my-app/config/AppConfig';
import CRUDView from './CRUDView';

// firebase
import firebase from '@firebase/app';
import '@firebase/firestore';
// const db = firebase.firestore();
const path = 'leads';

class CRUDContainer extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    this.getItems(path);
  }

  getItems(path) {
    const out = [];
    const db = firebase.firestore();
    if(!db) return;
    db.collection(path)
      // .orderBy('added_at', 'desc')
      // .orderBy('created_at', 'desc')
      .orderBy('timestamp', 'desc')
      // .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => 
          // doc.data() is always defined for query doc snapshots
          // console.log(doc.id, '\n', doc.data());
          // console.log('timestamp: ', doc.timestamp()); // throws error // must define timestamp, then save it
          // console.log('timestamp: ', doc.get('created_at')); // undefined
          // console.log('id: ', doc.id); // works
          // console.log('data\n', doc.data()); // works
          out.push(doc.data())
          // console.log('out\n', out);
          // this.setState(out);
          // return out;
        );
        return out;
      })
      .then(result => {
          // always set state inside promise!
          // otherwise, function returns before data loads!
          // console.log('result', result);
          const newState = { items: result };
          this.setState(newState);
        })
      .catch(error => {
        console.log('Error getting documents: \n', error);
      });
    // console.log('out\n', out); // returns before promise settles; therefore, returns empty array
    // always set state inside promise!
    // otherwise, function returns before data loads!
    // return out;
    // const newState = { items: out };
    // this.setState(newState);
  };
  render() {
    const { items } = this.state;

    const Child = ({ match: { params: { id }}}) => {
      const matches = componentsNavConfig.filter(r => (r.id === id));
      const item = matches[0];
      const config = item.crudConfig;
      const { condensed, actionable, creatable, readable, updatable, deletable, } = config;
      return (
        <CRUDView
          items={items}
          condensed={condensed}
          actionable={actionable}
          creatable={creatable}
          readable={readable}
          updatable={updatable}
          deletable={deletable}
        />
      )
    };

    return (
      // ref: https://reacttraining.com/react-router/web/example/url-params
      <Route path="/:id" component={Child} />
    );
  }
}

export default CRUDContainer;