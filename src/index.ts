import app from "./app";
import os, { NetworkInterfaceInfo } from "os";
import { params, utils, servicesConnexion } from "packages";

const { FreePort } = utils;
const { serviceName, inAppServiceName } = params;
const { SignalAdressManager } = servicesConnexion;

/*

  CONNECT API
  
*/
const main = async () => {
  /* Le système de log défini dans `app.ts` -> à voir dans le dossier ../package ou son ripo git */
  let logSys = app.get("logSys");
  let env = app.get("envLoad");

  if (!logSys)
    throw new Error(
      "LogSys error : LogSys n'est pas monté dans le fichier `app.ts` sous le format `logSys`"
    );
  if (!env)
    throw new Error(
      "Env error : Env n'est pas monté dans le fichier `app.ts` sous le format `envLoad`"
    );

  try {
    const port = await FreePort();

    app.listen(port, env.IP_USER_SERVICE, () => {
      const interfaces: NodeJS.Dict<NetworkInterfaceInfo[]> =
        os.networkInterfaces();

      console.log("Connected to url :");

      for (const k in interfaces) {
        for (const k2 in interfaces[k]) {
          /* @ts-ignore */
          const address = interfaces[k][k2];

          if (address.family === "IPv4") {
            logSys.ServiceInfo(
              inAppServiceName.app,
              `connected to ${address.address}:${port}`
            );

            console.log(`${address.address}:${port}`);

            /*
              CALL ADRESS MANAGER 
            */

            SignalAdressManager(
              {
                service: serviceName.object.utilisateur,
                adressIP: address.address,
                port,
              },
              env
            );
          }
        }
      }
    });
  } catch (e: any) {
    logSys.UnknowAppError(inAppServiceName.index, e);
  }
};

main();
