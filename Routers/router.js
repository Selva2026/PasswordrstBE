import express from 'express';

import registerPage from '../Controllers/UserDataController.js';

import { loginPage } from '../Controllers/UserDataController.js';
import resetPage from '../Controllers/passwordcontroller.js';
import updatePage from '../Controllers/updatePageController.js'


const router=express.Router();


router.post("/register", registerPage);

router.post("/login", loginPage);

router.post("/reset", resetPage);

router.post("/update", updatePage);

export default router;