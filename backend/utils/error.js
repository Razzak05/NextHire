export const handleError = (err, res) => {
  return res.json({
    error: err,
    message: "Internal Server Error",
    success: false,
  });
};
