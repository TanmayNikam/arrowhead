const router = require("express").Router();
const { isAuthenticated } = require("../controllers/users");
const { addWatchlist, removeWatchList } = require("../controllers/watchlist");

router.post("/", isAuthenticated, addWatchlist);
router.delete("/", isAuthenticated, removeWatchList);

module.exports = router;
