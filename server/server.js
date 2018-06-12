const express=require('express');
const bodyParser=require('body-parser');

const mongoose=require('./mongoose/mongoose');
const Todo=require('./mongoose/todo').Todo;
const Users=require('./mongoose/users');


 

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

app.listen(3000,()=>{
   console.log("connected");
});


module.exports={app};