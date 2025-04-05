import { Router } from "express";
import {
    AdminLogin, handleAddNewParty, handleAdminSignUp,
    handleEndVotings,
    handleGetVotingTimes, handlePartyRemoval, handleUpdateVotingTimes
} from "../controllers/admin";
import multer from "multer";
const upload = multer();


const router = Router();


router.post("/admin-login", upload.none(), AdminLogin);
router.post("/add-new-party", upload.none(), handleAddNewParty);
router.post("/remove-party", handlePartyRemoval);
router.post("/admin-access-signUp/:ADMIN_KEY_ID", handleAdminSignUp);
router.post("/update-votingTimes", handleUpdateVotingTimes);
router.post("/end-voting", handleEndVotings);
router.get("/voting-times", handleGetVotingTimes);



export default router;
