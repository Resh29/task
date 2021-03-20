export const DateParser = (date) => {
  const currentDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
  for (let i = 0; i < currentDate.length; i++) {
    currentDate[i] = currentDate[i].toString();
  }
  return currentDate
    .map((d) => {
      if (d.length < 2) {
        return 0 + d;
      }
      return d;
    })
    .join('.');
};
