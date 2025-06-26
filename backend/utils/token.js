import jwt from "jsonwebtoken";

const genToken = (userId, role) => {
  return jwt.sign(
    { user: { id: userId, role: role } },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export default generateToken;
