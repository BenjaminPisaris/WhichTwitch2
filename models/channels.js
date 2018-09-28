var mongoose = require("mongoose")
const Schema = mongoose.Schema;


const channellist = new Schema ({
    channel: {type: "string", required: true}}

)
const channels = mongoose.model("Channels", channellist);

module.exports = {
    channels
}