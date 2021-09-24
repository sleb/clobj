const clobj = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (typeof obj === "function") {
    return obj.bind({});
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

  if (Array.isArray(obj)) {
    return copyObject(obj, []);
  }

  return copyObject(obj, {});
};

const copyObject = (from, to) => {
  for (const key of Object.getOwnPropertyNames(from)) {
    to[key] = clobj(from[key]);
  }
  return to;
};

export { clobj };
