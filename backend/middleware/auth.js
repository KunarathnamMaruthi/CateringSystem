const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.headers.authorization;

<<<<<<< HEAD
  if (!header || !header.startsWith("Bearer ")) {
=======
  if (!authHeader) {
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
    return res.status(401).json({ message: "No token provided" });
  }

  // Support "Bearer token"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
<<<<<<< HEAD
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next(); // ✅ MUST be here
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
=======
    const decoded = jwt.verify(token, "secret"); // keep consistent with your login
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
  }
};