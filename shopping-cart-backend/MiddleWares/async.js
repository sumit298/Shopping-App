export const asyncHandler = (req, res, next) => {
  Promise.resolve((req, res, next)).catch(next);
};
