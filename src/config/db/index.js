const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb+srv://BE-library:12345@cluster0.u9btf.mongodb.net/bookstore?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
     
    });
      console.log("connect successfully");
    }catch(error){
      console.log("connect fail");
    }
}

module.exports = {connect};