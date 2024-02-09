import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:3636";

const socketClient = io(SERVER_URL, {
  autoConnect: false,
});


socketClient.on("connect", () => {
  console.log(`Your Socket Id is : ${socketClient.id}`);
});

export default socketClient;
