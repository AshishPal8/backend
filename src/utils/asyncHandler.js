const asyncHandler = (requestHandleer) => {
  return (req, res, next) => {
    Promise.resolve(requestHandleer(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
