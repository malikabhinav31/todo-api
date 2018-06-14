const express=require('express');
const bodyParser=require('body-parser');
const _=require('lodash');

const {mongoose}=require('./mongoose/mongoose');
const Todo=require('./mongoose/todo').Todo;
const {Users}=require('./mongoose/users');

const {ObjectID}=require('mongodb');


 
const port=process.env.PORT||3000;
var app=express();

app.use(bodyParser.json());
app.post('/todo',(req,res)=>{
	var todo = new Todo({
   	text: req.body.text
   });
   todo.save().then((docs)=>{
   	res.send(docs);
   },(error)=>{
   	res.status(400).send(error);
   });
  
});

app.get('/todo',(req,res)=>{
	Todo.find().then((todos)=>{
		res.send({todos});
	}).catch((e)=>{
        res.status(400).send(e);
	});
});
app.get('/todo/:id',(req,res)=>{
	var id=req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send();
	}
	Todo.findById(id).then((todo)=> {
                         if(!todo){
                         	res.status(404).send();
                         }
		                 res.send({todo});
		             })
	                 .catch((e)=> res.status(404).send() );

});

app.delete('/todo/:id',(req,res)=>{
	var id=req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send();
	}
	Todo.findByIdAndRemove(id).then((docs)=>{
                                 if(!docs){
                                 	res.status(404).send();
                                 }
                                 res.status(200).send({docs});
                              })
	                          .catch((e)=>res.status(400).send());
});


app.patch('/todo/:id',(req,res)=>{
	var id=req.params.id;
	var body=_.pick(req.body,['text','completed']);
	if(!ObjectID.isValid(id)){
		res.status(404).send();
	}

	if(_.isBoolean(body.completed)&&body.completed){
		body.completedAt=new Date().getTime();
	}else{
		body.completed=false;
		body.completedAt=null;
	}

	Todo.findByIdAndUpdate(id,{ $set:body},{new:true}).then((todo)=>{
		if(!todo){
			res.status(404).send();
		}
		res.send({todo});
	}).catch((e)=>res.status(400).send());
});

app.listen(port,()=>{
   console.log("Started at port "+port);
});


module.exports={app};



//cd /program files/mongodb/server/3.6/bin
//mongod.exe --dbpath /users/abhinav/mongo-data