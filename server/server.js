const mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo=mongoose.model('Todo',{
  text:{
  	type:String
  },
  completed:{
  	type:Boolean
  },
  completedAt:{
  	type:Number
  }
});

var addTodo=(obj)=>{
var newTodo=new Todo(obj);
 
newTodo.save().then((doc)=>{
  console.log(doc);
},(e)=>{
	console.log(e);
});
};

addTodo({text:"cook Dinner"});
addTodo({text:"Cook lunch",completed:true,completedAt:12});