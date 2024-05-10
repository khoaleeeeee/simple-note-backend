import get from "./get";
import { Router } from "express";

const users = () => {
  const route = Router();

  route.get("/", get);

  return route;
};

export default users;
