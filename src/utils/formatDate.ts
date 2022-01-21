export default (date: string) => {
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const monthString = month > 9 ? month : `0${month}`;
  const day = newDate.getDate();
  const dayString = day > 9 ? day : `0${day}`;
  const hours = newDate.getHours();
  const hoursString = hours > 9 ? hours : `0${hours}`;
  const minute = newDate.getMinutes();
  const minuteString = minute > 9 ? minute : `0${minute}`;
  return `${dayString}/${monthString}/${newDate.getFullYear()}, ${hoursString}:${minuteString}`;
};
