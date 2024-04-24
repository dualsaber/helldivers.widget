export function countdown(time) {
  const days = Math.floor(time / 86_400);
  const hours = Math.floor((time % 86_400) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;

}