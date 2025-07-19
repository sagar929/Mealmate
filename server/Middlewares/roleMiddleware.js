module.exports = (req, res, next) => {
  // You can get user info from req.user if using JWT, or from req.body for simple demo
  const { usermail, password } = req.body;

  if (usermail === "thappa@gmail.com" && password === "thappa") {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied: Not a manager" });
  }
};