export const errorHandler = (req, res, next) => {
  let error;
  if (err instanceof mongoose.Error.CastError) {
    const message = `Bootcamp not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  } else if (err.code === 11000) {
    // Mongoose Duplicate key
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  } else if (err instanceof mongoose.Error.ValidationError) {
    // Mongoose Validation Error
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = new ErrorResponse(message, 400);
  } else {
    error = { ...err };
    error.message = err.message || "Server Error";
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message,
  });
};
