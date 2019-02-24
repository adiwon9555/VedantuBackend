const mongoose=require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

var OrderSchema=new mongoose.Schema({
    accountId:{
        type:String,
        required:true,
    },
    products:[
        {
            product:{
                type:ObjectId,
                ref:'Inventory',
                required: true
            },
            quantity:{
                type:Number,
                min:1,
                required:true
            }

        }
    ],
    totalPrice:{
        type:Number
    },
    totalProductTypes:{
        type:Number
    },
    totalProducts:{
        type:Number
    }
})


var Order=mongoose.model('Order',OrderSchema,'Order')

  
module.exports={Order};