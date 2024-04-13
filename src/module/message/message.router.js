import {Router} from 'express';
import * as messageController from './message.controller.js';
import auth from '../../middleware/auth.middleware.js';
const router = Router();
router.get('/',auth,messageController.getMessages);
router.post('/:receiverId',messageController.sendMessages);

export default router;
