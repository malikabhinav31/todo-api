const expect=require('expect');
const request=require('supertest');
const {ObjectID}=require('mongodb');

const {app}=require('./server');
const {Todo}=require('./mongoose/todo');

const todos=[{_id: new ObjectID(), text:"dummy text 1"},
             {_id: new ObjectID(),text:"dummy text 2"}];

beforeEach((done)=>{
   Todo.remove({}).then(()=>{
   	Todo.insertMany(todos);
   }).
   then(()=> done()).catch((e)=>done(e));
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

                      Todo.find({text}).then((todos)=>{
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
                           expect(todos.length).toBe(2);
                           done();
                         }).catch((e)=>done(e));
		            });
	});
});

describe('GET /todo',()=>{
	it('should get all todos',(done)=>{
		request(app).get('/todo')
		            .expect(200)
		            .expect((res)=>{
		            	expect(res.body.todos.length).toBe(2);
		            })
		            .end(done);
	});
});

describe('GET /todo/:id',(done)=>{
   it('should get todo',(done)=>{
    request(app).get(`/todo/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect((res)=>{
                  
                   expect(res.body.todo.text).toBe(todos[0].text)
                })
                .end(done);
   });

   it('should not validate id',(done)=>{
    request(app).get('/todo/123')
                .expect(404)
                .end(done);
   });

   it('should not get id',(done)=>{
    var id =new ObjectID().toHexString();
    request(app).get(`/todo/${id}`)
                .expect(404)
                .end(done);
   });
});


describe('DELETE /todo/:id',(req,res)=>{
  it('should delete a todo',(done)=>{
  //  console.log(todos,todos[0],todos[0]._id);
    var id=todos[0]._id.toHexString();

    request(app).delete(`/todo/${id}`)
                .expect(200)
                .expect((res)=>{
                  expect(res.body.docs._id).toBe(id);
                })
                .end((err)=>{
                  if(err){
                    return done(err);
                  }

                  Todo.findById(id).then((doc)=>{
                    expect(doc).toBe(null);
                    done();
                  }).catch((e)=>done(e));
                });
  });
   it('should not get id',(done)=>{
    var id =new ObjectID().toHexString();
    request(app).delete(`/todo/${id}`)
                .expect(404)
                .end(done);
   });

   it('should not validate id',(done)=>{
    request(app).delete('/todo/123')
                .expect(404)
                .end(done);
   });
});