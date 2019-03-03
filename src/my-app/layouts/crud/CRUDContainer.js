import React, { Component } from 'react';
import {
  Route,
  // BrowserRouter as Router, Link 
} from "react-router-dom";

import { componentsNavConfig } from 'my-app/config/AppConfig';
import CRUDView from './CRUDView';
import Loading from 'my-app/components/Loading.js';
import ErrorMaintenance from 'my-app/components/ErrorMaintenance.js';

// firebase
import firebase from '@firebase/app';
import '@firebase/firestore';
// const db = firebase.firestore();
// const path = 'leads';

class CRUDContainer extends Component {
  state = {
    items: [],
    path: null,
    isError: false,
    isLoading: true,
    isSubscribed: true,
  };

  // componentDidMount() {
  //   path && this.getItems(path);
  // }

  // componentWillUnmount () {
  //   // cancel subscriptions and async tasks to stop memory leaks
  //   this.unsubscribe(this.path);
  // }

  // unsubscribe = path => path && firebase.firestore().collection(path).onSnapshot(() => {})

  getItems = path => {
    // console.log('path\n', path);
    // console.log('state\n', this.state);
    // this.setState({isLoading: true}); // infinite loop?
    
    if(this.state.isSubscribed) {
      console.log('state\n', this.state);
      // debugger;
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
          querySnapshot.forEach(doc => {
            // doc.data() is always defined for query doc snapshots
            // console.log(doc.id, '\n', doc.data());
            // console.log('timestamp: ', doc.timestamp()); // throws error // must define timestamp, then save it
            // console.log('timestamp: ', doc.get('created_at')); // undefined
            // console.log('id: ', doc.id); // works
            // console.log('data\n', doc.data()); // works
            out.push(doc.data());
            // console.log('out\n', out);
            // this.setState(out);
          });
          return out;
        })
        .then(result => {
          // always set state inside promise!
          // otherwise, function returns before data loads!
          console.log('result', result);
          const newState = {
            path,
            items: result,
            isError: false,
            isLoading: false,
            isSubscribed: false,
          };
          this.setState(newState);
          // debugger;
          return result;
        })
        // .then(() => {
        //   this.unsubscribe(path);
        //   return path;
        // })
        .catch(error => {
          console.error('Error getting documents: \n', error);
          const newState = {
            isError: true,
            isLoading: false,
            isSubscribed: false,
          };
          this.setState(newState);
        });
      // console.log('out\n', out); // returns before promise settles; therefore, returns empty array
      // always set state inside promise!
      // otherwise, function returns before data loads!
      // return out;
      // const newState = { items: out };
      // this.setState(newState);
    }
  };

  Child = /* async */ ({ match: { params: { id }}}) => {
    // console.log('id\n', id);
    // if(!this.state.isLoading) this.setState({isLoading: true});
    const { getItems } = this;
    const { items, isLoading, isError, } = this.state; // isSubscribed,
    const matches = componentsNavConfig.filter(r => (r.id === id));
    const item = matches[0];
    const config = item.crudConfig;
    // console.log('config\n', config);
    const { condensed, actionable, creatable, readable, updatable, deletable, } = config;
    const path = readable;
    // console.log('path\n', path);
    // const items = await getItems(path);
    // this.setState({ path, });
    // this.unsubscribe(await getItems(path));
    // if(!isSubscribed) return;
    getItems(path);
    // console.log('items\n', items);
    return (
      isLoading
      ?
      <Loading />
      :
      (
        isError
        ?
        <ErrorMaintenance />
        :
        (items && (
        <CRUDView
          items={items}
          condensed={condensed}
          actionable={actionable}
          creatable={creatable}
          readable={readable}
          updatable={updatable}
          deletable={deletable}
        />
      )))
    )
  };


  render() {
    // const { isLoading, } = this.state;
    const { Child, } = this;

    return (
      // ref: https://reacttraining.com/react-router/web/example/url-params
      <Route path="/:id" component={Child} />
    );
  }
}

export default CRUDContainer;
