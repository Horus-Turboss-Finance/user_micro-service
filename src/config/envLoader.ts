import { appCritic, dbconf } from "./types";
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({path : path.resolve('./src/config/.env')})

export const DBCONFIG : dbconf = {
    URLDB : process.env.URLDB!,
    NAME : process.env.DBNAME!
}

export const APPCRITIC : appCritic = {
    TOKENEXPIRE : parseInt(process.env.TOKENEXPIRATION!, 10),
    EMAILAPIPRIVATEKEY : process.env.EMAILAPIPRIVATEKEY!,
    EMAILPUBLICADRESS : process.env.EMAILPUBLICADRESS!,
    TOKENSIGNATURE : process.env.TOKENSIGNATURE!,
    SECRETCOOKIES : process.env.SECRETCOOKIES!,
    PORT: parseInt(process.env.PORTAPP!, 10),
    URLAPP : process.env.URLAPP!,
}