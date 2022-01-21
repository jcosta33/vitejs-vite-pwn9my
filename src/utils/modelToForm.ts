export default (model: any, form: any) => {
  Object.keys(form).forEach((key) => {
    const value = `${model[key]}`;
    form[key] = { ...form[key], value };
  });

  return form;
};
