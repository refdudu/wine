import { getApps, applicationDefault, initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase-admin/auth";

import { apiEnv } from "./apiEnv";

const apps = getApps();
let firebaseAdmin;
if (apps.length === 0)
  firebaseAdmin = initializeApp({
    projectId: "wine-f786a",
    databaseURL: apiEnv.DATABASE_URL,
    storageBucket: "wine-f786a.appspot.com",
  });
// export const firebaseDatabase = getDatabase(firebaseAdmin);
export const firebaseAuth = getAuth(firebaseAdmin);
