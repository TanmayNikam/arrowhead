const util = require("util");
const db = require("../dbconfig");
const query = util.promisify(db.query).bind(db);

exports.addWatchlist = async (req, res) => {
  try {
    const { movieid } = req.body;
    let userQuery = `insert into watched (user_id,movie_id,watched) values(${req.user},${movieid},1)`;
    const addQuery = await query(userQuery);
    res.status(201).json({ message: "Added to the Watchlist", success: true });
  } catch (error) {
    let message = error.message;
    if (error?.sqlMessage.includes("Duplicate entry"))
      message = "Already added to Watchlist";
    res.json({
      message,
      success: false,
    });
  }
};

exports.removeWatchList = async (req, res) => {
  try {
    const { movieid } = req.query;
    let removeQuery = `delete from watched where user_id=${req.user} and movie_id=${movieid}`;
    const response = await query(removeQuery);
    res.status(200).json({ message: "Removed from Watchlist", success: true });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
    });
  }
};
