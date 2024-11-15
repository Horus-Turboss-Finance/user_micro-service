import app from './app';
import path from 'path';
import { params, utils } from "packages"
import os, { NetworkInterfaceInfo } from "os";
import { logSys, CE_Services } from './config/log';
import { SignalAdressManager } from './utils/adressManager';

const { FreePort } = utils;
let { env, loadEnv, serviceName } = params;

env = loadEnv(path.resolve(__dirname, "../../.env"));

/*
CONNECT API
*/
const main = async () => {
  try{
    const port = await FreePort()

    app.listen(port, env.IP_USER_SERVICE, () => {
      const interfaces : NodeJS.Dict<NetworkInterfaceInfo[]> = os.networkInterfaces();
      for (const k in interfaces) {
          for (const k2 in interfaces[k]) {
              /* @ts-ignore */
              const address = interfaces[k][k2];
  
              if (address.family === 'IPv4') {
                logSys.ServiceInfo(CE_Services.app, `${address.address}:${port}`);

                /*
                  CALL ADRESS MANAGER 
                */
                
                SignalAdressManager({adressIP : address.address, port, service : serviceName.object.utilisateur})
              }
          }
      }
    })
  }catch(e : any){
    logSys.UnknowAppError(CE_Services.index, e)
  }
}

main()