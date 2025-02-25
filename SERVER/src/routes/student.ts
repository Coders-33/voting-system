import { Router  } from "express";
import { 
handleStudentLogin ,
handleSendOTP,
handleSignUp,
handleVerificationOfOTP,
handleChangePasscode


} from "../controllers/student";
import multer, { memoryStorage } from "multer";

const upload = multer({storage : memoryStorage() })
const  router = Router();


router.post("/login" , upload.none() , handleStudentLogin);
router.post("/signup" , handleSignUp);

router.post("/forget-password/sendOTP" , handleSendOTP);
router.post("/forget-password/verifyOTP" , handleVerificationOfOTP);
router.post("/changePassword"  , handleChangePasscode);




export default router;
