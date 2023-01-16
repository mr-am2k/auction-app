export const getDateString = (date: string) => {
  const returnDate = new Date(date);

  return (`${returnDate.getDate()} ${returnDate.toLocaleString('default', { month: 'long' })} ${returnDate.getFullYear()}`)
};
