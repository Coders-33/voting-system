import { Router } from "express"
import {
    fetchAllVotes, handleAddNewVote, handleGetAllParties, handlePartyDetails
} from "../controllers/voting";

const router = Router();

router.post("/add-new-vote", handleAddNewVote);
router.get("/get-all-parties", handleGetAllParties);
router.get("/fetch-all-votes", fetchAllVotes);
router.get("/party-details", handlePartyDetails);




export default router;