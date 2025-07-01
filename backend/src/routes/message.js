import express from "express"
import { protectRoute } from "../middleware/auth.js";
import {sendMessage,getMessages,getUsersForSidebar} from "../controllers/message.js"

const router=express.Router();

router.get("/user",protectRoute,getUsersForSidebar);
router.get("/:id",protectRoute,getMessages);

router.post("/send/:id",protectRoute,sendMessage);

export default router;