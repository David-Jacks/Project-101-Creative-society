const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;

  // Log the error details
  console.error(`Error ${status}: ${message}`);
  return err;
};

module.exports.createError = createError;
