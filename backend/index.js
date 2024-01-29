const express = require("express");
const cors = require('cors');
const rootRouter = require("./routes/index");
const {  authmiddleware, authcheck } = require("./middlewares/middleware");
const { Account } = require("./db/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.get("/me", authcheck, async (req,res)=>{
    const decodedValue = req.decodedValue;
    const userId = req.userId
    const userAccount = await Account.findOne({
        userId
    })
    

    res.status(200).json({
        message:"Authenticated!", 
        decodedValue,
        balance: userAccount.balance
    });

})


app.listen(3000,()=>{
    console.log(`Server is running on port 3000`);
})

