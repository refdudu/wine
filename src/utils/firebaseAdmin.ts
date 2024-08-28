import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import * as firebaseAdmin from "firebase-admin";
import { apiEnv } from "./apiEnv";

const apps = getApps();

if (apps.length === 0) {
  firebaseAdmin.initializeApp(
    {
      projectId: "wine-f786a",
      databaseURL: apiEnv.DATABASE_URL,
      storageBucket: "wine-f786a.appspot.com",
      serviceAccountId: "1:773046745270:web:89efb9243d223b54cf0e17",
    },
    "wine-f786a"
  );
}
export const firebaseAuth = getAuth(firebaseAdmin.app("wine-f786a"));
