import events from "../../events";
import event from "./event";
import request from "./request";

const create = async (socket) => {
  const emitter = events.create();

  const handleRequest = async (msg) => {
    const { id, payload } = msg;
    const respond = (payload) =>
      socket.send(JSON.stringify({ type: "RESPONSE", payload, id }));
    emitter.emit("request", payload, respond);
  };

  const handleEvent = async (msg) => {
    emitter.emit("event", msg.payload);
  };

  const onMessage = async (msg) => {
    switch (msg.type) {
      case "EVENT":
        handleEvent(msg);
        break;
      case "REQUEST":
        handleRequest(msg);
        break;
      default:
        console.error("Unknown type:", type);
    }
  };

  const onClose = () => {
    emitter.emit("close");
    socket.off("message", onMessage);
  };

  const close = () => {
    socket.close();
  };

  socket.on("message", onMessage);
  socket.once("close", onClose);

  return {
    event,
    request,
    close,
    ...emitter,
  };
};

export default {
  create,
};
