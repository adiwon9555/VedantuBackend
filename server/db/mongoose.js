const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.set('runValidators', true);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
module.exports={mongoose};