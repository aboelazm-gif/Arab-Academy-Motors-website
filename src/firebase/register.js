import { app, auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import getDoc from "./getData.js";

export default async function register(email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    if(result.user){
      try {
        const userData = await getDoc("users", result.user.uid);
        result.user.data = userData?.result?.data() || null;
      } 
      catch (e) {
        console.error("Error fetching user data:", e);
        // Don't throw here, just log the error
        // The registration was successful even if we can't fetch additional data
      }
    }
  } catch (e) {
    if (e.code == "auth/invalid-email") {
      error = "Invalid email address format.";
    } else if(e.code == "auth/email-already-in-use"){
        error = "Email address is already in use.";
    } else if(e.code == "auth/weak-password"){
      error = "Password is too weak.";
    } else if (e.code == "auth/insufficient-permission") {
      error = "You do not have permission to perform this action.";
    } else if(e.code == "auth/too-many-requests") {
      error = "Too many requests. Please try again later.";
    } else if (e.code == "auth/network-request-failed") {
      error = "Network error. Please try again later.";
    } else if (e.code == "auth/user-disabled") {
      error = "User account is disabled.";
    } else if (e.code == "auth/operation-not-allowed") {
      error = "Operation is not allowed.";
    } else if (e.code == "auth/internal-error") {
      error = "Internal error. Please try again later.";
    } else {
      error = "An error occurred. Please try again later.";
    }
  }

  return { result, error };
}