export default (property: string, order: string, data: any) => {
  const dotIndex = property.indexOf('.');

  let childProp: any;

  if (dotIndex > -1) {
    childProp = property.slice(dotIndex + 1, property.length);
    property = property.slice(0, dotIndex);
  }
  return data.sort((prev: any, next: any) => {
    let lesser = -1;
    let higher = 1;

    const prevProp: string = childProp ? prev[property][childProp] : prev[property];
    const nextProp: string = childProp ? next[property][childProp] : next[property];

    const prevTag = `${prevProp}`.toLowerCase();
    const nextTag = `${nextProp}`.toLowerCase();

    if (property.indexOf('date') > -1) {
      lesser = 1;
      higher = -1;
    }

    if (order === 'asc') {
      if (prevTag < nextTag) {
        return lesser;
      }

      if (prevTag > nextTag) {
        return higher;
      }
    } else {
      if (prevTag > nextTag) {
        return lesser;
      }
      if (prevTag < nextTag) {
        return higher;
      }
    }

    return 0;
  });
};
