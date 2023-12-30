import { Router } from "express";
import get from "./get";
import add from "./add";
import remove from "./remove";

const notes = () => {
  const route = Router();

  route.get("/", get);
  route.post("/", add);
  route.delete("/", remove);

  return route;
};

export default notes;
