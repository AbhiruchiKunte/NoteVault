export function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: '2-digit', // Added hour
    minute: '2-digit' // Added minute
  });
}