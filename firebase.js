console.log("FIREBASE.JS ÇALIŞTI");

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// DÜZELTİLMİŞ config!
const firebaseConfig = {
  apiKey: "AIzaSyD8uebDrnsAxpZfTjFPvatOeWxij1HLgfY",
  authDomain: "restorann-91ef3.firebaseapp.com",
  projectId: "restorann-91ef3",
  storageBucket: "restorann-91ef3.appspot.com", // ← Düzgün hali!
  messagingSenderId: "305460529109",
  appId: "1:305460529109:web:68dbc01f4df1f9d36f5f5c",
  measurementId: "G-4J84XHX4HG",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (error) {
  auth = getAuth(app);
}

export { auth };
