import { _url } from "./path";
import { MongoClient } from "mongodb";

export const createConnection = async () => {
  const rc = await MongoClient.connect(_url);
  return rc;
};
