import {combineReducers} from  'redux';
import Channelreducer from './reducers-streamers'

const Allreducers =  combineReducers({
    channel: Channelreducer
});

export default Allreducers;

