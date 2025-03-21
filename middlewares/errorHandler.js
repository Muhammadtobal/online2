const errorHandler = (err, req, res, next) => {
  console.log("Error Handler: ", err);


  const isJoiError = err && (err.isJoi || err.name === "ValidationError");
  if (isJoiError) {
    return res.status(400).json({
      success: false,
      message: err.details?.[0]?.message || "Validation Error",
    });
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
    });
  }


  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;