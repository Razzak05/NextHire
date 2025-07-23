const getInitials = (fullName) => {
  const words = fullName.split(" ");
  const initials = words
    .slice(0, 2)
    .map((name) => name[0].toUpperCase())
    .join("");
  return initials;
};

export default getInitials;
