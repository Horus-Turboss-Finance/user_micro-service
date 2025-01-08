import { 
    // searchAvatarUserById, 
    // getUserDetailsById, 
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

let { LogRequest, controleOrigine, isAuth } = middleware;

const router = express.Router();
router.use(controleOrigine);
router.use(LogRequest)

router.route('/sign/up')
.post(signupUser);
router.route('/sign/in')
.post(loginUser); 


router.route('/password')
.put(isAuth, updatePassword);
// -- Bloqué temporairement le temps de créer le service mail -- //
// password.route('/forgot')
// .post(forgotPassword);
// password.route('/reset/:token')
// .put(resetPassword);
// -- Bloqué temporairement le temps de créer le service mail -- //


router.route('/@me')
.post(isAuth, getAccountDetails)
.put(isAuth, updateProfile)
.delete(isAuth, deleteProfile);
router.route('/@me/avatar')
.put(isAuth, imageFilter);
// -- Supprimé temporairement car pour l'instant l'application n'a pas de "plateforme" pour la commu
// me.route('/follow')
// .post(isAuth, followUser);
// -- Supprimé temporairement car pour l'instant l'application n'a pas de "plateforme" pour la commu

// -- Supprimé temporairement car pour l'instant l'application n'a pas de "plateforme" pour la commu
// router.route("/search/user/profile/:id")
// .get(getUserDetailsById);
// router.route("/search/user/avatar/:id")
// .get(searchAvatarUserById);
// -- Supprimé temporairement car pour l'instant l'application n'a pas de "plateforme" pour la commu

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