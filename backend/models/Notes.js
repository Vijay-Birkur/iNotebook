const mongoose = require('mongoose');

const userSchema = new Schema({
    title:{
      type:String,
      required: true  
    },
    description:{
        type:String,
        required: true  
      },
      tag:{
        type:String,
        default:"General"  
      },
      date:{
        type:Date,
        default: Date.now  
      },
  });

  module.exports=mongoose.model('user',userSchema);