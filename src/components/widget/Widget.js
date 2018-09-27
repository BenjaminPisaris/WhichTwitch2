import React from 'react';
import InputFoo from '../searchBars';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
class Widget extends React.Component {
    constructor() {
      super();
      this.handleData = this.handleData.bind(this);
      this.state = {
        fromChild: null
      };
    }
    
    handleData(data) {
      this.setState({
        fromChild: data
      });
    }
  
    render() {
        if (this.state.fromChild != null) {
            return (
               <div>
                <ReactTwitchEmbedVideo width='100%' layout="video" channel={this.state.fromChild}/>
                </div>
            );
        } else {
      return (
        <div>
          <InputFoo  handlerFromParent={this.handleData} /> 
        </div>
      );
    }
        
    }
  }
  export default Widget;