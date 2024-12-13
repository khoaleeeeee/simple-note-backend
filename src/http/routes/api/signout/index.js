import post from "./post";
import { Router } from "express";

const signout = () => {
  const route = Router();

  route.post("/", post);

  return route;
};

export default signout;
