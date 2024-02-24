import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose"
import { app } from "../app";
import request from 'supertest'
import jwt from 'jsonwebtoken'
declare global {
    namespace NodeJs{
        interface Global{
            signin():Promise<string[]>
        }
    }
}


let mongo:any;



beforeAll(async()=>{
    process.env.JWT_KEY='axz';
    const mongo=await MongoMemoryServer.create();
    const mongoUri= mongo.getUri();
    await mongoose.connect(mongoUri,{})
})

beforeEach(async()=>{
    const collections=await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany()
    }

})

afterAll(async () => {
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
  });
 
 
