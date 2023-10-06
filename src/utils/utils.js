export default function formatDate(dateString) {
  const parts = dateString.split("-");
  const year = parts[0];
  const day = parts[1];
  const month = parts[2];

  // Create a new Date object using the parts in the desired order
  const formattedDate = new Date(`${month}/${day}/${year}`);

  // Extract the individual components of the formatted date
  const formattedYear = formattedDate.getFullYear();
  const formattedMonth = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const formattedDay = String(formattedDate.getDate()).padStart(2, "0");

  // Return the formatted date string in the "MM/dd/yyyy" format
  return `${formattedMonth}/${formattedDay}/${formattedYear}`;
}

export function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const today = new Date();
  var formatDateTime = "";
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const timeString = dateTime.toLocaleTimeString("en-US", timeOptions);
  if (dateTime.toDateString() === today.toDateString()) {
    formatDateTime = `Today at ${timeString}`;
  } else {
    formatDateTime =
      dateTime.toLocaleString("en-US", options) + ` at ${timeString}`;
  }
  return formatDateTime;
}
