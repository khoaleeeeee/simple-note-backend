import { Router } from "express";
import get from "./get";
import update from "./update";

const settings = () => {
  const route = Router();

  route.get("/", get);
  route.post("/", update);

  return route;
};

export default settings;
