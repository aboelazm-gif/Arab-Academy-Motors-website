import { app, auth } from "./config.js";
import {
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import getDoc from "./getData.js";

export default async function signIn(email, password) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  
    if(result.user){
      try {
        const userData = await getDoc("users",result.user.uid)
        result.user.data=userData?.result?.data()||null
      } 
      catch (e) {
        reject(e)
      }
    }
  } catch (e) {
    if (e.code == "auth/invalid-email") {
      error = "Invalid email address format.";
    } else if (e.code ==  "auth/user-disabled") {
      error = "User account is disabled.";
    } else if (e.code == 'auth/user-not-found') {
      error = "User account is not found.";
    } else if (e.code == 'auth/wrong-password') {
      error = "Invalid password.";
    } else {
        error = "Email / Password is incorrect";
    }
  }

  return { result, error };
}

