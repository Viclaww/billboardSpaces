export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    // year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options).replace(" at", "th at");
};
