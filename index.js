const clobj = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof ArrayBuffer) {
    return obj.slice();
  }

  if (ArrayBuffer.isView(obj)) {
    return obj.subarray(0);
  }

  // if (obj instanceof Set) {
  // const newArr = [];
  // copy([createCopyFrame(obj, newArr)]);
  // return new Set(newArr);
  // }

  if (Array.isArray(obj)) {
    const newArr = new Array(obj.length);
    copy([createCopyFrame(obj, newArr)]);
    return newArr;
  }

  const newObj = {};
  copy([createCopyFrame(obj, newObj)]);
  return newObj;
};

const createCopyFrame = (from, to) => ({
  from,
  to,
  keys: Object.getOwnPropertyNames(from),
});

const copy = (frames) => {
  while (frames.length !== 0) {
    const { from, to, keys } = frames.pop();
    for (const key of keys) {
      const obj = from[key];
      if (obj === null || typeof obj !== "object") {
        to[key] = obj;
      } else if (obj instanceof Date) {
        to[key] = new Date(obj.getTime());
        // } else if (obj instanceof Set) {
        // const newArr = [];
        // frames.push(createCopyFrame(obj, newArr));
        // to[key] = newArr;
      } else if (obj instanceof ArrayBuffer) {
        to[key] = obj.slice();
      } else if (ArrayBuffer.isView(obj)) {
        to[key] = obj.subarray(0);
      } else if (Array.isArray(obj)) {
        const newArr = [];
        frames.push(createCopyFrame(obj, newArr));
        to[key] = newArr;
      } else {
        const newObj = {};
        frames.push(createCopyFrame(obj, newObj));
        to[key] = newObj;
      }
    }
  }
};

module.exports = { clobj };
