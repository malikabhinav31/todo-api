const MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,client)=>{
    if(error){
     return	console.log("Unable to connect to mongoDB server");
    }
    console.log("Connected to MongoDB server");
    
    const db=client.db("TodoApp");

    db.collection('Todos').insertOne({
        text:"to do someting",
        completed:false
    },(err,result)=>{
    	if(error){
    		return console.log("Unable to insert to do",err);
    	}
    	console.log(JSON.stringify(result.ops,undefined,2));
    });
    client.close();
});