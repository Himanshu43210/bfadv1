export const sanitizeFormData = (data) => {
  let sanitizedData = { ...data }; // Copy the original formData

  // Loop through each key in the data
  for (let key in sanitizedData) {
    if (
      sanitizedData[key] &&
      typeof sanitizedData[key] === "object" &&
      "value" in sanitizedData[key]
    ) {
      sanitizedData[key] = sanitizedData[key].value;
    }
  }

  return sanitizedData;
};

export const filterAutofillData = (autofill, data) => {
  return autofill.reduce((acc, key) => {
    if (data[key]) {
      acc[key] = data[key];
    }
    return acc;
  }, {});
};
