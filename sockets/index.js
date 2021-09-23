
import {pushSocketIdToArray} from '../helpers/socketHelper.js';
let clients = {};
const initSockets = (io) =>{ 
    io.on("connection",async (socket)=>{
        clients = await pushSocketIdToArray(clients,socket.user._id,socket.id);
        

        socket.on('disconnect', () => {
            delete clients[socket.user._id];
        })
        
    })
   
}
export default initSockets;