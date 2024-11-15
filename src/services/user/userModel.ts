import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { Schema, model } from 'mongoose';
import { params, utils } from "packages"

let { env, loadEnv } = params

env = loadEnv(path.resolve(__dirname, "../../../../.env"))

const userSchema = new Schema({
    avatar:  {
        type: String,
        default: "/avatars/default.jpg"
    },
    email: { 
        type: String, 
        required: [true, "L'email est obligatoire"],
        validate: {
            validator: function(mail : any) {
              return utils.emailCheck(mail)
            },
            message: "L'email n'est pas valide."
        }, 
        unique: true,
        select: false,
    },
    username: { 
        type: String, 
        required: [true, "Le pseudo est obligatoire"], 
        unique: true,
        maxlength : [20, "Votre nom doit comporter au maximum 20 caractères"], 
        minlength : [2, "Votre nom doit comporter au moins 2 caractères"]
    },
    password: { 
        type: String, 
        required: [true, "Le mot de passe est obligatoire"],
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
}, {
    collection : "users"
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
    const secondData = Date.now() + env.TOKEN_EXPIRATION
    
    const tokenFirstPart = Buffer.from(`${this._id}`).toString('base64url')
    const tokenSecondPart = Buffer.from(`${secondData}`).toString('base64url')
    
    const signature = `${tokenFirstPart}.${tokenSecondPart}.${env.PASSWORD_SERVICE}`
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

export default model("User", userSchema);