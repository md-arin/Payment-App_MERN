const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken")
const { JWT_Secret} = require("../config")
const router = express.Router();
const { User } = require("../db/db");
const { authmiddleware } = require("../middlewares/middleware");

//email and pass validation
const signupInput = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(6)
})

const siginInput = z.object({
    username: z.string().email(),
    password: z.string()
})

router.get("/test", (req,res)=>{
    res.send("hello world!")
})

router.post("/signup", async (req,res)=>{
    const success = signupInput.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg: "Incorrect Inputs, Make sure password is 5 chracters"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            msg: "Email already taken"
        })
    }

    //create user

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password

    })

    const userId = user._id;

    const token = jwt.sign({
        userId,
        
    }, JWT_Secret);

    //if all goes well send the token
    res.json({
        msg: "User created succeesfully",
        token: token
    })
})

router.post("/signin",authmiddleware, async(req,res)=>{

    const succees = siginInput.safeParse(req.body)
    if(!succees){
        return res.status(400).json({
            msg: "Invalid email or password"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(!user){
        return  res.status(411).json({
            msg: "Error while logging in"
        })
    }
    const userId = user._id;

    const token = jwt.sign({
        userId,
        username: user.username
    },JWT_Secret)

    res.json({
        msg: "login Succesfull",
        token
    })

})


const updateBody = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

router.put("/", authmiddleware, async(req,res)=>{
    const success = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    const userId = req.userId;
    console.log(userId);

    await User.updateOne(req.body, {
        _id: userId
    })

    res.json({
        msg: "User Updated successfully"
    })
    // try {
    //     const user = await User.findOneAndUpdate(
    //         {
    //             _id : userId
    //         },
    //         {
    //             $set: {
    //                 firstName: firstName,
    //                 lastName: lastName,
    //                 password: password
    //             },
    //         },
    //         {
    //             //by default findoneAndUpdate() return the document as before update was applied
    //             //using new: true return new obeject updating value
    //             new: true
    //         }
    //     )  
    //     console.log(user);
    //     res.status(200).json({
    //         msg:"User updated successfully!"
    //     })  
        
    // } catch (error) {
    //     console.log(error);
    //     res.status(411).json({
    //         msg: "Error whhile updating information"
    //     })
    // }
   
})

module.exports = router
