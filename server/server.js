const express=require('express');
const bodyParser=require('body-parser');

const mongoose=require('./mongoose/mongoose.js');
const Todo=require('./mongoose/todo.js').Todo;
const Users=require('./mongoose/users.js');


 

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