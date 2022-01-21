export default (imageSrc: string, good: () => void, bad: () => void) => {
  if (imageSrc) {
    const img = new Image();
    img.onload = good;
    img.onerror = bad;
    img.src = imageSrc;
  }
};
