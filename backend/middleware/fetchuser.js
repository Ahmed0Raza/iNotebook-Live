const jwt = require('jsonwebtoken');
const JWT_SECRET = 'safestring';

const fetchuser = (req, res, next) => {
  // Get the token from the header
  const token = req.header('auth-token');
  
  if (!token) {
    console.error("No token provided");
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    // Verify the token and extract the user data
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // Assign user data to req.user
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message); // Log JWT verification error
    // Check for specific JWT error types
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ error: "Token has expired. Please login again." });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({ error: "Invalid token. Please authenticate using a valid token" });
    } else {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
}

module.exports = fetchuser;
