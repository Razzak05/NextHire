export const handleError = (err, res) => {
  console.error(err);
  return res.json({
    error: err.message || err,
    message: "Internal Server Error",
    success: false,
  });
};
