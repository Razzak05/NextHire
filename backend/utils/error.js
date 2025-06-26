export const handleError = (err, res) => {
  console.log(err);
  return res.json({
    message: "Internal Server Error",
    success: false,
  });
};
