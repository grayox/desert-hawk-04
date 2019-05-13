// inspired by https://codesandbox.io/s/w3w89k7x8 | https://www.npmjs.com/package/react-infinite-scroll-component
// implements infinite scroll behavior

import React, { Component, } from 'react';
// import { render } from 'react-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { withStyles, CircularProgress, } from '@material-ui/core';

// const style = {
//   height: 60, // 30
//   border: '1px solid green',
//   margin: 6,
//   padding: 8,
// };

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  item: {
    height: 60, // 30
    border: '1px solid green',
    margin: 6,
    padding: 8,
  }
});

class CRUDList extends Component {
  state = {
    items: Array.from({ length: 20 }),
    hasMore: true
  };

  fetchMoreData = () => {
    if (this.state.items.length >= 500) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 500);
  };

  render() {
    const { classes, } = this.props;
    return (
      <div>
        {
        // <h1>demo: react-infinite-scroll-component</h1>
        // <hr />
        }
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<CircularProgress className={classes.progress} color="secondary" />} //{<h4>Loading...</h4>}
          height={window.innerHeight - 128} // {800} {400} 
          // endMessage={
          //   <p style={{ textAlign: "center" }}>
          //     <b>Yay! You have seen it all</b>
          //   </p>
          // }
          endMessage="End of list"
        >
          {this.state.items.map((i, index) => (
            // <div style={style} key={index}>
            <div className={classes.item} key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

// export default CRUDList;
export default withStyles(styles)(CRUDList);
// export default compose(
//   withStyles(styles),
//   withWidth(),
//   connect( mapStateToProps, mapDispatchToProps, ),
// )(CRUDList);