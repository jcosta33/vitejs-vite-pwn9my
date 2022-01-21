/* eslint-disable no-bitwise */
export default (string: string) => {
  let hash = 0;
  if (string.length === 0) {
    return hash.toString();
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash &= hash; // Convert to 32bit integer
  }
  return hash.toString();
};
