import React from 'react';
import InputFoo from '../searchBars';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import API , {getChannels} from '../../utils/API';

class Widget extends React.Component {
    constructor() {
      super();
      this.handleData = this.handleData.bind(this);
      this.state = {
        channels: [],
        fromChild: undefined
      };
    }
    componentDidMount() {
      this.getChannels();
    }
    handleData(data) {
      this.setState({
        fromChild: data
      });

        API.saveChannel({
          channel: this.state.fromChild
        }).then(res => this.getChannels())
        .catch(err => console.log (err))
        console.log(`saved ${this.state.fromChild}`)
      
    }
  
    render() {
        if (this.state.fromChild != undefined) {
            return (
               <div style={{ overflow: 'scroll'}}>
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