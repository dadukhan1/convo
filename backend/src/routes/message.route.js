import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getAllContacts, getChatsPartners, getMessagesByUserId, sendMessage } from '../controllers/message.controller.js';
import { arcjetProtection } from '../middleware/arcject.middlware.js';

const router = express.Router();

router.use(arcjetProtection, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatsPartners);
router.get("/:id", getMessagesByUserId);

router.post("/send/:id", sendMessage);

export default router;
