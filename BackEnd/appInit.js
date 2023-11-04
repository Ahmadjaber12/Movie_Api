import Reviewsrouter from "./Api/Reviews.Route.js";
import connectDB from "./DB/connection.js"
import cors from "cors"

const appinit =(app,express)=>{
    app.use(cors())
    app.use(express.json()) ;
    connectDB();
    app.use(Reviewsrouter);

    app.use("*",(req,res)=>{
        res.status(404).json({msg:"Cannot Find this page"})
    })
}
export default appinit