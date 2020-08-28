export const decodeMessage = (data) => {
  let message = '';
  Object.keys(data).map((key) => (message += `${key}: ${data[key]}\n`));
  alert(message);
};
