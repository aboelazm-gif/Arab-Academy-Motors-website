import { app, auth } from "./config";
import getDoc from "./getData";

const getUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      async (user) => {
        unsubscribe();
        if(user){
          try {
            const userData = await getDoc("users",user.uid)
            user.data=userData?.result?.data()||null
            resolve(user);            
          } 
          catch (e) {
            reject(e)
          }
        }
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });
};

export default getUser;
