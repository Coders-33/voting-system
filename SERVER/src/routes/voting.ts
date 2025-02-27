import { Router   } from "express"
import { fetchAllVotes, handleAddNewVote } from "../controllers/voting";
import multer, { memoryStorage } from "multer";

const router = Router();

router.post("/add-new-vote", handleAddNewVote);
router.get("/fetch-all-votes" , fetchAllVotes);


export default router;