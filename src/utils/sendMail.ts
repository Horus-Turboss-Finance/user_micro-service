import { escapeHtmlContraint } from "constraint";
import { APPCRITIC } from "../config/envLoader";
import { EmailType } from "../config/types";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

// // ⚠️⚠️ à mettre dans l'API GATEWAY ⚠️⚠️
export const sendSupportMailResetPassword = async ({ 
    email , templateId , data: { reset_url }
} : {email : string, templateId : string, data : { reset_url : string}}) => {
    if(templateId === EmailType.ForgotPassword){
        const transporter = nodemailer.createTransport({
            service: 'gmail',                      // your email domain
            auth: {
                user: APPCRITIC.EMAILPUBLICADRESS, // your email address
                pass: APPCRITIC.EMAILAPIPRIVATEKEY // your password
            }
        });
    
        const MailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Le service support',
                link: 'https://github.com/Horus-Turboss-Finance',
                logo: 'https://avatars.githubusercontent.com/u/170715457',
                copyright: 'Copyright © 2024 Horus-Turboss-Finance. All rights reserved.',
            }
        });
    
        const mail = MailGenerator.generate({
            body: {
                name: `${escapeHtmlContraint('<h1>Docteur Turboss</h1>')}`,
                intro: ["Vous avez reçu cet email parce qu'une demande de réinitialisation du mot de passe de votre compte a été reçue.", " Veillez à vérifier l'expéditeur de cet email ainsi que l'adresse des liens afin d'éviter toute tentative d'hameçonnage.", "‎"],
                action: {
                    instructions: 'Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe :',
                    button: {
                        color: '#dfa234', // Optional action button color
                        text: 'Retrouvez vos accès',
                        link: `${reset_url}`
                    }
                },
                outro: "Si vous n'êtes pas à l'origine de cette demande, aucune action supplémentaire n'est requise de votre part.",
                signature: "Cordialement"
            }
        });

        await transporter.sendMail({
            from: `Cash eyes Support <${APPCRITIC.EMAILPUBLICADRESS}>`,
            to: email,
            subject: 'Réinitialisation du mot de passe',
            html: mail
        })
    }
}

