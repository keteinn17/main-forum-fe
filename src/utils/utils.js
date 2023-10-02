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
