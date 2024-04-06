import { Router } from "express";
import google from "./google";

const auth = () => {
  const route = Router();

  route.use("/google", google());

  return route;
};

export default auth;
