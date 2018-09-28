import React from 'react';
import InputFoo from '../searchBars';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
/*import API from '../../utils/API';*/
import axios from 'axios';


class Widget extends React.Component {
    constructor() {
      super();
      this.handleData = this.handleData.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this)
      this.state = {

        channels: [] ,
        fromChild: undefined
      };
    }
    goTo(route) {
      this.props.history.replace(`/${route}`)
    }
  
    componentDidMount() {
      axios.get(`https://api.twitch.tv/kraken/streams/featured?client_id=j8oznmn9dd181bi7n26529ytjx1kwd&?limit=15`)
      .then(function(response, error) {
        const returnedList = response.data.featured
        console.log(`returned list: ${returnedList}` )
        var channelList = []
        for (var i = 0; i < returnedList.length; i++) {
          channelList.push(returnedList[i].stream.channel.name)
        }
       console.log(`channel List: ${channelList}`)
        
        
      })
    }
   /* componentDidMount() {
      API.getChannels();
    }*/

   /* loadBooks = () => {
     
      .then(res => this.setState({channels: res.data}))
    }*/
    handleData(value) {
      this.setState({
        fromChild: value
      })
      console.log(`STATE :${this.state.fromChild}`);
      
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
         <button onClick={this.handleData}  value="ninja">Ninja</button><button value="shroud" onClick={this.handleData}>shroud</button><button value="timthetatman" onClick={this.handleData}>Timethetatman</button><button onClick={this.handleData} value="professornoxlive">professornoxlive</button>
        </div>
      );
    }
        
    }
  }
  export default Widget;