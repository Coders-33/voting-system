import { Router   } from "express"
import { logoutUser, ValidateToken } from "../authentication/authenticate";


const router = Router();

router.post("/validate-token" , ValidateToken);
router.post("/logout" , logoutUser);

export default router;