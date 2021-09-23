import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

export const UserSchema = new Schema(
    {
        username:{type:String, required:true},
        deviceId:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        role : {type:String , default: 'user' , required:true},
        avatar:{type:String, default:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'},
        status:{type:Boolean, default:false},
        onlinedAt:{type:Number, default:0},
        offlinedAt:{type:Number, default:0}
    },
    {
        timestamps:true,
    }
);
UserSchema.statics = {
    /**
     * create a device
     * @item {Object} item 
     * @returns 
     */
    createUser(item){
        return this.create(item);
    },
    /**
     * find device by device id
     * @deviceId {String} deviceId 
     * @returns 
     */
    findUserByDeviceId(deviceId){
        return this.findOne({"deviceId":deviceId}).exec();
    },
    /**
     * support sign up function
     * @username {String} username 
     * @returns 
     */
    findUserByUsername(username){
        return this.findOne({"username":username}).exec();
    },
    /**
     * support auth through passport.js (removed)
     * @id {String} id 
     * @returns 
     */
    findUserByIdToSessionToUse(id){
        return this.findOne({"_id":id},{"password":0}).exec();
    },
    /**
     * get all devices except admin
     * @returns 
     */
    findAllDevices(){
        return this.find({"role":'user'},{"password":0}).sort({"onlinedAt":-1}).exec();
    },
    /**
     * update status for a device (onlinne/offline) 
     * @deviceId {String} deviceId 
     * @status {Boolean} status 
     * @returns 
     */
    updateStatusById(deviceId, status){
        if(status){
            return this.updateOne({"_id":deviceId},
            {
                "status":status,
                "onlinedAt":Date.now()
            }).exec();  
        }
        return this.updateOne({"_id":deviceId},
        {
            "status":status,
            "offlinedAt":Date.now()
        }).exec();
    },
    getReadMoreDevices(skip, limit){
        return this.find({"role":'user'})
        .sort({"onlinedAt":-1})
        .skip(skip)
        .limit(limit);
    }
    ,
    getAllDevicesFollowLimit(limit){
        return this.find({"role":'user'})
        .sort({"onlinedAt":-1})
        .limit(limit)
        .exec();
    },
    /**
     * support test function
     * @username {String} username 
     * @returns 
     */
    deleteUserByUsername(username){
        return this.deleteOne({"username":username}).exec();
    }
}
UserSchema.methods = {
    //check password
    comparePassword(password){
        //return a promise has result is true or false
        return bcrypt.compare(password,this.password);
    }

}
const User = mongoose.model('User',UserSchema);
export default User;