const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken")
const { JWT_Secret} = require("../config")
const router = express.Router();
const { User, Account } = require("../db/db");
const { authmiddleware, authcheck } = require("../middlewares/middleware");

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

router.post("/signup", async (req,res) => {
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

    const username = req.body.username
    const firstName =req.body.firstName

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId,
        username,
        firstName
    }, JWT_Secret, {expiresIn: 86400});

    //if all goes well send the token
    res.json({
        msg: "User created succeesfully",
        token: token
    })
})

router.post("/signin", async(req,res) => {

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
 
    const username = user.username
    const firstName = user.firstName

    if(!user){
        return  res.status(411).json({
            msg: "Error while logging in"
        })
    }
    const userId = user._id;


    const token = jwt.sign({
        userId,
        username,
        firstName
    },JWT_Secret, {expiresIn: 86400})

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

    // console.log(userId);
    // console.log(req.body)

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    try {
        const user = await User.findOneAndUpdate(
            {
                _id : userId
            },
            {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    password: password
                },
            },
            {
                //by default findoneAndUpdate() return the document as before update was applied
                //using new: true return new obeject updating value
                new: true
            }
        )  
        console.log(user);
        res.status(200).json({
            msg:"User updated successfully!"
        })  
        
    } catch (error) {
        console.log(error);
        res.status(411).json({
            msg: "Error whhile updating information"
        })
    }
   
})

router.get("/bulk", authcheck, async(req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
        _id: {
            $ne: req.userId
        },
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router
