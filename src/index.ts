import app from './app'
import os, { NetworkInterfaceInfo } from "os";
import { APPCRITIC } from "./config/envLoader";
import { loggeurInfo, serviceType, typeLog } from "./utils/logs";

/*
CONNECT API
*/

app.listen(APPCRITIC.PORT, () => {
    loggeurInfo(serviceType.app, "Connect Url :", typeLog.info)
    const interfaces : NodeJS.Dict<NetworkInterfaceInfo[]> = os.networkInterfaces();
    for (const k in interfaces) {
        for (const k2 in interfaces[k]) {
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            /* @ts-ignore */
            const address = interfaces[k][k2];

            if (address.family === 'IPv4' && !address.internal) {
                loggeurInfo(serviceType.app, `${address.address}:${APPCRITIC.PORT}`, typeLog.info)
            }
        }
    }
})

