const event = async (socket, payload) => {
  return socket.send({
    type: "EVENT",
    payload,
  });
};
