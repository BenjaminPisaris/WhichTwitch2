const router = require("express").Router();
const channelscontroller = require("../../controllers/channelscontroller");

// Matches with "/api/channels"
router.route("/")
  .get(channelscontroller.findAll)
  .post(channelscontroller.create);


module.exports = router;
