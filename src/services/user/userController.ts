import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from './userModel';
import { existsSync } from "fs";
import { NextFunction, Request, Response } from 'express';
import { ResponseException, utils, middleware } from "packages";

let { stringContraint, mongooseMessageErrorFormator, encodeUserToken, isValidMongooseId } = utils

let { catchSync } = middleware

// Signup User
export const signupUser = catchSync(async(req : Request, res : Response, next : NextFunction) => {
    let { email, username, password } = req.body;
    if(!email || !username || !password) throw new ResponseException("Certains champs sont manquant").BadRequest()

    try{
        const validateCheck : any = new User({
            email : `${email}`.toLowerCase(), 
            password, 
            username
        });

        const error = validateCheck.validateSync();
        if(error) throw error;

        await validateCheck.save()

        const token = await encodeUserToken(validateCheck._id);
        
        let response = JSON.stringify(toJsonUserProperty(validateCheck, token))
        throw new ResponseException(response).Success()
    }catch(e : any) {
        if(e.name === "ValidationError"){
            if(e.errors.email){
                throw new ResponseException(mongooseMessageErrorFormator(e.errors.email.message, e.errors.email.value, "Email", "email")).BadRequest()
            }else if(e.errors.username){
                throw new ResponseException(mongooseMessageErrorFormator(e.errors.username.message, e.errors.username.value, "Username", "string")).BadRequest()
            }else if(e.errors.password){
                throw new ResponseException(mongooseMessageErrorFormator(e.errors.password.message, e.errors.password.value, "Password", "string")).BadRequest()
            }
        }else if(e.name === 'MongoServerError' && e.code === 11000) {
            throw new ResponseException("Le pseudo ou l'email sont déjà utilisé").BadRequest()
        }

        throw e
    }
    /* TODO */
    /* pour les futures version -> Ajouter la collecte de l'ip pour prévenir des bans. */
    /* lorsque mail service is created -> Ajouter l'envoie d'un mail de bienvenue */
})  

// Login User
export const loginUser = catchSync(async(req : Request, res : Response, next : NextFunction) => {
    const { identifiant, password } = req.body;
    let email;
    if(identifiant) email = identifiant.toLowerCase()

    const user: any  = await User.findOne({
        $or: [{ email: email }, { username: identifiant }]
    }).select("+password");

    if (!user || !identifiant || !password) {
        await bcrypt.compare("lol", bcrypt.genSaltSync());
        
        throw new ResponseException("identifiant ou mot de passe incorrect").Unauthorized()
    }
    
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        throw new ResponseException("identifiant ou mot de passe incorrect").Unauthorized()
    }

    const token = await encodeUserToken(user._id);

    let response = JSON.stringify(toJsonUserProperty(user, token))
    throw new ResponseException(response).Success()

    /* TODO */
    /* pour les futures version -> Ajouter la collecte de l'ip pour prévenir des bans. */
    /* lorsque mail service is created -> Ajouter l'envoie d'un mail de loggin avec un nouvel ip si nouvel ip. */
})

// Get User Details --Logged In User
export const getAccountDetails = catchSync(async(req : any) => { 
    let user = await User.findById(req.userID);

    if(!req.isValidToken) throw new ResponseException("Vous n'êtes pas autorisé à avoir cette information").Forbidden()

    let response = JSON.stringify(toJsonUserProperty(user))
    throw new ResponseException(response).Success()
});

// Get User Details By Id
export const getUserDetailsById = catchSync(async(req : Request) => {
    const { id } : any = req.query
    if (!id || (id && isValidMongooseId(id))) throw new ResponseException('Identifiant recherché invalide').BadRequest()

    const user : any = await User.findById(id)

    if(!user) throw new ResponseException('Aucun utilisateur trouvé').NotFound()

    let response = JSON.stringify(toJsonUserProperty(user))
    throw new ResponseException(response).Success()
});

// Get All Users -- TEMPORALY DISABEL -- A remettre en conformité lors de sa réactivation
export const getAllUsers = catchSync(async(req : any) => {
    const users = await User.find();

    const suggestedUsers = users.filter((u : any) => {
        if(!u.followers) throw new ResponseException('Aucune personne n\'est disponible').NotFound()

        return !u.followers.includes(`${req.user._id}`) && u._id.toString() !== req.user._id.toString()
    }).slice(-5)

    suggestedUsers.map((u : any) => toJsonUserProperty(u))
    throw new ResponseException(JSON.stringify(suggestedUsers)).Success()
});

// Update Password
export const updatePassword = catchSync(async(req : any) => {
    const { oldPassword, newPassword } = req.body;

    const user : any = User.findById(req.userID);
    if(!user) throw new ResponseException("Identifiant invalides").Unauthorized()

    const isPasswordMatched = await user.comparePassword(oldPassword);

    if (!isPasswordMatched) throw new ResponseException("Identifiant invalides").Unauthorized();
    if(!stringContraint(newPassword, 4)) throw new ResponseException("Le mot de passe doit contenir au minimum 4 caractères.").BadRequest();

    if(!req.isValidToken) throw new ResponseException("Vous n'êtes pas autorisé à modifier cette information").Forbidden();

    user.password = newPassword;
    await user.save();
    
    const token = await encodeUserToken(user._id);

    let response = JSON.stringify(toJsonUserProperty(user, token))
    throw new ResponseException(response).Success()
    // TODO
    /* Envoi d'un mail lors de la modif avec un lien permettant de signaler que la démarche ne vient pas de l'utilisateur (48h valid) */
});

// Update Profile
export const updateProfile = catchSync(async(req : any) => { 
    let { username, bio, email } = req.body;

    if(email) email = email.toLowerCase()

    const newUserData = {
        username,
        bio,
        email,
    }

    try{
        if(!req.isValidToken) throw new ResponseException("Vous n'êtes pas autorisé à modifier cette information").Forbidden();

        let validateCheck : any = await User.findByIdAndUpdate(req.userID, newUserData, {
            runValidators: true,
            useFindAndModify: true,
        });
        
        if(!validateCheck) throw new ResponseException("Aucun utilisateur trouvé").NotFound()
        const token = await encodeUserToken(validateCheck._id);

        let response = JSON.stringify(toJsonUserProperty(validateCheck, token))
        throw new ResponseException(response).Success()
    }catch(e : any){
        if(e.name === "ValidationError"){
            if(e.errors.email){
                throw new ResponseException(mongooseMessageErrorFormator(e.errors.email.message, e.errors.email.value, "Email", 'email')).BadRequest()
            }else if(e.errors.username){
                throw new ResponseException(mongooseMessageErrorFormator(e.errors.username.message, e.errors.username.value, "Username", "string")).BadRequest()
            }else if(e.errors.password){
                throw new ResponseException(mongooseMessageErrorFormator(e.errors.password.message, e.errors.password.value, "Password", "string")).BadRequest()
            }else if (e.errors.bio){
                throw new ResponseException(mongooseMessageErrorFormator(e.errors.bio.message, e.errors.bio.value, "Bio", "string")).BadRequest()
            }
        }else if(e.name === 'MongoServerError' && e.code === 11000) {
            throw new ResponseException("Le pseudo ou l'email sont déjà existant").BadRequest()
        }

        throw e
    }
});

// Delete Profile  
export const deleteProfile = catchSync(async(req : any, res : Response) => {
    let user = await User.findById(req.userID); 
    if(!req.isValidToken || !user) throw new ResponseException("Token Invalide").InvalidToken();

    const followers = user.followers;
    const following = user.following;
    const userId = user._id;

    // delete post & user images
    await user.deleteOne();

    // TODO
    /* LAISSER LA POSSIBILITER DE SE CONNECTER PENDANT 30J */

    if(followers){
        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById(followers[i]);
            if(!follower) throw new ResponseException("Une erreur est survenue veillez réessayer plus tard.").UnknownError()
    
            if(follower.following){
                const index = follower.following.indexOf(userId);
                follower.following.splice(index, 1);
            }

            await follower.save();
        }
    }
    
    if(following){
        for (let i = 0; i < following.length; i++) {
            const follows = await User.findById(following[i]);
            if(!follows) throw new ResponseException("Une erreur est survenue veillez réessayer plus tard.").UnknownError()
    
            if(follows.followers){
                const index = follows.followers.indexOf(userId);
                follows.followers.splice(index, 1);
            }

            await follows.save();
        }
    }

    throw new ResponseException('Utilisateur supprimé').Success()
});

// Follow | Unfollow User -- TEMPORALY DISABLE -- A remettre en conformité lors de sa réactivation
export const followUser = catchSync(async(req : any) => {
    if(req.body.id == req.user._id) throw new ResponseException("Cannot follow yourself")
    if (req.body.id && !req.body.id.match(/^[0-9a-fA-F]{24}$/)) throw new ResponseException("Identifiant fournit invalide")

    const userToFollow = await User.findById(req.body.id);
    const loggedInUser = req.user;

    if (!userToFollow || !userToFollow.followers) throw new ResponseException("Aucun utilisateur fournit").BadRequest()
    if (!loggedInUser || !loggedInUser.following) throw new ResponseException("Identifiant invalides").Unauthorized()

    if (loggedInUser.following.includes(userToFollow._id)) {
        const followingIndex = loggedInUser.following.indexOf(userToFollow._id);
        const followerIndex = userToFollow.followers.indexOf(loggedInUser._id);

        loggedInUser.following.splice(followingIndex, 1);
        userToFollow.followers.splice(followerIndex, 1);

        await loggedInUser.save();
        await userToFollow.save();

        throw new ResponseException("Utilisateur désabonné").Success()
    } else {
        loggedInUser.following.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);

        await loggedInUser.save();
        await userToFollow.save();

        throw new ResponseException("Utilisateur abonné").Success()
    }
});

// Forgot Password -- TEMPORALY DISABLE -- A remettre en conformité lors de sa réactivation
export const forgotPassword = catchSync(async(req : Request, res : Response, next :NextFunction) => {
    let { email } = req.body

    if(email) email = email.toLowerCase()

    const user : any = await User.findOne({ email: email });
    if (!user) throw new ResponseException("Utilisateur introuvable").NotFound()

    const resetPasswordToken = await user.getResetPassword();
    await user.save();

    // -- Pour l'instant je n'ai pas d'accès à l'url cashey.es ni au https; donc il m'est impossible d'avoir un bon retour -- //
    // const resetPasswordUrl = `https://cashey.es/password/reset/${resetPasswordToken}`;
    const resetPasswordUrl = `http://217.0.0.1/password/reset/${resetPasswordToken}`;

    try {
        // TODO
        // ⚠️⚠️ à modif au prochain service (communication between micro-service) ⚠️⚠️
        // sendSupportMailResetPassword({
        //     email: email,
        //     templateId: EmailType.ForgotPassword,
        //     data: {
        //         reset_url: resetPasswordUrl
        //     }
        // });

        throw new ResponseException(`Email sent to ${email}`).Success()
    } catch (err : any) {
        next(err)
        user.resetPassword = undefined;
        user.resetPasswordExpiry = undefined;

        await user.save({ validateBeforeSave: false });
    }
});

// Reset Password -- TEMPORALY DISABLE -- A remettre en conformité lors de sa réactivation
export const resetPassword = catchSync(async(req : Request, res : Response, next : NextFunction) => {
    const resetPassword = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user : any = await User.findOne({
        resetPassword,
        resetPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) throw new ResponseException("Liens invalide").NotFound()

    if(!stringContraint(req.body.password, 4)) throw new ResponseException("Le mot de passe doit contenir au minimum 4 caractères.").BadRequest()


    user.password = req.body.password;
    user.resetPassword = undefined;
    user.resetPasswordExpiry = undefined;

    let err = await user.save();
    if(err) throw err;
    
    const token = await encodeUserToken(user._id);

    let response = JSON.stringify(toJsonUserProperty(user, token))
    throw new ResponseException(response).Success()
});

// User Avatar Search
export const searchAvatarUserById = catchSync(async(req : Request, res : Response) => {
    let { id } : any = req.query
    if(!id) id = req.params.id

    if (!id || (id && !isValidMongooseId(id))) throw new ResponseException('Identifiant recherché invalide').BadRequest()

    const user = await User.findById(id)

    if(!user) throw new ResponseException('Aucun utilisateur trouvé').NotFound();

    if(user.avatar == "default.jpg") return res.sendFile(path.resolve(__dirname, '../../../picture/default.jpg'));

    let fileName = user.avatar

    const pathFile = path.resolve(__dirname, '../../../picture/' + fileName)

    /* le fichier n'existe pas */
    if(!existsSync(pathFile)) throw new ResponseException("Pas de photo de profile trouvé").NotFound()

    /* renvoit le fichier au client */
    res.sendFile(pathFile)
});

export const pingedByAd = catchSync(async(req : Request) =>{
    throw new ResponseException("Service en ligne").Success()
})

const toJsonUserProperty = (user : any, token ?: string) => {
    let { avatar, username, bio, followers, following, _id } = user

    if(!token) return {
        avatar : `https://cashsight.fr/api/v1/user/avatar/${avatar}`,
        followers,
        following,
        id : _id,
        username,
        bio,
    }


    return {
        avatar : `https://cashsight.fr/api/v1/user/avatar/${avatar}`,
        followers,
        following,
        id : _id,
        username,
        token,
        bio,
    }
}