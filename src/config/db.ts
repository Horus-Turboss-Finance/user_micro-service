import { loggeurInfo, loggeurServiceErr, serviceType, typeLog } from "../utils/logs";
import { DBCONFIG } from "./envLoader";

import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose.connect(DBCONFIG.URLDB)
  .then(() => {
    loggeurInfo(serviceType.mongoose, "Connected", typeLog.note)
  }).catch((error) => {
    loggeurServiceErr(serviceType.mongoose, error, typeLog.caution)
  });
}