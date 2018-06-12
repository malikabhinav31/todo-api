const express=require('express');
const bodyParser=require('body-parser');

const {mongoose}=require('./mongoose/mongoose');
const Todo=require('./mongoose/todo').Todo;
const {Users}=require('./mongoose/users');

const {ObjectID}=require('mongodb');


 

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
app.listen(3000,()=>{
   console.log("connected");
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
module.exports={app};