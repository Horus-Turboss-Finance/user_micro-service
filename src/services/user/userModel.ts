import crypto from "crypto";
import bcrypt from "bcryptjs";
import { Schema, model } from 'mongoose';
import { APPCRITIC } from '../../config/envLoader';
import { IUser, IUserMethods, tokenData, UserModel } from '../../config/types';


const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    avatar:  {
        type: String,
        default: "/avatars/default.jpg"
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        select: false,
    },
    username: { 
        type: String, 
        required: true, 
        unique: true,
        maxlength : [20, "Votre nom doit comporter au maximum 20 caractères"], 
        minlength : [2, "Votre nom doit comporter au moins 2 caractères"]
    },
    password: { 
        type: String, 
        required: true,
        minlength : [4, "Votre mot de passe doit comporter au moins 4 caractères"],
        select: false,
    },
    bio: {
        type: String,
        default: "Hi👋 Welcome To My Profile"
    },    
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    refreshPasswordLastUse: Number,
    resetPassword: String,
    resetPasswordExpiry: Number,
});

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function(enteredPassword : string) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateToken = async function() {
    const secondData = Date.now() + APPCRITIC.TOKENEXPIRE - 1580511600000
    
    const tokenFirstPart = Buffer.from(`${this._id}`).toString('base64url')
    const tokenSecondPart = Buffer.from(`${secondData}`).toString('base64url')
    
    const signature = `${tokenFirstPart}.${tokenSecondPart}.${APPCRITIC.TOKENSIGNATURE}`
    let tokenEndPart = await bcrypt.hash(signature, 10)
    tokenEndPart = Buffer.from(`${tokenEndPart}`).toString('base64url')

    return `${tokenFirstPart}.${tokenSecondPart}.${tokenEndPart}`
}

userSchema.methods.getResetPassword = async function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPassword = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpiry = Date.now() + 30 * 60 * 1000;

    return resetToken;
}

userSchema.statics.decodeToken = async (token : string) : Promise<tokenData> => {
    const tokenParts = token.split(".")
    
    const tokenFirstPart = tokenParts[0]; // {email, id}
    const tokenSecondPart = tokenParts[1]; // valid date
    let tokenEndPart = tokenParts[2];
    tokenEndPart = Buffer.from(`${tokenEndPart}`, 'base64url').toString('utf-8')

    const expireDate = parseInt(Buffer.from(`${tokenSecondPart}`, 'base64url').toString('utf-8'))


    const isValid = bcrypt.compareSync(`${tokenFirstPart}.${tokenSecondPart}.${APPCRITIC.TOKENSIGNATURE}`, tokenEndPart) && expireDate > Date.now() - 1580511600000


    if(!isValid) return {
        isValid: false,
        id : "0",
    }

    const userID = Buffer.from(`${tokenFirstPart}`, 'base64url').toString('utf-8')

    const data = {
        id : userID,
        isValid : true 
    }

    return data
}

export default model<IUser, UserModel>("User", userSchema);