export const isEmpty = data => {
  if (!data || Object.keys(data).length === 0) return true;

  return Object.keys(data)
    .filter(item => data[item] ? data[item].length === 0 : true)
    .length > 0
};
