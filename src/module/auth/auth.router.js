import {Router} from 'express';
import * as authController from './auth.controller.js';
import { asyncHandler } from '../../utils/errorHandling.js';
import validation from '../../middleware/validation.js';
import { signinSchema , signupSchema } from './auth.validation.js';
const router = Router();
router.post('/signup',validation(signupSchema),asyncHandler(authController.signup));
router.post('/signin',validation(signinSchema),asyncHandler(authController.signin));
router.get('/confirmEmail/:token',asyncHandler(authController.confirmEmail));

export default router;


