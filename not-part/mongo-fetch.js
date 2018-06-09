const MongoClient=require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/TodoApp",(error,Client)=>{
   if(error){
    return	console.log("Unable to connect");
   }
    console.log("connected to database");
    var db=Client.db('TodoApp');
    db.collection('Todos').find({completed:true}).count().then((docs)=>{
        console.log(docs);
    },(error)=>{
    	console.log("Unable to fetch",error);
    });
});