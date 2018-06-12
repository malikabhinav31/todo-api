const {mongoose}=require('./../server/mongoose/mongoose');
const {Todo}=require('./../server/mongoose/todo');

Todo.findById('5b1fd8032824b92c643bac99').then((todo)=>{
    if(!todo){
    	return console.log("No such user");
    }
	console.log(todo);
}).catch((e)=>console.log(e));