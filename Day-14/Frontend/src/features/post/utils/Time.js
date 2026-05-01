export const getTimeAgo = (time) => {
  const now = new Date();
  const postTime = new Date(time);
  const diff = Math.floor((now - postTime) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";

  return Math.floor(diff / 86400) + "d ago";
};