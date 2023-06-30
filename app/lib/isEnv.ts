import { defaultTo, pathEq } from "ramda";

export const isProduction = () =>
  pathEq("production", ["env", "NODE_ENV"])(defaultTo({}, process));
export const isDevelopment = () =>
  pathEq("development", ["env", "NODE_ENV"])(defaultTo({}, process));
