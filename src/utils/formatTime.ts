export function formatTime(seconds: number) {
  if (isNaN(seconds) || seconds <= 0) {
    return "Invalid input";
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
  return formattedTime;
}

export function pad(num: number) {
  return num < 10 ? `0${num}` : num;
}

export function startTimeForList(startDatetime: Date) {
  return new Date(startDatetime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function datetimeForEdit(datetime: Date) {
  const dt = new Date(datetime);
  const year = dt.getFullYear(),
    month = String(dt.getMonth() + 1).padStart(2, "0"),
    day = String(dt.getDate()).padStart(2, "0"),
    hour = String(dt.getHours()).padStart(2, "0"),
    minute = String(dt.getMinutes()).padStart(2, "0"),
    seconds = String(dt.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hour}:${minute}:${seconds}`;
}
