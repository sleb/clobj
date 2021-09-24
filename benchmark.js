import rfdc from "rfdc";
import Benchmark from "benchmark";
import { clobj } from "./index.js";
import { readFile } from "fs/promises";

const data = readFile("./package-lock.json").then((value) => value.toJSON());

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
