const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
   name:{
    type: String,
   requried: true
   },
   email:{
    type: String,
    requried: true,
    unique: true
   },
   password:{
    type: String,
    requried: true
   },
   date:{
    type: Date,
    default: Date.now
   },
});
 //module.exports= mongoose.model('User', UserSchema);
const User = mongoose.model('User', UserSchema);
//User.createIndexes(); // db concept of fast accessing of memory from chache
module.exports = User;