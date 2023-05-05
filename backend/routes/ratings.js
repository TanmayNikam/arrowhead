const { updateRatings } = require("../controllers/ratings");
const { isAuthenticated } = require("../controllers/users");

const router = require("express").Router();

router.patch("/", isAuthenticated, updateRatings);

module.exports = router;
