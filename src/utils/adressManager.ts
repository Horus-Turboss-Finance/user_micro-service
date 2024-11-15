import { params, ResponseException } from "packages";
import axios from "axios";
import path from "path";

let { env, loadEnv } = params
env = loadEnv(path.resolve(__dirname, '../../../.env'))

/* Function qui récupère les urls des services demandé */
export const AddressManagerAsk = async (service : string) => {
  if(!params.serviceName.array.includes(service)) throw new ResponseException("Le service demandé n'existe pas").BadRequest();

  let urlData = await axios({
    url: '/service',
    baseURL: `http://${env.IP_ADRESSMANAGER}:${env.PORT_ADRESSMANAGER}`,
    method: 'get',
    data: {
      service
    }
  })

  let data : any = urlData.data.data

  if(!data) throw new ResponseException().UnknownError()
  return `http://${data.adressIP}:${data.port}`
}  

/* Function qui envoie que le service est up sur cette adresse */
export let SignalAdressManager = async ({adressIP, port, service} : {adressIP : string, port : number, service : string}) =>{
  if(!params.serviceName.array.includes(service)) throw new ResponseException("Le service demandé n'existe pas").BadRequest();

  await axios({
    url: '/service',
    method: 'post',
    baseURL: `http://${env.IP_ADRESSMANAGER}:${env.PORT_ADRESSMANAGER}`,
    data: {
      adressIP, 
      service,
      port
    }
  })
}