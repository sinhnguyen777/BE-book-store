import UserModel from '../models/userModel.js';
/**
 * when a device login into system
 * @Clients {*} clients 
 * @deviceId {*} deviceId 
 * @socketId {*} socketId 
 * @returns 
 */
export let pushSocketIdToArray = (clients,deviceId,socketId) => {
   return new Promise((resolve)=>{
      clients[deviceId] = [socketId];
      resolve(clients);
   })
};
/**
 * 
 * @Clients {Object} clients 
 * @deviceId {String} deviceId 
 * @io {} io from socket
 * @eventName {String} name's event 
 * @data {Any} emit data 
 */
export let emitNotifyToArray = (clients,deviceId,io,eventName,data) => {
  if (clients[deviceId]) {
      clients[deviceId].forEach(socketId => {
      io.sockets.connected[socketId].emit(eventName, data);
    })
  }
} ;
/**
 * when a device disconnect (log out/F5...)
 * @Clients {Object} save all devices logined into system 
 * @deviceId {String} deviceID 
 * @socketID {*} socketID 
 * @returns 
 */
  export let removeSocketIdFromArray = (clients , deviceId , socketID) => {
    return new Promise((resolve)=>{
        if(clients[deviceId]){
            clients[deviceId] = clients[deviceId].filter(socketId=>socketId !== socketID
            );
            if (clients[deviceId].length) {
              delete clients[deviceId];
            }
        }
        resolve(clients);
    })
  };
