import jwt from 'jwt-then';
import dotenv from 'dotenv';
dotenv.config();

const authSocket = (io) => {
    io.use(async (socket, next) => {
        if(socket.handshake.auth.token) {
            try {
              const token = socket.handshake.auth.token;
              //auth by jwt
              const payload = await jwt.verify(token, process.env.JWT_SECRET);
              socket.user = payload;
              next();
            } catch (error) {
                socket.disconnect(true);
                return;
            }
        }else{
            socket.disconnect(true);
            return;
        }
    })
}
export default authSocket;