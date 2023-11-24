export const convertToCr = (value) => {
  return value / 10000000;
};

export const formatData = (timestamp) => {
  return new Date(timestamp).toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });
};
