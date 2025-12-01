export function formatDateTime(isoString) {
  const date = new Date(isoString)

  const pad = (num) => String(num).padStart(2, '0')

  const day = pad(date.getDate())
  const month = pad(date.getMonth() + 1)
  const year = date.getFullYear()

  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())

  return `${day}.${month}.${year} ${hours}:${minutes}`
}