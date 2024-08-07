import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from './userModel';
import { emailCheck } from 'checks';
import { stringContraint } from 'constraint';
import { catchSync } from '../../middleware/catchAsync';
import { sendTokenCookie } from '../../utils/sendCookie';
import { NextFunction, Request, Response } from 'express';
import { ResponseException } from '../../utils/responseException';
import { sendSupportMailResetPassword } from "../../utils/sendMail";
import { EmailType, errorCode, IUser, SuccessCode, Request as userRequest } from '../../config/types';

import { APPCRITIC } from "../../config/envLoader";

// Signup User
// ⚠️⚠️  à modif au prochain service (communication between micro-service) ⚠️⚠️
// mail welcome
export const signupUser = catchSync(async(req : Request, res : Response, next : NextFunction) => {
    let { email } = req.body;
    const { username, password } = req.body;

    if(email) email = email.toLowerCase()
    const user = await User.findOne({
        $or: [{ email }, { username }]
    });

    if(user){
        if(user.username === username) throw new ResponseException(errorCode.BadRequest, "Pseudo déjà existant")
        else throw new ResponseException(errorCode.BadRequest, "Email invalide")
    }

    if(!stringContraint(username, 2, 20)) throw new ResponseException(errorCode.BadRequest, "Le pseudo doit contenir entre 2 et 20 caractères.")
    if(!stringContraint(password, 4)) throw new ResponseException(errorCode.BadRequest, "Le mot de passe doit contenir au minimum 4 caractères.")
    if(!emailCheck(email)) throw new ResponseException(errorCode.BadRequest, "Email invalide")

    await User.create({
        email,
        password,
        username
    })

    const userSecure = await User.findOne({ email })
    
    sendTokenCookie(userSecure, res, next)
})  

// Login User
// ⚠️⚠️ à modif au prochain service (communication between micro-service) ⚠️⚠️
// Si co nouvelle ip -> email new co
export const loginUser = catchSync(async(req : Request, res : Response, next : NextFunction) => {
    const { userId, password } = req.body;
    let email;
    if(userId) email = userId.toLowerCase()

    const user = await User.findOne({
        $or: [{ email: email }, { username: userId }]
    }).select("+password");

    if (!user || !userId || !password) {
        const pass = await bcrypt.compare("lol", await bcrypt.genSaltSync());
        if(!pass) throw new ResponseException(errorCode.Unauthorized, "identifiant ou mot de passe incorrect")
        else throw new ResponseException(errorCode.Unauthorized, "identifiant ou mot de passe incorrect")
    }
    
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        throw new ResponseException(errorCode.Unauthorized, "identifiant ou mot de passe incorrect")
    }
    
    const userSecure = await User.findOne({
        $or: [{ email: email }, { username: userId }]
    })
    sendTokenCookie(userSecure, res, next)
})

// // Logout User
// // ⚠️⚠️ à mettre dans l'API GATEWAY ⚠️⚠️
// export const logoutUser = catchSync(async(req : Request, res : Response, next : NextFunction) => {
//     res.cookie('token', null, {
//         expires: new Date(),
//         httpOnly: true,
//     });

//     throw new ResponseException(SuccessCode.Success, "Déconnecté")
// });

// Get User Details --Logged In User
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const getAccountDetails = catchSync(async(req : userRequest) => { 
    throw new ResponseException(SuccessCode.Success, JSON.stringify(req.user))
});

// Get User Details
export const getUserDetails = catchSync(async(req : Request ) => {
    const { username } = req.body
    const user = await User.findOne({ username })

    if(!user) throw new ResponseException(errorCode.NotFound, 'Aucun utilisateur trouvé')
    throw new ResponseException(SuccessCode.Success, JSON.stringify(user))
});

// Get User Details By Id
export const getUserDetailsById = catchSync(async(req : Request) => {
    const { id } = req.body
    if (!id || (id && !id.match(/^[0-9a-fA-F]{24}$/))) throw new ResponseException(errorCode.BadRequest, 'Identifiant recherché invalide')

    const user = await User.findById(id)

    if(!user) throw new ResponseException(errorCode.NotFound, 'Aucun utilisateur trouvé')
    throw new ResponseException(SuccessCode.Success, JSON.stringify(user))
});

// Get All Users
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const getAllUsers = catchSync(async(req : userRequest) => {
    const users = await User.find();

    const suggestedUsers = users.filter((u : IUser) => {
        if(!u.followers) throw new ResponseException(errorCode.NotFound, 'Aucune personne n\'est disponible')

        return !u.followers.includes(`${req.user._id}`) && u._id.toString() !== req.user._id.toString()
    }).slice(-5)

    throw new ResponseException(SuccessCode.Success, JSON.stringify(suggestedUsers))
});

// Update Password
// ⚠️⚠️ à modif au prochain service (communication between micro-service) ⚠️⚠️
// envoyé mail au modif password et laisser accès temporaire (48h si c'est pas lui)
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const updatePassword = catchSync(async(req : userRequest, res : Response, next : NextFunction) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");
    if(!user) throw new ResponseException(errorCode.Forbidden, "Identifiant invalides")

    const isPasswordMatched = await user.comparePassword(oldPassword);

    if (!isPasswordMatched) throw new ResponseException(errorCode.Unauthorized, "Identifiant invalides")

    if(!stringContraint(newPassword, 4)) throw new ResponseException(errorCode.BadRequest, "Le mot de passe doit contenir au minimum 4 caractères.")

    user.password = newPassword;
    await user.save();
    
    sendTokenCookie(req.user, res, next);
});

// Update Profile
// ⚠️⚠️ à modif à prochaine route (pp gestion) ⚠️⚠️
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const updateProfile = catchSync(async(req : userRequest) => { 
    const { username, bio } = req.body;
    let { email } = req.body;

    if(email) email = email.toLowerCase()
    const newUserData = {
        username,
        bio,
        email,
    }

    const userExists = await User.find({
        $or: [{ email }, { username }]
    });

    if (userExists[0]){
        for(const userE of userExists){
            if(userE._id.toString() !== req.user._id.toString()) throw new ResponseException(errorCode.BadRequest, "Email ou pseudo déjà existant")
        }
    } 
    
    if(username && !stringContraint(username, 2, 20)) throw new ResponseException(errorCode.BadRequest, "Le pseudo doit contenir entre 2 et 20 caractères.")
    if(bio && !stringContraint(bio, 1, 250)) throw new ResponseException(errorCode.BadRequest, "La bio ne peut contenir plus de 250 caractères.")
    if(email && !emailCheck(email)) throw new ResponseException(errorCode.BadRequest, "Email invalide")


    await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    throw new ResponseException(SuccessCode.Success, "Profil bien modifié")
});

// Delete Profile  
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const deleteProfile = catchSync(async(req : userRequest, res : Response) => {
    const user = await User.findById(req.user._id);
    if(!user) throw new ResponseException(errorCode.Forbidden, "Identifiant invalides")

    const followers = user.followers;
    const following = user.following;
    const userId = user._id;

    // delete post & user images
    await user.deleteOne();

    // // ⚠️⚠️ à mettre dans l'API GATEWAY ⚠️⚠️
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    if(followers){
        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById(followers[i]);
            if(!follower) throw new ResponseException(errorCode.UnknownError, "Une erreur est survenue veillez réessayer plus tard.")
    
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
            if(!follows) throw new ResponseException(errorCode.UnknownError, "Une erreur est survenue veillez réessayer plus tard.")
    
            if(follows.followers){
                const index = follows.followers.indexOf(userId);
                follows.followers.splice(index, 1);
            }

            await follows.save();
        }
    }

    throw new ResponseException(SuccessCode.Success, 'Utilisateur supprimé')
});

// Follow | Unfollow User
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const followUser = catchSync(async(req : userRequest) => {
    if(req.body.id == req.user._id) throw new ResponseException(errorCode.BadRequest, "Cannot follow yourself")
    if (req.body.id && !req.body.id.match(/^[0-9a-fA-F]{24}$/)) throw new ResponseException(errorCode.BadRequest, "Identifiant fournit invalide")

    const userToFollow = await User.findById(req.body.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow || !userToFollow.followers) throw new ResponseException(errorCode.BadRequest, "Aucun utilisateur fournit")
    if (!loggedInUser || !loggedInUser.following) throw new ResponseException(errorCode.Unauthorized, "Identifiant invalides")

    if (loggedInUser.following.includes(userToFollow._id)) {
        const followingIndex = loggedInUser.following.indexOf(userToFollow._id);
        const followerIndex = userToFollow.followers.indexOf(loggedInUser._id);

        loggedInUser.following.splice(followingIndex, 1);
        userToFollow.followers.splice(followerIndex, 1);

        await loggedInUser.save();
        await userToFollow.save();

        throw new ResponseException(SuccessCode.Success, "Utilisateur désabonné")
    } else {
        loggedInUser.following.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);
        await loggedInUser.save();
        await userToFollow.save();

        throw new ResponseException(SuccessCode.Success, "Utilisateur abonné")
    }
});

// Forgot Password
// ⚠️⚠️ à modif au prochain service (communication between micro-service) ⚠️⚠️
// envoyé mail au modif password et laisser accès temporaire (48h si c'est pas lui)
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const forgotPassword = catchSync(async(req : Request, res : Response, next :NextFunction) => {
    let { email } = req.body

    if(email) email = email.toLowerCase()

    const user = await User.findOne({ email: email });
    if (!user) throw new ResponseException(errorCode.NotFound, "Utilisateur introuvable")

    const resetPasswordToken = await user.getResetPassword();
    await user.save();

    const resetPasswordUrl = `https://${APPCRITIC.URLAPP}/password/reset/${resetPasswordToken}`;

    try {
        // ⚠️⚠️ à modif au prochain service (communication between micro-service) ⚠️⚠️
        await sendSupportMailResetPassword({
            email: email,
            templateId: EmailType.ForgotPassword,
            data: {
                reset_url: resetPasswordUrl
            }
        });

        next(new ResponseException(SuccessCode.Success, `Email sent to ${email}`))
    } catch (err : any) { /* eslint-disable-line @typescript-eslint/no-explicit-any */
        user.resetPassword = undefined;
        user.resetPasswordExpiry = undefined;

        await user.save({ validateBeforeSave: false });
        throw err
    }
    
});

// Reset Password
export const resetPassword = catchSync(async(req : Request, res : Response, next : NextFunction) => {
    const resetPassword = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPassword,
        resetPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) throw new ResponseException(errorCode.NotFound, "Liens invalide")

    if(!stringContraint(req.body.password, 4)) throw new ResponseException(errorCode.BadRequest, "Le mot de passe doit contenir au minimum 4 caractères.")


    user.password = req.body.password;
    user.resetPassword = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();

    const userSecure = await User.findById(user._id)
    sendTokenCookie(userSecure, res, next);
});

// User Search
export const searchUsers = catchSync(async(req : Request) => {
    if(!req.body.keyword) throw new ResponseException(errorCode.BadRequest, "Aucune nom fournit")

    if(!stringContraint(req.body.keyword, 4)) throw new ResponseException(errorCode.BadRequest, 'La recherche doit faire au minimum 4 caractères')


    const users = await User.find({
        username: {
            $regex: req.body.keyword,
            $options: "i",
        }
    });

    throw new ResponseException(SuccessCode.Success, JSON.stringify(users))
});