const rfdc = require("rfdc");
const Benchmark = require("benchmark");
const { clobj } = require(".");
const data = require("./package-lock.json");

const suite = new Benchmark.Suite();

const rfdcDefault = rfdc();
suite
  .add("rfdc", () => {
    rfdcDefault(data);
  })
  .add("clobj", () => {
    clobj(data);
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", () => {
    console.log("Fastest is " + suite.filter("fastest").map("name"));
  })
  .run({ async: true });
