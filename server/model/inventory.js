const mongoose=require('mongoose');
var Inventory=mongoose.model('Inventory',{
    name:{
        type:String,
        required:true,
        minlength:1
    },
    remainingProducts:{
        type:Number,
        required:true,
        default:1,
        min:0
    },
    price:{
        type:Number,
        required:true
    }
},'Inventory')
module.exports={Inventory};