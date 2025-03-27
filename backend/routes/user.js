import { Router } from "express";
import { body, validationResult } from 'express-validator';
import {registerUser} from "../controllers/user.controller.js"

const router=Router();


router.post('/register',[
    body("email").isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage("First name must be atleast 3 characters long"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],registerUser)

export default router;