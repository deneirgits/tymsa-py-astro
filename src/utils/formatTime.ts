export function formatTime(seconds: number) {
  if (isNaN(seconds) || seconds < 0) {
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
