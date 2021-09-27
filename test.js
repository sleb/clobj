const test = require("ava");
const { clobj } = require(".");

test("numbers", (t) => {
  for (const num of [-42, 0, 42]) {
    t.is(clobj(num), num);
  }
});

test("strings", (t) => {
  for (const str of ["", "a string"]) {
    t.is(clobj(str), str);
  }
});

test("boolean", (t) => {
  for (const b of [true, false]) {
    t.is(clobj(b), b);
  }
});

test("BigInt", (t) => {
  for (const n of [-9007199254740992n, 0n, 9007199254740992n]) {
    t.is(clobj(n), n);
  }
});

test("Symbol", (t) => {
  const sym = Symbol("sym");
  t.is(clobj(sym), sym);
});

test("function", (t) => {
  const f = () => {};
  t.is(clobj(f), f);
});

test("null", (t) => {
  const n = null;
  t.is(clobj(n), n);
});

test("undefined", (t) => {
  const u = undefined;
  t.is(clobj(u), u);
});

test("dates", (t) => {
  for (const d of [new Date(-123456789), new Date(0), new Date(123456789)]) {
    t.not(clobj(d), d);
    t.deepEqual(clobj(d), d);
  }
});

test("TypedArrays", (t) => {
  const view = Int8Array.of(-1, 0, 1);
  for (const arr of [view, view.buffer]) {
    t.not(clobj(arr), arr);
    t.deepEqual(clobj(arr), arr);
  }
});

test("Sets", (t) => {
  const s = new Set([1, 3, 5]);
  t.not(clobj(s), s);
  t.deepEqual(clobj(s), s);
});

test("arrays", (t) => {
  for (const arr of [[], [1, 2, 3], [1, [2, [3, [4, 5]]]]]) {
    t.not(clobj(arr), arr);
    t.deepEqual(clobj(arr), arr);
  }
});

test("objects", (t) => {
  for (const obj of [
    {},
    { 1: "one", 2: "two", 3: "three" },
    { 1: { 2: { 3: 456 } } },
  ]) {
    t.not(clobj(obj), obj);
    t.deepEqual(clobj(obj), obj);
  }
});
