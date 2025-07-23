const getDaysAgo = (dateString) => {
  const createdDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - createdDate);
  const diffDays = Math.floor(diffTime / (24 * 60 * 60 * 1000));

  if (diffDays === 0) return "Today";
  if (diffDays === 0) return "1 day ago";
  return `${diffDays} days ago`;
};

export default getDaysAgo;
