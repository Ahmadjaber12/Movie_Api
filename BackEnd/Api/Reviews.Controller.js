import ReviewModel from "../DB/User.Module.js";

export default class ReviewController {
    static async getReviewsByUserandReview(req,res){
            const {username,Review}=req.params;

            const user=await ReviewModel.find({username,Review})
            if(user.length){
                res.json({"there is a user":user})
            }
            else
            res.json({msg:"No Users Found"})
    }
    static async addReviews(req,res){
        const {MovieId,username,Review}=req.body;
        const OldUsers=await ReviewModel.find({username,MovieId,Review})
        if (OldUsers.length >0)
        {
            
            res.status(400).json({ error: "There is a record with this data" });
      
        }
        else
        {const NewUser=await ReviewModel.create({MovieId,username,Review})
        
        res.json({NewUser})}
}

static async SearchByMovieId(req,res){
        const {Id}=req.params;
        const CheckId=await ReviewModel.find({MovieId:Id})
        if(CheckId.length==0)
        {
            return res.json({msg:"There's No Movie with this Id"})
        }
        return res.json(CheckId)
}
static async UpdateMovieReview(req, res) {
    const { id } = req.params;
    const { username, Review } = req.body;
  
    try {
      const CheckId = await ReviewModel.findOne({ _id: id });
      if (CheckId) {
        const user = await ReviewModel.updateOne({ _id: id }, { username, Review });
        return res.json({ user });
      } else {
        res.status(400).json({ msg: "Wrong Id" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
  
static async deleteReview(req,res){
    const {Id}=req.params;

    const CheckId=await ReviewModel.find({_id:Id})

    if(CheckId){
        await ReviewModel.deleteOne({_id:Id})
}
    return res.json({msg:"there's no record with this Id"})
}}