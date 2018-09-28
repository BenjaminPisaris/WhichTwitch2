import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};
import Card from '@material-ui/core/Card'
import _ from "lodash";
import Widget from '../widget'
/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
class ResponsiveLocalStorageLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    }; 
    
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
        
        <button onClick={() => this.resetLayout()}>Reset Layout</button>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 12, sm: 6, xs: 6, xxs: 6 }}
          rowHeight={160}
         
      
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)}
        >
          
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

if (require.main === module) {
  require("../texthook")(module.exports);
}