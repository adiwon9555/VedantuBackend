require('./config/config.js')
const { mongoose } = require('./db/mongoose.js');
const { Account } = require('./model/account');
const { Inventory } = require('./model/inventory');
const { Order } = require('./model/order');

const _ = require('lodash');
const { ObjectID } = require("mongodb");
const express = require('express');
const bodyParser = require('body-parser');
var { authenticate } = require('./middleware/authenticate');


var app = express();
var port = process.env.PORT;
app.use(bodyParser.json());


updateInventory = (products) => {
    return Promise.all(products.map(product => {
        return Inventory.findByIdAndUpdate(product.product, { $inc: { remainingProducts: -product.quantity } }, { new: true }).then((inventory) => {
            if (!inventory) {
                return Promise.reject()
            }
                
             return Promise.resolve(inventory)
        }, err => {
              return Promise.reject(err)
        })
    }));

}
app.post('/order', authenticate, (req, res) => {

    var data = _.pick(req.body, ['products']);
    data.accountId = req.account._id;
    data.totalProductTypes=data.products.length
    data.totalProducts=data.products.map(r=>r.quantity).reduce((a,b)=>a+b)
    
    updateInventory(data.products).then((result, err) => {
        if (err) {
            res.status(400).send(err)
        }
        // console.log(result);
        
         data.totalPrice=result.map(r=>r.price).reduce((a,b)=>a+b)
         
        var order = new Order(data)
        order.save().then((order) => {
            return Order.findById(order._id).populate('products.product').then(d => {
                res.send(d);
            })
        }, (err) => {
            res.status(400).send(err);
        })
    }).catch(err=>{
        res.status(400).send(err);
    })

})

app.get("/orders", authenticate, (req, res) => {
    Order.find().then((orders) => {
        if (!orders) {
            return res.status(404).send();
        }
        res.send(orders);
    }).catch((err) => {
        res.status(400).send();
    })
})
app.get("/inventory", (req, res) => {
    Inventory.find().then((inventory) => {
        if (!inventory) {
            return res.status(404).send();
        }
        res.send(inventory);
    }).catch((err) => {
        res.status(400).send();
    })
})


app.listen(port, () => {
    console.log(`Express started on port ${port}`);
})

module.exports = { app };