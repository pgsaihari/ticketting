import express from 'express'
const router=express.Router()

router.post('/api/users/signout',(req,res)=>{
       req.session=null;

       res.send({message:"user logout"})
})

export { router as signOutRouter}