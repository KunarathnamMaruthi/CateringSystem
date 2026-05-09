const jwt = require("jsonwebtoken");

<<<<<<< HEAD
module.exports = function (req, res, next) {
  const header = req.headers.authorization;
=======
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
>>>>>>> faed3db (Save remaining changes)

<<<<<<< HEAD
  if (!header || !header.startsWith("Bearer ")) {
=======
  if (!authHeader) {
<<<<<<< HEAD
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
    return res.status(401).json({ message: "No token provided" });
=======
    return res.status(401).json({
      message: "No token provided",
    });
>>>>>>> faed3db (Save remaining changes)
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
<<<<<<< HEAD
<<<<<<< HEAD
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next(); // ✅ MUST be here
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
=======
    const decoded = jwt.verify(token, "secret"); // keep consistent with your login
=======
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

>>>>>>> faed3db (Save remaining changes)
    req.user = decoded;

    next();

  } catch (err) {
<<<<<<< HEAD
    res.status(401).json({ message: "Invalid token" });
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
=======
    res.status(401).json({
      message: "Invalid token",
    });
>>>>>>> faed3db (Save remaining changes)
  }
};

module.exports = auth;