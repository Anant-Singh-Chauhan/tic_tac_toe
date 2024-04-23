import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:3636";

const socketClient = io(SERVER_URL, {
  autoConnect: false,
});


socketClient.on("connect", () => {
  console.log(`Your Socket Id is : ${socketClient.id}`);
});

// handle game start
socketClient.on("emit-game-start", (gamePackage) => {
  console.log(`game started!`);
  console.log(gamePackage);
});

// socketClient.on("emit-room-id", (roomId) => {
//   console.log(`recieved room Id`);
//   console.log(roomId);
// });

export default socketClient;
