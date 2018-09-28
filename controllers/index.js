const router = require("express").Router();
const channelRoute = require("./channelscontroller");

// Book routes
router.use("/channels", channelRoute);

module.exports = router;
