const mongoose=require('mongoose');

var AccountSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    token:{
        type:String,
        required:true
    }
    
})

AccountSchema.statics.findByToken = function (token) {
    var Account = this;
    //TODO :- JWT token verify code
  
    return Account.findOne({
      token
    });
  };


  var Account=mongoose.model('Account',AccountSchema,'Account')

module.exports={Account};