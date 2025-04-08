import { Router } from "express"
import {
    fetchAllVotes, getAllWinnerAndResult, handleAddNewVote, handleGetAllParties, handlePartyDetails , handleGetCountVotes
} from "../controllers/voting";

const router = Router();

router.post("/add-new-vote", handleAddNewVote);
router.get("/get-all-parties", handleGetAllParties);
router.get("/fetch-all-votes", fetchAllVotes);
router.get("/party-details", handlePartyDetails);
router.get("/voted-students" , handleGetCountVotes);
router.get("/get-winner-result", getAllWinnerAndResult);




export default router;