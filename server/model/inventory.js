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
        // min:1
        validate: {
            validator: function(v) {
              return v>=0;
            },
            message: 'Less or no items in inventory'
          }
    },
    price:{
        type:Number,
        required:true
    }
},'Inventory')
module.exports={Inventory};