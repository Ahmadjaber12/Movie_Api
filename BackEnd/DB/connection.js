import mongoose from "mongoose"

const connectDB=async ()=>{
    return await mongoose.connect(process.env.DB_LOCAL)
    .then(()=>
        { 
            console.log("Connect DB Successful");
        }
    
    ).catch((err)=>{
        console.log(err)
    })
}

export default connectDB;