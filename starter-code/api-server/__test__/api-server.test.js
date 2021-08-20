'use strict';
require('dotenv').config();

let superTest = require('supertest');
let server = require('../src/server');
let q = superTest(server.server);

const users = {
    admin: { username: 'a', password: 'pwd', role: 'admin' },
    editor: { username: 'e', password: 'pwd', role: 'editor' },
    user: { username: 'u', password: 'pwd', role: 'user' },
};
let obj ={
        username:"thaer",
        password:"123"

}

describe('sign-up sign-in', () => {
   

        it('sign in', async () => {
            let res = await q.post('/signin').auth(obj.username, obj.password);
            expect(res.status).toEqual(200);
        
        });
    
});

describe('/users + /secret', () => {
    it('/secret', async () => {
        let res = await q.post('/signin').auth(users.user.username, users.user.password);
        const token_1 = res.body.token;
        let res2 = await q.get('/secret').set(`Authorization`, `Bearer ${token_1}`);
        expect(res2.status).toEqual(200);
        expect(res2.text).toEqual('Welcome to the secret area');
    });

    it('/users', async () => {
        let res1 = await q.post('/signin').auth(users.admin.username, users.admin.password);
        const token_2 = res1.body.token;
        let res = await q.get('/users').set({ Authorization: `Bearer ${token_2}` });
        expect(res.status).toEqual(200);
     
    });

    
});

describe('V1 Routes', () => {

    it('can post a new food item', async() => {
      let obj1 = { name: 'tes1', calories: 9, type: 'fruit' };
      const response = await q.post('/api/v1/food').send(obj1);
      expect(response.status).toBe(201);
     
   
    });
  
    it('can get a food item', async() => {
        let obj1 = { name: 'tes1', calories: 9, type: 'fruit' };
  
      const response = await q.post('/api/v1/food').send(obj1);
      const foodObject = response.body;
      const res = await q.get(`/api/v1/food/${foodObject.id}`);
      expect(res.status).toBe(200);
     
    });
    it('can delete() a food item', async() => {
        let obj1 = { name: 'tes1', calories: 9, type: 'fruit' };
     
      const response1 = await q.post('/api/v1/food').send(obj1);
      const response2 = await q.delete(`/api/v1/food/${response1.body.id}`);
      expect(response2.status).toBe(200);
   
    });
          
  });

