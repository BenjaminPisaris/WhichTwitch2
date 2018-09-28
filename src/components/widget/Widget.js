import React from 'react';
import InputFoo from '../searchBars';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
/*import API from '../../utils/API';*/
import axios from 'axios';
require('dotenv').config()


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
      axios.get(`https://api.twitch.tv/kraken/streams/featured?client_id=${process.env.TWITCH_CLIENT_ID}`)
      .then(function(response, error) {
        console.log(response, error)
      })
    }
   /* componentDidMount() {
      API.getChannels();
    }*/

   /* loadBooks = () => {
     
      .then(res => this.setState({channels: res.data}))
    }*/
    handleData(data) {
      this.setState({
        fromChild: data
      });
/*      TODO: Fix Mongoose so it actually communicates with the server
        API.saveChannel({
          channel: this.state.fromChild
        }).then(res => this.getChannels())
        .catch(err => console.log (err))
        console.log(`saved ${this.state.fromChild}`)*/
      
    }
  
    render() {
        if (this.state.fromChild !== undefined) {
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