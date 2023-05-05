const util = require("util");
const db = require("../dbconfig");
const { addToNotionDatabase } = require("./notion");
const query = util.promisify(db.query).bind(db);
const jwt = require("jsonwebtoken");

exports.updateRatings = async (req, res) => {
  try {
    const userid = req.body?.userid ? req.body?.userid : getUser(req);
    let { movieid, rating } = req.body;
    let sqlQuery = `select * from ratings where movie_id=${movieid} and user_id=${userid}`;
    const resp = await query(sqlQuery);
    let query2;
    if (resp.length === 0) {
      query2 = `insert into ratings (movie_id,user_id,rating) values(${movieid},${userid},${rating})`;
    } else {
      query2 = `update ratings set rating=${rating} where movie_id=${movieid} and user_id=${userid}`;
    }
    const response = await query(query2);
    res.json({
      messsage: "Ratings Updated",
      success: true,
    });
    await addToNotionDatabase(userid, movieid, rating);
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
    });
  }
};

const getUser = (req) => {
  let token;
  if (
    req.headers?.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  let decoded_id;
  decoded_id = jwt.verify(token, "JWT_SECRET");
  return decoded_id.id;
};
