import jwt from "jsonwebtoken";

export default function verifyToken(requiredAdmin = false) {
  return (req, res, next) => {
    let token;
    if (req.headers.postman === "postman") {
      token = req.headers.authorization;
    } else {
      token = req.cookies.Authorization?.split("Bearer ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    try {
      const tokenJwt = token.split(" ")[1];
      const decoded = jwt.verify(tokenJwt, process.env.SECRET_TOKEN);
      req.user = decoded;

      if (requiredAdmin && !decoded.isAdmin) {
        return res.status(403).json({ message: "Admin privileges required." });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
