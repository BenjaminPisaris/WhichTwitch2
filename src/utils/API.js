import axios from "axios";

export default {
  // Gets all channels
  getChannels: function() {
    return axios.get("/api/channels");
  },// Saves a channel to the database
  saveChannel: function(channel) {
    return axios.post("/api/channels", channel);
  }
};