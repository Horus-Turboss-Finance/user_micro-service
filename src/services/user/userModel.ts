import crypto from "crypto";
import bcrypt from "bcryptjs";
import { utils } from "packages";
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    avatar:  {
        type: String,
        default: "default.jpg"
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
        default: "Hi👋 Welcome To My Profile",
        maxlength: [500, "Votre bio ne peut faire plus de 500 caractères."]
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

userSchema.methods.getResetPassword = async function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPassword = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpiry = Date.now() + 30 * 60 * 1000;

    return resetToken;
}

export default model("User", userSchema);