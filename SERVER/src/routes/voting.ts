import { Router } from "express"
import {
    fetchAllVotes, getAllWinnerAndResult, handleAddNewVote, handleGetAllParties, handlePartyDetails
} from "../controllers/voting";

const router = Router();

router.post("/add-new-vote", handleAddNewVote);
router.get("/get-all-parties", handleGetAllParties);
router.get("/fetch-all-votes", fetchAllVotes);
router.get("/party-details", handlePartyDetails);
router.get("/get-winner-result", getAllWinnerAndResult);




export default router;