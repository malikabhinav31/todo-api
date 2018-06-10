const {MongoClient,ObjectId}=require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp",(error,Client)=>{
   if(error){
    return	console.log("Unable to connect");
   }
    console.log("connected to database");
    var db=Client.db('TodoApp');
    // db.collection('Todos').find({completed:true}).count().then((docs)=>{
    //     console.log(docs);
    // },(error)=>{
    // 	console.log("Unable to fetch",error);
    // });
    // db.collection('Todos').deleteMany({completed:true},function (error,results) {
    //     console.log(results);
    // });
    // db.collection('Todos').findOneAndDelete({_id:
    //  new ObjectId("5b1bba8c42e13456dc31c1c9")}).then((results)=>{
    //    console.log(results);   
    // });
    db.collection('Todos').findOneAndUpdate({
        text:'abhi'
    },{
    	$set:{ text:"abhinav"}, $inc:{age:1}
    },{returnOriginal:false}).then((result)=>{
    	console.log(result);
    });
});