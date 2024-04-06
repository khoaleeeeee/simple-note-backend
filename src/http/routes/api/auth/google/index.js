import { Router } from "express";
import get from "./get";

const google = () => {
  const route = Router();

  route.get("/", get);

  return route;
};

export default google;
