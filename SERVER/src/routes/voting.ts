import { Router   } from "express"
import { fetchAllVotes, handleAddNewVote, handleGetVotingTimes, handleUpdateVotingTimes } from "../controllers/voting";
import multer, { memoryStorage } from "multer";

const router = Router();

router.post("/add-new-vote", handleAddNewVote);
router.get("/fetch-all-votes" , fetchAllVotes);
router.post("/update-votingTimes" , handleUpdateVotingTimes);
router.get("/voting-times" , handleGetVotingTimes);


export default router;