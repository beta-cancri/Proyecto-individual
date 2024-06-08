export function formatReleaseDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Add leading zero
    const day = (`0${date.getDate()}`).slice(-2); // Add leading zero
    return `${year}-${month}-${day}`;
  }