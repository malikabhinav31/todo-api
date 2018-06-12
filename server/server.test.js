const expect=require('expect');
const request=require('supertest');

const {app}=require('./server');
const {Todo}=require('./mongoose/todo');

beforeEach((done)=>{
   Todo.remove({}).then(()=> done()).catch((e)=>done(e));
});

describe('POST/todos',()=>{
	it('should create a new todo',(done)=>{
       var text='Test todo text';

       request(app).post('/todo')
                   .send({text})
                   .expect(200)
                   .expect((res)=>{
                   	  expect(res.body.text).toBe(text);
                   })
                   .end((err,res)=>{
                        if(err){
                        	return done(err);
                        }

                      Todo.find().then((todos)=>{
                         expect(todos.length).toBe(1);
                         expect(todos[0].text).toBe(text);
                         done();
                      }).catch((error)=>done(error));
                      
                   });

	});

	it('should not create a todo with invalid body',(done)=>{
		request(app).post('/todo')
		            .send({})
		            .expect(400)
		            .end((err,res)=>{
                         if(err){
                         	return done(err);
                         }
                         Todo.find().then((todos)=>{
                           expect(todos.length).toBe(0);
                           done();
                         }).catch((e)=>done(e));
		            });
	});
});