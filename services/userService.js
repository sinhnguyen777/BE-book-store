import UserModel from "../models/userModel.js"
import bcrypt from 'bcrypt';
import {transErrors, transSuccess} from '../lang/vi.js';
import {generateToken} from '../helpers/jwtHelper.js';
let saltRounds =  7;
/**
 * register
 * @username {String} username from controller 
 * @password {String} password from controller 
 * @deviceId {String} deviceId from controller 
 * @returns 
 */
const userRegister = ({username,password,deviceId}) => {
    return new Promise(async (resolve,reject)=>{
        try {   
            const userExist = await UserModel.findUserByDeviceId(deviceId);
            if(userExist) throw  reject(transErrors.account_existed);
            let saft = bcrypt.genSaltSync(saltRounds);
            let userItem = {
                username:username,
                deviceId:deviceId,
                password:bcrypt.hashSync(password,saft)
            };
            const user = await UserModel.createUser(userItem);
            resolve({
                status:200,
                success:true,
                data:{
                    _id:user._id,
                    username:user.username,
                    deviceId:user.deviceId,
                    message:transSuccess.register_success_mobile(user.username),
                    isAdmin:user.isAdmin,
                    token:await generateToken(user)
                }
            });
        } catch (error) {
            reject({
                status:401,
                success:false,
                message:error
            });
        }
    })
}
/**
 * login
 * @username {String} username from controller 
 * @returns 
 */
const userLogin = ({username,password}) => {
    return new Promise(async (resolve,reject)=>{
        const userInfo = await UserModel.findUserByUsername(username);
        if(!userInfo) throw reject({
            status:401,
            success:false,
            message:transErrors.account_email_existed
        });
        const checkPass = await userInfo.comparePassword(password);
        if(checkPass){ 
            resolve({
                status:200,
                success:true,
                data:{

                    _id:userInfo._id,
                    message:transSuccess.login_success_mobile(userInfo.username),
                    username:userInfo.username,
                    deviceId:userInfo.deviceId,
                    isAdmin:userInfo.isAdmin,
                    token:await generateToken(userInfo)
                }
            })
        }else{
            reject({
                status:401,
                success:false,
                message:transErrors.account_email_existed
            });
        }   
    })
}


export default {
    userRegister,
    userLogin
}