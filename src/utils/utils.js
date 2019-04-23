export const isEmpty = data => {
  if (!data || Object.keys(data).length === 0) return true;

  return Object.keys(data)
    .filter(item => data[item] ? data[item].length === 0 : true)
    .length > 0
};

const dateRegForm = /\d+\/\d+\/\d+/;

const dateFormCheck = data => dateRegForm.test(data);

export const dateCompare = (date1, date2) => {
  if (dateFormCheck(data1) === false || dateFormCheck(data2) === false) throw new Error('invalid form of date');
  const date1Raw = date1.split('/');
  const date2Raw = date2.split('/');
  if ( date1Raw.length !== 3 || date2Raw.length !== 3 ) throw new Error('invalid form of date');
  if (parseInt(date1Raw[2]) > parseInt(date2Raw[2]) || parseInt(date1Raw[1]) > parseInt(date2Raw[1]) || parseInt(date1Raw[0]) > parseInt(date2Raw[0])) return '>';
  if (parseInt(date1Raw[2]) < parseInt(date2Raw[2]) || parseInt(date1Raw[1]) < parseInt(date2Raw[1]) || parseInt(date1Raw[0]) < parseInt(date2Raw[0])) return '<';
  return '=';
}

export const arrayReplace = (array, index, value) => [...array.slice(0, index), value, ...array.slice(index + 1)];

export const arrayRemove = (array, index) => [...array.slice(0, index), ...array.slice(index + 1)];