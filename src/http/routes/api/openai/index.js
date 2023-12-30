import autocomplete from "./autocomplete";
import { Router } from "express";

const openai = () => {
  const route = Router();

  route.post("/autocomplete", autocomplete);

  return route;
};

export default openai;
