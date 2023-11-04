import {Router} from "express"
import ReviewController from "./Reviews.Controller.js";
const router =Router()
router.get("/test",(req,res)=>{
      res.json({msg:"hello from test"});
})
router.get("/Reviews/:username/:Review",ReviewController.getReviewsByUserandReview)
router.post("/addReview",ReviewController.addReviews)
router.get("/getReviewsByid/:Id",ReviewController.SearchByMovieId)      
router.put("/:id",ReviewController.UpdateMovieReview)
router.delete("/:Id",ReviewController.deleteReview)
export default router;