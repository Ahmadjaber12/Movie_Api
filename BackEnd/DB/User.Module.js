import mongoose, { Schema,model } from "mongoose";
const ReviewSchema=new Schema({
    
    MovieId:{
        type:Number,
        required:true
 }

        ,username:{
            type:String,
            required:true
            
        },Review:{
            type:String,
            required:true
        }
    }
    
    )
 const ReviewModel=mongoose.models.Reviews || model("Reviews",ReviewSchema) //mongoose.models.Reviews is for checking if the User table is exist to not creating it another time and that's happining in the bog requests projects like 500  request
 export default ReviewModel;