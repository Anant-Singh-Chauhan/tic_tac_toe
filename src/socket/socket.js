import { io } from "socket.io-client";

const SERVER_URL = process.env.REACT_APP_TIC_TAC_TOE_SERVER_URL;

if(process.env.REACT_APP_DEBUG) console.log(SERVER_URL);

const socketClient = io(SERVER_URL, {
  autoConnect: false,
});

socketClient.on("connect", () => {
  // console.log(`Your Socket Id is : ${socketClient.id}`);
});

export default socketClient;
