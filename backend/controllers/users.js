const bcrypt = require("bcrypt");
const util = require("util");
const db = require("../dbconfig");
const query = util.promisify(db.query).bind(db);
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign({ id: user.id }, "JWT_SECRET", {
    expiresIn: "30d",
  });
  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };
  return {
    token,
    cookieOptions,
  };
};

exports.signup = async (req, res) => {
  try {
    let { username, password } = req.body;
    password = await bcrypt.hash(password, 12);
    const checkUserQuery = `select * from users where username="${username}"`;
    const isUser = await query(checkUserQuery);
    if (isUser.length > 0) {
      return res.json({
        message: "Username not available",
        success: false,
      });
    }
    let insertQuery = `insert into users (username,password) values ("${username}","${password}")`;
    const result = await query(insertQuery);
    res.json({
      messsage: "User registered Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let { username, password } = req.body;
    // password = await bcrypt.hash(password, 12);
    const checkUserQuery = `select * from users where username="${username}"`;
    const isUser = await query(checkUserQuery);
    if (isUser.length === 0) {
      return res.status(400).json({
        message: "User not reigstered",
        success: false,
      });
    }
    const validUser = await bcrypt.compare(password, isUser[0].password);
    if (!validUser) {
      return res.status(400).json({
        message: "Invalid Username or password",
        success: false,
      });
    }
    const { token, cookieOptions } = generateToken(isUser[0]);
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      data: token,
      success: true,
      message: "Login Successful",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

exports.isAuthenticated = async (req, res, next) => {
  let token;
  if (
    req.headers?.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      message: "Please login to continue!",
      success: false,
    });
  }
  let decoded_id;
  try {
    decoded_id = jwt.verify(token, "JWT_SECRET");
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Token invalid, please login again!",
      success: false,
    });
  }
  const checkUserQuery = `select * from users where id="${decoded_id.id}"`;
  const isUser = await query(checkUserQuery);
  if (isUser.length === 0) {
    return res.status(400).json({
      message: "User not logged in",
      success: false,
    });
  }
  req.user = decoded_id.id;
  next();
};
