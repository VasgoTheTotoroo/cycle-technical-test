import { readFileSync } from "fs";

const clapType = readFileSync("./graphql/schemas/clap.graphql", {
  encoding: "utf-8",
});
const todoType = readFileSync("./graphql/schemas/todo.graphql", {
  encoding: "utf-8",
});
const userType = readFileSync("./graphql/schemas/user.graphql", {
  encoding: "utf-8",
});

export const typeDefs = [clapType, todoType, userType];
