const mongoose=require('mongoose');



mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGOLAB_URI||process.env.MONGODB_URI);

module.exports={mongoose};