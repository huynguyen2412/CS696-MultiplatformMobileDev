export const validateName = (name) => {
  let validRegex = new RegExp(/^[a-zA-Z\s]*/$);
  return validRegex.test(name);
};


