import { isAuth } from '../../middleware/auth';
import { imageFilter } from '../../middleware/imageFileFilter';
import { 
    getUserDetailsById, 
    getAccountDetails, 
    forgotPassword, 
    getUserDetails, 
    updatePassword, 
    deleteProfile,
    resetPassword, 
    updateProfile,
    getAllUsers, 
    searchUsers, 
    followUser, 
    signupUser, 
    loginUser, 
} from './userController'
// import { isAuthenticatedUser } from "../middlewares/auth.js";
// import { limiterUser } from "../middlewares/rate-limit.js";
import express from "express";

const router = express.Router()

router.route('/sign/up')
.post(signupUser);

router.route('/sign/in')
.post(loginUser); 


router.route('/password')
.post(isAuth, updatePassword);
router.route('/password/forgot')
.post(forgotPassword);
router.route('/password/reset/:token')
.put(resetPassword);


router.route('/@me')
.get(isAuth, getAccountDetails)
.put(isAuth, updateProfile)
.delete(isAuth, deleteProfile);
router.route('/@me/avatar')
.post(isAuth, imageFilter);
router.route('/@me/follow')
.post(isAuth, followUser);


router.route("/search/user/name")
.get(isAuth, getUserDetails);
router.route("/search/user/id")
.get(isAuth, getUserDetailsById);
router.route("/search/users")
.get(isAuth, searchUsers);

router.route("/suggested/users")
.get(isAuth, getAllUsers);




export default router