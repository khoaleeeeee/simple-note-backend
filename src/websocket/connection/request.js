import crypto from "crypto";

const request = async (socket, payload) => {
  return new Promise((resolve, reject) => {
    const id = crypto.randomUUID();

    const onMessage = (message) => {
      if (message.id !== id || message.type !== "RESPONSE") return;
      clearTimeout(timer);
      socket.off("message", onMessage);
      resolve(message);
    };

    let timer = setTimeout(() => {
      reject(new Error("Request timed out"));
    }, 30000);

    socket.on("message", onMessage);

    socket.send({ type: "REQUEST", payload, id });
  });
};

export default request;
