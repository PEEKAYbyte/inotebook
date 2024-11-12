var jwt = require("jsonwebtoken");
const JWT_SCRET = "jNE LEJ JELA";

const fetchuser = (req, res, next) => {
  // get user from jwt token add id
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate with vaalid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SCRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({error:"please authenticate using a valid token"})
  }
};

module.exports = fetchuser;
