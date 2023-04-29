import jwt from "jsonwebtoken";

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
