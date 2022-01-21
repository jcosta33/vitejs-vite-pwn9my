export default (text: any) => {
  // eslint-disable-next-line no-restricted-globals
  if (text) {
    try {
      JSON.parse(text);
    } catch (e) {
      return false;
    }
    return true;
  }
  return false;
};
