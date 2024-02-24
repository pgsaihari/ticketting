import mongoose from "mongoose";
import {app} from "./app"
const start=async()=>{

  
  if(!process.env.JWT_KEY){
    throw new Error("error in token generation")
  }

  await mongoose.connect('mongodb://auth-mongo-srv:27017/auth').then(()=>{
    console.log("mongodb is connected!")
  })
  .catch((err)=>{
    console.log(err)

  })

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!");
  });
}

start()

