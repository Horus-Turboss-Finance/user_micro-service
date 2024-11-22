import { 
    searchAvatarUserById, 
    getUserDetailsById, 
    getAccountDetails, 
    // forgotPassword, 
    updatePassword, 
    deleteProfile,
    // resetPassword, 
    updateProfile,
    // getAllUsers, 
    // followUser, 
    signupUser, 
    pingedByAd,
    loginUser,
} from './userController'
import { imageFilter } from '../../middleware/imageFileFilter';
import { middleware } from "packages";
import express from "express";

let { LogRequest, controleOrigine, isAuth} = middleware

const router = express.Router();
router.use(controleOrigine);
router.use(LogRequest)

const connect = express.Router();
router.use("/sign/", connect);

connect.route('/up')
.post(signupUser);
connect.route('/in')
.post(loginUser); 


const password = express.Router();
router.use("/password", password)

password.route('/')
.put(isAuth, updatePassword);
// -- Bloqué temporairement le temps de créer le service mail -- //
// password.route('/forgot')
// .post(forgotPassword);
// password.route('/reset/:token')
// .put(resetPassword);
// -- Bloqué temporairement le temps de créer le service mail -- //


const me = express.Router()
router.use("/@me", me)

me.route('/')
.post(isAuth, getAccountDetails)
.put(isAuth, updateProfile)
.delete(isAuth, deleteProfile);
me.route('/avatar')
.put(isAuth, imageFilter);
// -- Supprimé temporairement car pour l'instant l'application n'a pas de "plateforme" pour la commu
// me.route('/follow')
// .post(isAuth, followUser);
// -- Supprimé temporairement car pour l'instant l'application n'a pas de "plateforme" pour la commu


const search = express.Router()
router.use("/search", search)

search.route("/user/profile/:id")
.get(getUserDetailsById);
search.route("/user/avatar/:id")
.get(searchAvatarUserById);

// -- Supprimé temporairement car pour l'instant l'application n'a pas de "plateforme" pour la commu
// router.route("/suggested/users")
// .get(isAuth, getAllUsers);
// -- Supprimé temporairement car pour l'instant l'application n'a pas de "plateforme" pour la commu

// -- Disponible à la prochaine version -- //
// router.route("/ban")
// -- Disponible à la prochaine version -- //

router.route('/ping')
.get(pingedByAd)

export default router