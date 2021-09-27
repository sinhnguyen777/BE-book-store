const path = require('path')
const multer = require('multer')


var storate = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'upload/')
    },
    filename: function(req,file,cb){
        let ext = path.extname(file.originalname)
        cb(null,Date.now() + ext);
    }
})

var upload = multer({
    storate : storate,
    fileFilter: function(req,file,callback){
        // if(
        //     file.mimetype == "image/jpg" ||
        //     file.mimetype == "image/png"
        // ){
            callback(null, true)
        // }else{
        //     console.log("only jpg & png file supported");
        //     callback(null, false)
        // }
    },
    limits: {
        fileSize:1024*1024*2
    }
})

module.exports = upload