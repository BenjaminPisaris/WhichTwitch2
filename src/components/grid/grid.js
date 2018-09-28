import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};
import Card from '@material-ui/core/Card'
import _ from "lodash";
import Widget from '../widget'
import Draggable from "react-draggable";


/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
class ResponsiveLocalStorageLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      items: [].map(function(i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 6,
          h: 3,
          add: i === (list.length - 1).toString()
        };
      }),
      newCounter: 0
    }; 
    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }
  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 },
      rowHeight: 120
    };
   
  }
 
 

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }
  // We're using the cols coming back from this to calculate where to add new items.
  
  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }


  createElement(el) {
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el}>
        <Card style={{ width: '100%' }}>
            <Widget />
            </Card>
      </div>
    );
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: ((this.state.items.length * 6) + 12 ) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 6,
        h: 3,
        draggableHandle: "moveHere"
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }


  render() {
    return (
      <div>
        
        <button onClick={this.onAddItem}>Add Item</button>
        <button onClick={() => this.resetLayout()}>Reset Layout</button>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 12, sm: 6, xs: 6, xxs: 6 }}
          rowHeight={160}
          draggableHandle="thesewontmove"
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)}>
          <div key="1" data-grid={{ w: 6, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
            <Card style={{ width: '100%' }}>
            <Widget/>
            </Card>
          </div>
          <div key="2" data-grid={{ w: 6, h: 3, x: 7, y: 0, minW: 2, minH: 3 }}>
            <Card style={{ width: '100%' }}>
            <Widget />
            </Card>
          </div>
          {/*
                TODO: Add these back in when all 4 can be used and loaded back in with stream
          <div key="3" data-grid={{ w: 6, h: 3, x: 0, y: 6, minW: 2, minH: 3 }}>
            <Card style={{ width: '100%' }}>
            <Widget />
            </Card>
          </div>
          <div key="4" data-grid={{ w: 6, h: 3, x: 7, y: 6, minW: 2, minH: 3 }}>
            <Card style={{ width: '100%' }}>
              <Widget />
            </Card>
          </div>
          */}
          {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div >
    );
  }
}

module.exports = ResponsiveLocalStorageLayout;

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
