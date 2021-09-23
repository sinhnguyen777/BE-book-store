import {user} from '../services/index.js'
// register MB through socket
const userRegisterMB = ({username,password,deviceId}) => {
    return new Promise(async (resolve, reject)=>{
        try {
            const userRegister = await user.userRegister({username,password,deviceId});    
            resolve(userRegister);
        } catch (error) {
            //console.log(error);
            reject(error);
        }
    })
}
// login MB through socket
const userLoginMB = ({username,password}) => {
    return new Promise(async (resolve, reject)=>{
        console.log(username,password);
        try {
            const userLogined =await user.userLogin({username,password});
            resolve(userLogined)        
        } catch (error) {
            //console.log(error);
            reject(error)
        }
    })
}
export default {
    userRegisterMB,
    userLoginMB
};
