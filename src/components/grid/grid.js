import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import Widget from '../widget';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};
import Card from '@material-ui/core/Card'
import * as _ from "lodash";

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
class ResponsiveLocalStorageLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    }; 
    
    this.state = {
      items: [].map(function(i, key, list) {
        return {
          i: i.toString(),
          x: i * 6,
          y: 0,
          w: 2,
          h: 2,
          add: i === (list.length - 1).toString()
        };
      }),
      newCounter: 0
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }
  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el}>
            <Card style={{ width: '100%' }}>
              <div  >Drag here</div><Widget />
            </Card>
      </div>
    );
  }
  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: ((this.state.items.length * 6) + 2),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 3
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
    this.onLayoutChange()
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }


  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 },
      rowHeight: 120
    };
  }
 
 

  // We're using the cols coming back from this to calculate where to add new items.
  
  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  render() {
    return (
      <div>
          <button onClick={this.onAddItem}>Add Item</button>
        <button onClick={() => this.resetLayout()}>Reset Layout</button>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 }}
          rowHeight={140}
          layouts={this.state.layouts}
          onLayoutChange={(layout) => this.onLayoutChange(layout)}    >
          
          <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
            <Card style={{ width: '100%' }}>
              <div  >Drag here</div><Widget />
            </Card>
          </div>
          <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}>
            <Card style={{ width: '100%' }}>
              <div  >Drag here</div><Widget />
            </Card>
          </div>
          <div key="3" data-grid={{ w: 2, h: 3, x: 0, y: 6, minW: 2, minH: 3 }}>
            <Card style={{ width: '100%' }}>
              <div  >Drag here</div><Widget />
            </Card>
          </div>
          <div key="4" data-grid={{ w: 2, h: 3, x: 2, y: 6, minW: 2, minH: 3 }}>
            <Card style={{ width: '100%' }}>
              <div  >Drag here</div><Widget />
            </Card>
          </div>
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
      ls = JSON.parse(global.localStorage.getItem("rgl-9")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-9",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

if (require.main === module) {
  require("../texthook")(module.exports);
}